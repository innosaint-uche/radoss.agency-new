import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const runtime = 'nodejs';

type LeadPayload = {
    name: string;
    company: string;
    email: string;
};

type BusinessProfilePayload = {
    industry?: string;
    scale?: string;
    type?: string;
};

type ResultsPayload = {
    overallMaturityLevel?: string;
    overallMaturityScore?: number;
    dimensionResults?: Record<string, { score: number; level: string }>;
};

type RequestPayload = {
    lead?: LeadPayload;
    businessProfile?: BusinessProfilePayload;
    results?: ResultsPayload;
};

const LARK_OPEN_API = 'https://open.larksuite.com/open-apis';
const LARK_REQUIRED_FIELDS: Array<{ name: string; type: number }> = [
    { name: 'Full name', type: 1 },
    { name: 'Work email', type: 1 },
    { name: 'Organisation', type: 1 },
    { name: 'Industry', type: 1 },
    { name: 'Business scale', type: 1 },
    { name: 'Business type', type: 1 },
    { name: 'Overall maturity level', type: 1 },
    { name: 'Overall maturity score', type: 2 },
    { name: 'Dimension summary', type: 1 },
    { name: 'Submitted at', type: 1 },
    { name: 'Source', type: 1 },
    { name: 'Lead status', type: 1 },
    { name: 'Auto-response sent', type: 1 },
    { name: 'Report generated', type: 1 },
];

function clean(value: unknown, max = 200) {
    return String(value ?? '').trim().slice(0, max);
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildSummary(results?: ResultsPayload) {
    if (!results?.dimensionResults) return 'No dimension breakdown provided.';
    return Object.entries(results.dimensionResults)
        .map(([dimension, result]) => `${dimension}: ${result.level} (${result.score}/5)`)
        .join(' | ');
}

async function parseLarkResponse(response: Response) {
    const data = await response.json();
    if (!response.ok || data?.code !== 0) {
        throw new Error(data?.msg || `Lark API request failed with status ${response.status}`);
    }
    return data;
}

async function getLarkToken() {
    const appId = process.env.LARK_APP_ID?.trim();
    const appSecret = process.env.LARK_APP_SECRET?.trim();
    if (appId && appSecret) {
        const response = await fetch(`${LARK_OPEN_API}/auth/v3/tenant_access_token/internal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                app_id: appId,
                app_secret: appSecret,
            }),
        });

        const data = await response.json();
        if (response.ok && data?.code === 0 && data?.tenant_access_token) {
            return String(data.tenant_access_token);
        }
    }

    const staticToken = process.env.LARK_BASE_AUTH_CODE?.trim();
    if (staticToken) {
        return staticToken;
    }

    throw new Error('No usable Lark token strategy found (check APP_ID/APP_SECRET or BASE_AUTH_CODE).');
}

async function getLarkTableFieldNames(token: string, appToken: string, tableId: string) {
    const response = await fetch(
        `${LARK_OPEN_API}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields?page_size=500`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );

    const data = await parseLarkResponse(response);

    const items = (data?.data?.items ?? []) as Array<{ field_name?: string }>;
    return new Set(items.map((item) => String(item.field_name ?? '').trim()).filter(Boolean));
}

async function createLarkTable(token: string, appToken: string, tableName: string) {
    const response = await fetch(
        `${LARK_OPEN_API}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                table: {
                    name: tableName,
                },
            }),
        },
    );

    const data = await parseLarkResponse(response);
    const tableId = data?.data?.table_id || data?.data?.table?.table_id || data?.data?.table?.id;
    if (!tableId) {
        throw new Error('Lark table created but table id was not returned.');
    }
    return String(tableId);
}

async function resolveLarkTableId(token: string, appToken: string) {
    const configuredTableId = process.env.LARK_TABLE_ID?.trim();
    if (configuredTableId) {
        return {
            tableId: configuredTableId,
            source: 'env_table_id',
        };
    }

    const response = await fetch(
        `${LARK_OPEN_API}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables?page_size=100`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );

    const data = await parseLarkResponse(response);

    const preferredName = (process.env.LARK_TABLE_NAME || 'Digital Maturity Leads').trim().toLowerCase();
    const items = (data?.data?.items ?? []) as Array<{ table_id?: string; name?: string }>;
    const preferred = items.find((item) => clean(item.name, 200).toLowerCase() === preferredName);
    if (preferred?.table_id) {
        return {
            tableId: preferred.table_id,
            source: 'matched_table_name',
        };
    }

    if (items[0]?.table_id) {
        return {
            tableId: items[0].table_id,
            source: 'first_table_fallback',
        };
    }

    const createdTableId = await createLarkTable(token, appToken, process.env.LARK_TABLE_NAME?.trim() || 'Digital Maturity Leads');
    return {
        tableId: createdTableId,
        source: 'created_table',
    };
}

