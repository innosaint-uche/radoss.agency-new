import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../detail.module.css';
import { SolutionCTA } from '../../../components/SolutionCTA';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Digital & Performance Marketing Services',
    description: 'Data-driven digital marketing services spanning SEO, paid media, social, automation, and analytics for measurable revenue growth.',
    keywords: [
        'digital performance marketing lagos',
        'seo and content strategy',
        'ppc management nigeria',
        'social media marketing agency',
        'marketing analytics and attribution',
    ],
    alternates: {
        canonical: 'https://radoss.agency/expertise/digital-performance-marketing',
    },
    openGraph: {
        title: 'Digital & Performance Marketing | Radoss Agency',
        description: 'Integrated SEO, paid media, social, automation, and analytics programs designed for measurable growth.',
        url: 'https://radoss.agency/expertise/digital-performance-marketing',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital & Performance Marketing',
    provider: {
        '@type': 'Organization',
        name: 'Radoss Agency',
        url: 'https://radoss.agency',
    },
    serviceType: 'Digital Marketing',
    areaServed: ['Nigeria', 'Global'],
    description: 'Full-funnel digital marketing services focused on growth efficiency and attributable revenue impact.',
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What channels does your performance marketing service cover?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We manage integrated programs across SEO, PPC, social platforms, remarketing, email automation, and analytics to support full-funnel growth.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do you measure marketing performance?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We set KPI frameworks, implement tracking, and report on acquisition, conversion, retention, and revenue metrics with clear attribution insights.',
            },
        },
    ],
};

export default function DigitalMarketing() {
    return (
        <>
            <SchemaMarkup data={serviceSchema} />
            <SchemaMarkup data={faqSchema} />
            <section className={styles.hero}>
                <div className="container">
                    <Link href="/expertise" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '2rem', display: 'inline-block' }}>← Return to Expertise</Link>
                    <h1 className={styles.title}>Digital & Performance Marketing</h1>
                    <p className={styles.subtitle}>
                        Unlock Your Digital Potential.
                    </p>
                </div>
            </section>

            <section className={`container ${styles.introSection}`}>
                <p className={styles.introText}>
                    In a hyper-connected market, performance is not just about impressions or clicks. It is about building a repeatable growth engine that converts attention into revenue. Radoss Agency designs integrated digital programs that connect audience insight, channel strategy, and analytics to produce measurable business outcomes.
                </p>
            </section>

            <div className={`container ${styles.detailList}`}>
                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>SEO & Content Strategy</h2>
                        <p className={styles.detailDesc}>Foundations of Visibility</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Be discoverable when intent is highest. We connect what your audience is searching for to the solutions your business provides.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Keyword Intelligence:</strong> Search intent mapping across core, long-tail, and local opportunities.</li>
                            <li className={styles.bulletItem}><strong>Technical SEO:</strong> Site speed, indexability, crawl health, and structured data optimization.</li>
                            <li className={styles.bulletItem}><strong>On-Page Optimization:</strong> Better information architecture, metadata, and content relevance.</li>
                            <li className={styles.bulletItem}><strong>Authority Content:</strong> Educational pages, case studies, and conversion-focused editorial assets.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>PPC & Paid Media</h2>
                        <p className={styles.detailDesc}>Amplify Reach with Precision</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Accelerate acquisition with structured campaigns across search, social, and display environments.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Campaign Architecture:</strong> Channel-specific plans, clear objectives, and budget allocation logic.</li>
                            <li className={styles.bulletItem}><strong>Audience Segmentation:</strong> Intent, behavior, and lifecycle-driven targeting models.</li>
                            <li className={styles.bulletItem}><strong>Creative Testing:</strong> Message, visual, and offer experiments to improve conversion efficiency.</li>
                            <li className={styles.bulletItem}><strong>Bid & Budget Optimization:</strong> Continuous adjustments to maximize return on ad spend.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Social Media Marketing</h2>
                        <p className={styles.detailDesc}>Build Community and Demand</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Turn social presence into strategic leverage through consistent storytelling and performance-led distribution.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Platform Strategy:</strong> Tailored plans for LinkedIn, Instagram, Facebook, TikTok, and X.</li>
                            <li className={styles.bulletItem}><strong>Content Systems:</strong> Scalable content calendars and creative production workflows.</li>
                            <li className={styles.bulletItem}><strong>Community Management:</strong> Active engagement that improves trust and conversion intent.</li>
                            <li className={styles.bulletItem}><strong>Paid Social Integration:</strong> Organic and paid loops coordinated for stronger campaign performance.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Email & Lifecycle Automation</h2>
                        <p className={styles.detailDesc}>Nurture, Convert, Retain</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Lifecycle Design:</strong> Welcome, nurture, conversion, and win-back sequences.</li>
                            <li className={styles.bulletItem}><strong>Segmentation Frameworks:</strong> Personalized communications by behavior and value tiers.</li>
                            <li className={styles.bulletItem}><strong>Automation Implementation:</strong> Workflow orchestration across CRM and marketing tools.</li>
                            <li className={styles.bulletItem}><strong>Optimization:</strong> Subject line, timing, and CTA testing for stronger engagement and revenue.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Marketing Analytics & Reporting</h2>
                        <p className={styles.detailDesc}>Measure What Matters</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>KPI Architecture:</strong> Metrics aligned to pipeline, revenue, and business priorities.</li>
                            <li className={styles.bulletItem}><strong>Tracking Integrity:</strong> Robust setup across GA4, pixels, events, and conversion APIs.</li>
                            <li className={styles.bulletItem}><strong>Executive Dashboards:</strong> Clear visibility into performance by channel and funnel stage.</li>
                            <li className={styles.bulletItem}><strong>Insight-Led Action:</strong> Regular reviews that convert data into practical next moves.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="container" style={{ paddingBottom: '100px' }}>
                <SolutionCTA
                    title="Drive Measurable Growth"
                    description="Every campaign should contribute to business momentum. We build performance programs that scale with clarity and control."
                />
            </section>
        </>
    );
}
