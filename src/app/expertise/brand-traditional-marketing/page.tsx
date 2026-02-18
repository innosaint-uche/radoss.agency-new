import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../detail.module.css';
import { SolutionCTA } from '../../../components/SolutionCTA';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Brand & Traditional Marketing Services',
    description: 'Build a resonant brand through strategy, identity design, ATL and BTL campaigns, and integrated communications planning.',
    keywords: [
        'brand strategy agency lagos',
        'traditional marketing services nigeria',
        'atl and btl campaign planning',
        'ttl marketing campaigns',
        'public relations support',
    ],
    alternates: {
        canonical: 'https://radoss.agency/expertise/brand-traditional-marketing',
    },
    openGraph: {
        title: 'Brand & Traditional Marketing | Radoss Agency',
        description: 'From strategy to ATL/BTL execution, we help brands build trust, recall, and market relevance.',
        url: 'https://radoss.agency/expertise/brand-traditional-marketing',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Brand & Traditional Marketing',
    provider: {
        '@type': 'Organization',
        name: 'Radoss Agency',
        url: 'https://radoss.agency',
    },
    serviceType: 'Brand Strategy and Traditional Marketing',
    areaServed: ['Nigeria', 'Global'],
    description: 'Strategic brand development and traditional campaign execution including ATL, BTL, and integrated TTL programs.',
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Can traditional marketing still deliver results?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Traditional channels like TV, radio, print, and outdoor media remain effective when integrated with digital planning and clear performance objectives.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you handle both brand strategy and campaign execution?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. We support discovery, positioning, identity, media planning, creative production, activation, and post-campaign performance reviews.',
            },
        },
    ],
};

export default function BrandMarketing() {
    return (
        <>
            <SchemaMarkup data={serviceSchema} />
            <SchemaMarkup data={faqSchema} />
            <section className={styles.hero}>
                <div className="container">
                    <Link href="/expertise" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '2rem', display: 'inline-block' }}>← Return to Expertise</Link>
                    <h1 className={styles.title}>Brand & Traditional Marketing</h1>
                    <p className={styles.subtitle}>
                        Crafting Brands That Resonate & Reach.
                    </p>
                </div>
            </section>

            <section className={`container ${styles.introSection}`}>
                <p className={styles.introText}>
                    Strong brands win market attention faster and hold customer trust longer. Radoss Agency helps organizations define distinctive brand positions and activate those positions through coordinated traditional and integrated campaigns that connect with real audiences.
                </p>
            </section>

            <div className={`container ${styles.detailList}`}>
                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Brand Strategy & Identity</h2>
                        <p className={styles.detailDesc}>Defining Your Unique Voice</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>A brand is a business asset. We build strategic foundations that guide perception, communication, and consistency.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Brand Discovery:</strong> Positioning audits across category context and audience need.</li>
                            <li className={styles.bulletItem}><strong>Messaging Architecture:</strong> Value proposition, tone system, and narrative pillars.</li>
                            <li className={styles.bulletItem}><strong>Visual Identity Development:</strong> Logo systems, typography, color, and usage logic.</li>
                            <li className={styles.bulletItem}><strong>Brand Governance:</strong> Guidelines and rollout support for consistency at scale.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>ATL Advertising</h2>
                        <p className={styles.detailDesc}>Broad Reach, Strategic Recall</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Media Planning & Buying:</strong> Channel selection optimized for audience and budget.</li>
                            <li className={styles.bulletItem}><strong>Creative Development:</strong> TV, radio, print, and outdoor concepts with strong recall value.</li>
                            <li className={styles.bulletItem}><strong>Production Management:</strong> End-to-end campaign production supervision.</li>
                            <li className={styles.bulletItem}><strong>Launch Governance:</strong> Flighting, quality checks, and delivery oversight.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>BTL Activations & Events</h2>
                        <p className={styles.detailDesc}>Direct, Memorable Engagement</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Experiential Campaigns:</strong> Interactive activations that build brand intimacy.</li>
                            <li className={styles.bulletItem}><strong>In-Store & Field Programs:</strong> On-ground initiatives designed for direct response.</li>
                            <li className={styles.bulletItem}><strong>Event Strategy:</strong> Product launches, sponsorship activations, and audience immersion.</li>
                            <li className={styles.bulletItem}><strong>Data Capture Workflows:</strong> Lead capture and measurement integration for follow-up.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Integrated TTL Campaigns</h2>
                        <p className={styles.detailDesc}>A Unified Brand Experience</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Cross-Channel Strategy:</strong> One message architecture across ATL, BTL, and digital.</li>
                            <li className={styles.bulletItem}><strong>Journey Synchronization:</strong> Coordinated touchpoints from awareness to conversion.</li>
                            <li className={styles.bulletItem}><strong>Budget Synergy:</strong> Integrated media allocation for stronger campaign efficiency.</li>
                            <li className={styles.bulletItem}><strong>Unified Reporting:</strong> Combined channel performance tied to business objectives.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="container" style={{ paddingBottom: '100px' }}>
                <SolutionCTA
                    title="Elevate Your Brand Presence"
                    description="Build a brand platform that is clear, credible, and consistent across every market touchpoint."
                />
            </section>
        </>
    );
}