async function ensureLarkFields(token: string, appToken: string, tableId: string) {
    let fields = await getLarkTableFieldNames(token, appToken, tableId);
    const missing = LARK_REQUIRED_FIELDS.filter((field) => !fields.has(field.name));

    for (const field of missing) {
        try {
            const response = await fetch(
                `${LARK_OPEN_API}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        field_name: field.name,
                        type: field.type,
                    }),
                },
            );

            await parseLarkResponse(response);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            if (!/duplicate|exists|already/i.test(message)) {
                throw error;
            }
        }
    }

    if (missing.length > 0) {
        fields = await getLarkTableFieldNames(token, appToken, tableId);
    }
    return fields;
}

async function saveLeadToLark(lead: LeadPayload, businessProfile: BusinessProfilePayload, results: ResultsPayload, submittedAt: string) {
    const appToken = process.env.LARK_APP_TOKEN?.trim();

    if (!appToken) {
        return {
            saved: false,
            reason: 'LARK_APP_TOKEN is not configured.',
        };
    }

    const token = await getLarkToken();
    const { tableId, source } = await resolveLarkTableId(token, appToken);
    const existingFields = await ensureLarkFields(token, appToken, tableId);
    const candidateFields: Record<string, string | number> = {
        'Full name': lead.name,
        'Work email': lead.email,
        Organisation: lead.company,
        Industry: clean(businessProfile.industry, 120),
        'Business scale': clean(businessProfile.scale, 120),
        'Business type': clean(businessProfile.type, 120),
        'Overall maturity level': clean(results.overallMaturityLevel, 120),
        'Overall maturity score': Number(results.overallMaturityScore || 0),
        'Dimension summary': buildSummary(results),
        'Submitted at': submittedAt,
        Source: 'website_digital_maturity_assessment',
        'Lead status': 'New',
        'Auto-response sent': 'Pending',
        'Report generated': 'Yes',
    };

    const fields: Record<string, string | number> = {};
    Object.entries(candidateFields).forEach(([key, value]) => {
        if (!existingFields.size || existingFields.has(key)) {
            if (value !== '' && value !== 0) {
                fields[key] = value;
            }
        }
    });

    if (Object.keys(fields).length === 0) {
        return {
            saved: false,
            reason: 'No matching columns found in the configured Lark table.',
        };
    }

    const response = await fetch(
        `${LARK_OPEN_API}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fields }),
        },
    );

    const data = await parseLarkResponse(response);

    return {
        saved: true,
        tableSource: source,
        tableId,
        recordId: data?.data?.record?.record_id ?? null,
    };
}

async function updateLarkLeadRecord(record: { tableId: string; recordId: string }, fields: Record<string, string>) {
    const appToken = process.env.LARK_APP_TOKEN?.trim();
    if (!appToken) return;

    const token = await getLarkToken();
    const response = await fetch(
        `${LARK_OPEN_API}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(record.tableId)}/records/${encodeURIComponent(record.recordId)}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fields }),
        },
    );
    await parseLarkResponse(response);
}

function createMailer() {
    const host = process.env.AWS_SES_HOST;
    const port = Number(process.env.AWS_SES_PORT || 0);
    const user = process.env.AWS_SES_USERNAME;
    const pass = process.env.AWS_SES_PASSWORD;

    if (!host || !port || !user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });
}

function buildPdfAttachment(
    lead: LeadPayload,
    businessProfile: BusinessProfilePayload,
    results: ResultsPayload,
    submittedAt: string,
) {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const slate: [number, number, number] = [2, 4, 8];
    const white: [number, number, number] = [255, 255, 255];
    const gold: [number, number, number] = [255, 217, 3];
    const muted: [number, number, number] = [130, 138, 150];

    doc.setFillColor(slate[0], slate[1], slate[2]);
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.text('Radoss', pageWidth / 2, 52, { align: 'center' });
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('.', pageWidth / 2 + (doc.getTextWidth('Radoss') / 2), 52, { align: 'left' });

    doc.setFontSize(16);
    doc.text('Digital Maturity Assessment Report', pageWidth / 2, 72, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.setFontSize(10);
    doc.text(`Lead: ${lead.name} | ${lead.company}`, pageWidth / 2, 84, { align: 'center' });
    doc.text(`Email: ${lead.email}`, pageWidth / 2, 91, { align: 'center' });
    doc.text(`Submitted: ${new Date(submittedAt).toLocaleString()}`, pageWidth / 2, 98, { align: 'center' });

    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(20, 23, 30);
    doc.text('Assessment Snapshot', margin, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Industry: ${clean(businessProfile.industry, 120) || 'N/A'}`, margin, 30);
    doc.text(`Business Scale: ${clean(businessProfile.scale, 120) || 'N/A'}`, margin, 37);
    doc.text(`Business Type: ${clean(businessProfile.type, 120) || 'N/A'}`, margin, 44);
    doc.text(
        `Overall Maturity: ${clean(results.overallMaturityLevel, 120) || 'N/A'} (${Number(results.overallMaturityScore || 0)}/5)`,
        margin,
        51,
    );

    const rows = Object.entries(results.dimensionResults ?? {}).map(([dimension, item]) => [
        dimension,
        item.level,
        `${item.score}/5`,
    ]);

    autoTable(doc, {
        startY: 58,
        head: [['Dimension', 'Level', 'Score']],
        body: rows.length ? rows : [['N/A', 'N/A', 'N/A']],
        theme: 'striped',
        headStyles: { fillColor: [71, 69, 214], textColor: [255, 255, 255] },
        styles: { fontSize: 9, cellPadding: 2.5 },
    });

    const reportBuffer = Buffer.from(doc.output('arraybuffer'));
    return {
        filename: 'Radoss_Agency_Digital_Maturity_Report.pdf',
        content: reportBuffer,
        contentType: 'application/pdf',
    };
}

