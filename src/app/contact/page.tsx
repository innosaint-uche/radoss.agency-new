import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Radoss Agency | Start Your Growth Conversation',
    description: 'Contact Radoss Agency to discuss business strategy, performance marketing, and digital transformation support tailored to your goals.',
    keywords: [
        'contact radoss agency',
        'marketing agency lagos',
        'digital transformation consultant nigeria',
        'growth strategy consultation',
    ],
    alternates: {
        canonical: 'https://radoss.agency/contact',
    },
    openGraph: {
        title: 'Contact Radoss Agency | Start Your Growth Conversation',
        description: 'Speak with the Radoss team about integrated business, marketing, and technology solutions.',
        url: 'https://radoss.agency/contact',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
