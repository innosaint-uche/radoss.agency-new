import type { Metadata } from 'next';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
    title: 'Our Work | Case Studies in Business, Marketing & Technology',
    description: 'Explore Radoss Agency case studies showing how integrated strategy, marketing execution, and technology modernization deliver measurable outcomes.',
    keywords: [
        'radoss agency case studies',
        'marketing transformation portfolio',
        'digital campaign results nigeria',
        'business growth projects',
    ],
    alternates: {
        canonical: 'https://radoss.agency/work',
    },
    openGraph: {
        title: 'Our Work | Radoss Agency Case Studies',
        description: 'See how Radoss Agency has delivered measurable growth outcomes for ambitious brands.',
        url: 'https://radoss.agency/work',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

export default function WorkPage() {
    return <WorkClient />;
}
