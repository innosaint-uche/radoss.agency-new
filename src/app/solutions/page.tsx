import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Radoss Solutions & Services',
    description: 'Explore solution products from Radoss Agency including performance marketing, Meta ads payment in Naira, WABAR API, and digital maturity assessment.',
    keywords: [
        'radoss solutions',
        'pay meta ads in naira',
        'whatsapp business api nigeria',
        'digital maturity assessment tool',
        'performance marketing solutions',
    ],
    alternates: {
        canonical: 'https://radoss.agency/solutions',
    },
    openGraph: {
        title: 'Radoss Solutions & Services',
        description: 'Specialized solutions for growth marketing, payments, messaging automation, and digital readiness.',
        url: 'https://radoss.agency/solutions',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const solutionsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Radoss Solutions',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Radoss Digital',
            url: 'https://radoss.agency/solutions/radoss-digital',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Pay Meta Ads in Naira',
            url: 'https://radoss.agency/solutions/meta-ads-payment',
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'WABAR by Radoss',
            url: 'https://radoss.agency/solutions/wabar-whatsapp-api',
        },
        {
            '@type': 'ListItem',
            position: 4,
            name: 'Digital Maturity Assessment',
            url: 'https://radoss.agency/solutions/digital-maturity-assessment',
        },
    ],
};

export default function SolutionsPage() {
    return (
        <div className={styles.main}>
            <SchemaMarkup data={solutionsSchema} />
            <header className={styles.header}>
                <div className="container">
                    <span className={styles.eyebrow}>Radoss Services</span>
                    <h1 className={styles.title}>
                        Solutions Built<br />for Growth<span className="text-punctuation">.</span>
                    </h1>
                    <p className={styles.intro}>
                        Explore specialized service lines designed to solve practical growth bottlenecks across demand generation, campaign operations, customer communication, and digital readiness.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className={styles.grid}>
                    <Link href="/solutions/radoss-digital" className={styles.card}>
                        <span className={styles.number}>01</span>
                        <h2>Radoss Digital</h2>
                        <p>Performance marketing services that connect media investment to attributable business outcomes.</p>
                        <span className={styles.linkArrow}>View Solution &rarr;</span>
                    </Link>

                    <Link href="/solutions/meta-ads-payment" className={styles.card}>
                        <span className={styles.number}>02</span>
                        <h2>Pay Meta Ads in Naira</h2>
                        <p>Compliant local-currency payment workflow for uninterrupted Facebook and Instagram ad delivery.</p>
                        <span className={styles.linkArrow}>View Solution &rarr;</span>
                    </Link>

                    <Link href="/solutions/wabar-whatsapp-api" className={styles.card}>
                        <span className={styles.number}>03</span>
                        <h2>WABAR API</h2>
                        <p>Enterprise WhatsApp Business API implementation for support automation and conversational commerce.</p>
                        <span className={styles.linkArrow}>View Solution &rarr;</span>
                    </Link>

                    <Link href="/solutions/digital-maturity-assessment" className={styles.card}>
                        <span className={styles.number}>04</span>
                        <h2>Digital Maturity Assessment (FREE)</h2>
                        <p>Free strategic diagnostic to benchmark digital capabilities and prioritize transformation initiatives.</p>
                        <span className={styles.linkArrow}>View Solution &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
