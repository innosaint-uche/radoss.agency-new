import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Our Expertise in Integrated Marketing & Transformation',
    description: 'Explore Radoss Agency capabilities across digital performance marketing, business and digital transformation, and brand plus traditional marketing.',
    keywords: [
        'integrated marketing services',
        'digital transformation consulting',
        'performance marketing agency lagos',
        'brand strategy and traditional advertising',
    ],
    alternates: {
        canonical: 'https://radoss.agency/expertise',
    },
    openGraph: {
        title: 'Our Expertise | Radoss Agency',
        description: 'Integrated capabilities for growth-focused brands: performance marketing, transformation, and brand strategy.',
        url: 'https://radoss.agency/expertise',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const expertiseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Radoss Agency Expertise',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            url: 'https://radoss.agency/expertise/digital-performance-marketing',
            name: 'Digital & Performance Marketing',
        },
        {
            '@type': 'ListItem',
            position: 2,
            url: 'https://radoss.agency/expertise/business-digital-transformation',
            name: 'Business & Digital Transformation',
        },
        {
            '@type': 'ListItem',
            position: 3,
            url: 'https://radoss.agency/expertise/brand-traditional-marketing',
            name: 'Brand & Traditional Marketing',
        },
    ],
};

export default function Expertise() {
    return (
        <div className={styles.main}>
            <SchemaMarkup data={expertiseSchema} />

            <header className={styles.header}>
                <div className="container">
                    <span className={styles.eyebrow}>Our Capabilities</span>
                    <h1 className={styles.title}>
                        Holistic<br />Competence<span className="text-punctuation">.</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '760px', marginTop: '1.5rem', lineHeight: 1.7 }}>
                        We deliver integrated solutions across strategy, execution, and systems. Each capability is designed to strengthen business outcomes, improve customer journeys, and create durable competitive advantage.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className={styles.bentoGrid}>
                    <Link href="/expertise/digital-performance-marketing" className={styles.gridItem}>
                        <div className={styles.itemMeta}>
                            <span className={styles.number} style={{ color: 'var(--brand-gold)' }}>01</span>
                            <div className={styles.tagPill}>Performance</div>
                        </div>
                        <div className={styles.itemContent}>
                            <h2 className={styles.itemTitle}>Digital<br />Marketing</h2>
                            <p className={styles.itemDesc}>
                                Search, paid media, social, automation, and analytics programs engineered for growth efficiency and stronger return on marketing investment.
                            </p>
                            <span className={styles.linkArrow}>Explore &rarr;</span>
                        </div>
                    </Link>

                    <Link href="/expertise/business-digital-transformation" className={styles.gridItem}>
                        <div className={styles.itemMeta}>
                            <span className={styles.number} style={{ color: 'var(--brand-blue)' }}>02</span>
                            <div className={styles.tagPill}>Operations</div>
                        </div>
                        <div className={styles.itemContent}>
                            <h2 className={styles.itemTitle}>Business<br />Transformation</h2>
                            <p className={styles.itemDesc}>
                                Sales and marketing alignment, process redesign, MarTech integration, and adoption programs that improve speed and performance at scale.
                            </p>
                            <span className={styles.linkArrow}>Explore &rarr;</span>
                        </div>
                    </Link>

                    <Link href="/expertise/brand-traditional-marketing" className={styles.gridItem}>
                        <div className={styles.itemMeta}>
                            <span className={styles.number} style={{ color: 'var(--text-tertiary)' }}>03</span>
                            <div className={styles.tagPill}>Identity</div>
                        </div>
                        <div className={styles.itemContent}>
                            <h2 className={styles.itemTitle}>Brand &<br />Traditional</h2>
                            <p className={styles.itemDesc}>
                                Brand positioning, creative platforms, ATL/BTL planning, and public relations support that build trust, recall, and market relevance.
                            </p>
                            <span className={styles.linkArrow}>Explore &rarr;</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
