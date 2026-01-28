import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../detail.module.css';
import { SolutionCTA } from '../../../components/SolutionCTA';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata: Metadata = {
    title: "Business & Digital Transformation | Radoss Agency",
    description: "Future-proof your operations. We partner with leaders to align marketing, sales, and technology for sustainable digital growth.",
    keywords: ["digital transformation", "business strategy consulting", "martech stack audit", "sales alignment", "change management"],
};

export default function BusinessTransformation() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Business & Digital Transformation",
        "provider": {
            "@type": "Organization",
            "name": "Radoss Agency"
        },
        "description": "Strategic business alignment and digital modernization services."
    };

    return (
        <>
            <SchemaMarkup data={schemaData} />
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
                    In a rapidly evolving business landscape, transformation isn&apos;t a one-time project—it&apos;s a continuous journey. Radoss Agency partners with you to navigate this complexity, connecting your core business strategy with the power of digital technologies and optimized processes.
                </p>
            </section>

            <div className={`container ${styles.detailList}`}>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Marketing & Sales Alignment</h2>
                        <p className={styles.detailDesc}>Unifying for Impact</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Break down silos, amplify results. True business growth happens when marketing and sales work in perfect harmony.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Unified Goals:</strong> Aligning KPIs.</li>
                            <li className={styles.bulletItem}><strong>Lead Handoff Processes:</strong> Seamless transitions.</li>
                            <li className={styles.bulletItem}><strong>Feedback Loops:</strong> Continuous improvement.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Process Optimization (MarTech)</h2>
                        <p className={styles.detailDesc}>Streamline & Scale</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Audit & Strategy:</strong> Evaluating current stack.</li>
                            <li className={styles.bulletItem}><strong>Automation:</strong> Reducing manual tasks.</li>
                            <li className={styles.bulletItem}><strong>Tool Selection:</strong> Choosing the right software.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Change Management Support</h2>
                        <p className={styles.detailDesc}>Navigating Transformation</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Stakeholder Management:</strong> Getting buy-in.</li>
                            <li className={styles.bulletItem}><strong>Communication Plans:</strong> Keeping everyone informed.</li>
                        </ul>
                    </div>
                </div>

            </div>

            <section className="container" style={{ paddingBottom: '100px' }}>
                <SolutionCTA
                    title="Engineer Your Evolution"
                    description="Don't just adapt to the digital age—lead it. Partner with us to modernize your operations and unlock new growth channels."
                />
            </section>
        </>
    );
}