async function sendLeadEmails(lead: LeadPayload, businessProfile: BusinessProfilePayload, results: ResultsPayload, submittedAt: string) {
    const transporter = createMailer();
    if (!transporter) {
        return {
            sent: false,
            internalSent: false,
            autoSent: false,
            reason: 'Email provider credentials are not configured.',
        };
    }

    const fromCandidates = Array.from(
        new Set(
            [
                process.env.MAIL_FROM_ADDRESS,
                process.env.AWS_SES_USERNAME,
                'hello@radoss.agency',
            ]
                .map((value) => clean(value, 320))
                .filter((value) => isValidEmail(value))
                .filter(Boolean),
        ),
    );
    const notifyTo = process.env.DMAT_NOTIFY_EMAIL || process.env.MAIL_FROM_ADDRESS || process.env.AWS_SES_USERNAME;
    const maturityLabel = clean(results.overallMaturityLevel, 120) || 'N/A';
    const maturityScore = Number(results.overallMaturityScore || 0);
    const dimensionSummary = buildSummary(results);
    const attachment = buildPdfAttachment(lead, businessProfile, results, submittedAt);

    const sendWithFromFallback = async (options: Omit<nodemailer.SendMailOptions, 'from'>) => {
        const failures: string[] = [];

        for (const from of fromCandidates) {
            try {
                await transporter.sendMail({
                    ...options,
                    from,
                });
                return { ok: true as const, from };
            } catch (error) {
                failures.push(error instanceof Error ? error.message : String(error));
            }
        }

        return {
            ok: false as const,
            reason: failures.join(' | '),
        };
    };

    const internalPromise = notifyTo
        ? sendWithFromFallback({
            to: notifyTo,
            replyTo: lead.email,
            subject: `New DMAT Lead: ${lead.name} (${lead.company})`,
            text: [
                'New Digital Maturity Assessment lead captured.',
                '',
                `Name: ${lead.name}`,
                `Company: ${lead.company}`,
                `Email: ${lead.email}`,
                `Industry: ${clean(businessProfile.industry, 120) || 'N/A'}`,
                `Scale: ${clean(businessProfile.scale, 120) || 'N/A'}`,
                `Business Type: ${clean(businessProfile.type, 120) || 'N/A'}`,
                `Overall Maturity: ${maturityLabel} (${maturityScore}/5)`,
                `Dimension Summary: ${dimensionSummary}`,
                `Submitted At: ${submittedAt}`,
            ].join('\n'),
            attachments: [attachment],
        })
        : Promise.resolve();

    const autoPromise = sendWithFromFallback({
        to: lead.email,
        subject: 'Your Radoss Digital Maturity Assessment Report',
        text: [
            `Hi ${lead.name},`,
            '',
            'Thank you for completing the Radoss Digital Maturity Assessment.',
            'Your report download has started, and we have your summary on file.',
            '',
            `Current maturity profile: ${maturityLabel} (${maturityScore}/5)`,
            '',
            'If you want a guided roadmap session, reply to this email and our team will follow up.',
            '',
            'Radoss Agency',
            'Connecting Dots. Crafting Growth.',
        ].join('\n'),
        attachments: [attachment],
    });

    const [internalResult, autoResult] = await Promise.allSettled([internalPromise, autoPromise]);
    const internalReason =
        internalResult.status === 'rejected'
            ? (internalResult.reason instanceof Error ? internalResult.reason.message : String(internalResult.reason))
            : internalResult.value && typeof internalResult.value === 'object' && 'ok' in internalResult.value && !internalResult.value.ok
                ? internalResult.value.reason
            : null;
    const autoReason =
        autoResult.status === 'rejected'
            ? (autoResult.reason instanceof Error ? autoResult.reason.message : String(autoResult.reason))
            : autoResult.value && typeof autoResult.value === 'object' && 'ok' in autoResult.value && !autoResult.value.ok
                ? autoResult.value.reason
            : null;

    return {
        sent:
            (internalResult.status === 'fulfilled' && !!(internalResult.value && typeof internalResult.value === 'object' && 'ok' in internalResult.value ? internalResult.value.ok : true))
            || (autoResult.status === 'fulfilled' && !!(autoResult.value && typeof autoResult.value === 'object' && 'ok' in autoResult.value ? autoResult.value.ok : true)),
        internalSent:
            internalResult.status === 'fulfilled'
            && !!(internalResult.value && typeof internalResult.value === 'object' && 'ok' in internalResult.value ? internalResult.value.ok : true),
        autoSent:
            autoResult.status === 'fulfilled'
            && !!(autoResult.value && typeof autoResult.value === 'object' && 'ok' in autoResult.value ? autoResult.value.ok : true),
        reason: [internalReason, autoReason].filter(Boolean).join(' | ') || undefined,
    };
}

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as RequestPayload;
        const lead = payload?.lead;
        const businessProfile = payload?.businessProfile ?? {};
        const results = payload?.results ?? {};

        const name = clean(lead?.name, 120);
        const company = clean(lead?.company, 160);
        const email = clean(lead?.email, 160).toLowerCase();

        if (!name || !company || !email) {
            return NextResponse.json(
                { success: false, message: 'Name, company, and email are required.' },
                { status: 422 },
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { success: false, message: 'Enter a valid email address.' },
                { status: 422 },
            );
        }

        const submittedAt = new Date().toISOString();
        const sanitizedLead: LeadPayload = { name, company, email };

        let larkResult: { saved: boolean; reason?: string; recordId?: string | null; tableSource?: string; tableId?: string } = { saved: false, reason: 'Not attempted' };
        let emailResult: { sent: boolean; internalSent: boolean; autoSent: boolean; reason?: string } = {
            sent: false,
            internalSent: false,
            autoSent: false,
            reason: 'Not attempted',
        };

        try {
            larkResult = await saveLeadToLark(sanitizedLead, businessProfile, results, submittedAt);
        } catch (error) {
            larkResult = {
                saved: false,
                reason: error instanceof Error ? error.message : 'Lark sync failed.',
            };
        }

        try {
            emailResult = await sendLeadEmails(sanitizedLead, businessProfile, results, submittedAt);
        } catch (error) {
            emailResult = {
                sent: false,
                internalSent: false,
                autoSent: false,
                reason: error instanceof Error ? error.message : 'Email delivery failed.',
            };
        }

        if (larkResult.saved && larkResult.recordId && larkResult.tableId) {
            try {
                await updateLarkLeadRecord(
                    { tableId: larkResult.tableId, recordId: larkResult.recordId },
                    {
                        'Lead status': emailResult.autoSent ? 'Qualified - report sent' : 'New - email retry required',
                        'Auto-response sent': emailResult.autoSent ? 'Yes' : `No (${clean(emailResult.reason, 220) || 'Delivery failed'})`,
                        'Report generated': 'Yes',
                    },
                );
            } catch (error) {
                larkResult = {
                    ...larkResult,
                    reason: `${larkResult.reason ? `${larkResult.reason} | ` : ''}Status update failed: ${error instanceof Error ? error.message : String(error)}`,
                };
            }
        }

        const syncStatus =
            larkResult.saved && emailResult.sent
                ? 'full'
                : larkResult.saved || emailResult.sent
                    ? 'partial'
                    : 'failed';

        const message =
            syncStatus === 'full'
                ? 'Lead captured successfully.'
                : syncStatus === 'partial'
                    ? 'Lead captured with partial sync.'
                    : 'Lead accepted, but Lark/email sync failed. Check integration configuration.';

        return NextResponse.json({
            success: true,
            accepted: true,
            syncStatus,
            message,
            lark: larkResult,
            email: emailResult,
        });
    } catch (error) {
        console.error('Digital maturity lead capture failed:', error);
        return NextResponse.json(
            { success: false, message: 'Could not process lead submission.' },
            { status: 500 },
        );
    }
}
