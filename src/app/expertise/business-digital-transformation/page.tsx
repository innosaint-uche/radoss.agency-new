import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../detail.module.css';
import { SolutionCTA } from '../../../components/SolutionCTA';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Business & Digital Transformation Services',
    description: 'Transform operations with strategy-led digital transformation services including MarTech optimization, technology integration, and change management.',
    keywords: [
        'business transformation consulting lagos',
        'digital transformation services nigeria',
        'martech audit and optimization',
        'change management support',
        'sales and marketing alignment',
    ],
    alternates: {
        canonical: 'https://radoss.agency/expertise/business-digital-transformation',
    },
    openGraph: {
        title: 'Business & Digital Transformation | Radoss Agency',
        description: 'Align strategy, processes, and technology to unlock operational efficiency and sustainable growth.',
        url: 'https://radoss.agency/expertise/business-digital-transformation',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business & Digital Transformation',
    provider: {
        '@type': 'Organization',
        name: 'Radoss Agency',
        url: 'https://radoss.agency',
    },
    serviceType: 'Business Transformation Consulting',
    areaServed: ['Nigeria', 'Global'],
    description: 'Strategy-led transformation services connecting business operations, marketing systems, and technology adoption.',
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does business and digital transformation include?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'It includes sales and marketing alignment, process optimization, MarTech and system integration, and change management support to improve operating performance.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you support technology adoption for internal teams?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. We provide onboarding frameworks, stakeholder engagement plans, training support, and adoption measurement so transformation outcomes are sustained.',
            },
        },
    ],
};

export default function BusinessTransformation() {
    return (
        <>
            <SchemaMarkup data={serviceSchema} />
            <SchemaMarkup data={faqSchema} />
            <section className={styles.hero}>
                <div className="container">
                    <Link href="/expertise" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '2rem', display: 'inline-block' }}>← Return to Expertise</Link>
                    <h1 className={styles.title}>Business & Digital Transformation</h1>
                    <p className={styles.subtitle}>
                        Navigate Change, Engineer Growth.
                    </p>
                </div>
            </section>

            <section className={`container ${styles.introSection}`}>
                <p className={styles.introText}>
                    Transformation is not a one-time initiative. It is an ongoing operating discipline that aligns people, process, and platforms with business ambition. Radoss Agency supports leadership teams with practical transformation programs that improve efficiency, customer outcomes, and organizational resilience.
                </p>
            </section>

            <div className={`container ${styles.detailList}`}>
                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Marketing & Sales Alignment</h2>
                        <p className={styles.detailDesc}>Unifying for Impact</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Break down functional silos and establish one revenue view across the full funnel.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Shared KPI Framework:</strong> Unified goals, scorecards, and accountability loops.</li>
                            <li className={styles.bulletItem}><strong>Lead Management Design:</strong> Better qualification, handoff, and follow-through systems.</li>
                            <li className={styles.bulletItem}><strong>Cross-Functional Reporting:</strong> Joint dashboards that improve decision speed and clarity.</li>
                            <li className={styles.bulletItem}><strong>Funnel Content Alignment:</strong> Messaging that supports both awareness and conversion stages.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Process Optimization (MarTech)</h2>
                        <p className={styles.detailDesc}>Streamline and Scale</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Current-State Mapping:</strong> Workflow analysis to uncover bottlenecks and duplication.</li>
                            <li className={styles.bulletItem}><strong>MarTech Stack Review:</strong> Tool rationalization and architecture recommendations.</li>
                            <li className={styles.bulletItem}><strong>Automation Design:</strong> Reduced manual workload through practical workflow automation.</li>
                            <li className={styles.bulletItem}><strong>Data Integration:</strong> Cleaner data flow for a reliable single source of truth.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Technology Integration & Adoption</h2>
                        <p className={styles.detailDesc}>Connect Your Digital Ecosystem</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Platform Integration Strategy:</strong> CRM, ERP, and marketing stack interoperability planning.</li>
                            <li className={styles.bulletItem}><strong>API & Data Synchronization:</strong> Reliable data movement between business-critical systems.</li>
                            <li className={styles.bulletItem}><strong>Migration Planning:</strong> Structured transition from legacy to modern environments.</li>
                            <li className={styles.bulletItem}><strong>Performance Governance:</strong> Ongoing tuning to maintain system effectiveness over time.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Change Management Support</h2>
                        <p className={styles.detailDesc}>Make Transformation Stick</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Stakeholder Mapping:</strong> Clear ownership and sponsor alignment across teams.</li>
                            <li className={styles.bulletItem}><strong>Communication Planning:</strong> Consistent messaging before, during, and after rollout phases.</li>
                            <li className={styles.bulletItem}><strong>Capability Building:</strong> Training pathways that improve adoption and confidence.</li>
                            <li className={styles.bulletItem}><strong>Resistance Management:</strong> Practical frameworks to reduce friction and improve buy-in.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="container" style={{ paddingBottom: '100px' }}>
                <SolutionCTA
                    title="Engineer Your Evolution"
                    description="Modernize operations with a transformation partner focused on measurable outcomes, not slide decks."
                />
            </section>
        </>
    );
}
