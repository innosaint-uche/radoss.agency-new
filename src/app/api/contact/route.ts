import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: process.env.MAIL_FROM_ADDRESS || 'hello@radoss.agency',
            to: process.env.MAIL_TO_ADDRESS || process.env.MAIL_FROM_ADDRESS || 'hello@radoss.agency',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `,
            html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (data.error) {
            console.error('Resend API Error:', data.error);
            return NextResponse.json(
                { error: 'Failed to send email via Resend' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Email sent successfully', data },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}

