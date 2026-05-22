import type { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import AIPartnersClient from './AIPartnersClient';
import './ai-partners.css';

export const metadata: Metadata = {
    title: 'Radoss AI Partners — We Close the AI Execution Gap',
    description:
        'Enterprise AI investment is at an all-time high, but most of it stalls between strategy and execution. By day 60 with Radoss AI Partners, you have real AI in production and a team equipped to keep building.',
    keywords: [
        'AI consulting Nigeria',
        'AI transformation Africa',
        'AI implementation agency',
        'forward deployed engineers',
        'AI operating model',
        'AI governance framework',
        'enterprise AI execution',
        '60 day AI sprint',
        'AI product leaders',
        'AI training for teams',
        'Radoss AI Partners',
    ],
    alternates: { canonical: '/ai/ai-partners' },
    openGraph: {
        title: 'Radoss AI Partners — We Close the AI Execution Gap',
        description:
            'Forward Deployed Engineers, AI Product Leaders, and an integrated strategy practice. Real AI in production by day 60.',
        url: 'https://radoss.agency/ai/ai-partners',
        siteName: 'Radoss Agency',
        type: 'website',
        locale: 'en_NG',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Radoss AI Partners — We Close the AI Execution Gap',
        description: 'Real AI in production by day 60. Forward Deployed Engineers + AI Product Leaders + integrated strategy.',
    },
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Radoss AI Partners',
    serviceType: 'AI Transformation Consulting',
    provider: {
        '@type': 'ProfessionalService',
        name: 'Radoss Agency',
        url: 'https://radoss.agency',
        email: 'ai@radoss.agency',
        telephone: '+234 703 382 7657',
    },
    areaServed: [
        { '@type': 'Country', name: 'Nigeria' },
        { '@type': 'Place', name: 'Africa' },
        { '@type': 'Place', name: 'Global' },
    ],
    description:
        'A 60-day forward-deployed engagement to ship real AI into production and equip your team to keep building. Combines AI assessment, implementation by Forward Deployed Engineers, and customised training by AI Product Leaders.',
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Partner Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Assessment', description: 'Cross-domain opportunity map across Workflows, Governance, Tech & Data, Operating Model, and People & Skills.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Implementation', description: 'Forward Deployed Engineers build the AI operating model inside your stack, governance, and risk appetite.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Training', description: 'Customised programs led by AI Product Leaders, aligned to the operating model you just shipped.' } },
        ],
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://radoss.agency/' },
        { '@type': 'ListItem', position: 2, name: 'AI', item: 'https://radoss.agency/ai' },
        { '@type': 'ListItem', position: 3, name: 'AI Partners', item: 'https://radoss.agency/ai/ai-partners' },
    ],
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is the AI execution gap?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The AI execution gap is the distance between AI strategy decks and AI actually running inside your business. Most enterprise AI investment stalls here: pilots run in isolation, operating models stay theoretical, and teams get trained on concepts they cannot apply.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long is a Radoss AI Partners engagement?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A standard engagement is 60 days. Week 1–2 is AI Assessment, weeks 3–6 are implementation and quick wins, weeks 7–8 are operating-model production and team handoff.',
            },
        },
        {
            '@type': 'Question',
            name: 'What are Forward Deployed Engineers?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Senior AI engineers who embed inside your team and build the AI operating model with you, in your codebase, your governance posture, and your stack. Not a vendor handover — a working partnership.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which five domains does the AI assessment cover?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Workflows, Governance, Tech & Data, Operating Model, and People & Skills. Mapped together in week one to surface the highest-leverage opportunities.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you offer AI training without implementation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Standalone AI training is available, but the highest impact comes when training runs in parallel with implementation — both informed by the same assessment, so your team builds skills around the operating model they will actually use.',
            },
        },
    ],
};

export default function AIPartnersPage() {
    return (
        <>
            <SchemaMarkup data={serviceSchema} />
            <SchemaMarkup data={breadcrumbSchema} />
            <SchemaMarkup data={faqSchema} />
            <AIPartnersClient />
        </>
    );
}
