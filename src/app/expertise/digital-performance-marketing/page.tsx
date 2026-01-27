import Link from 'next/link';
import styles from '../detail.module.css';

export default function DigitalMarketing() {
    return (
        <>
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
                    In today&apos;s hyper-connected world, a strong digital presence isn&apos;t just an option—it&apos;s essential for growth. At Radoss Agency, we specialize in crafting and executing bespoke Digital & Performance Marketing strategies that connect your business with its target audience, drive meaningful engagement, and deliver measurable results.
                </p>
            </section>

            <div className={`container ${styles.detailList}`}>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>SEO & Content Strategy</h2>
                        <p className={styles.detailDesc}>Foundations of Visibility</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Be found when it matters most. Our Search Engine Optimization (SEO) and Content Strategy services are designed to elevate your brand&apos;s visibility in search engine results, attracting qualified organic traffic that converts.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Comprehensive Keyword Research:</strong> Identifying high-value, relevant keywords.</li>
                            <li className={styles.bulletItem}><strong>Technical SEO Audits:</strong> Ensuring your website is mathematically sound.</li>
                            <li className={styles.bulletItem}><strong>On-Page Optimization:</strong> Optimizing titles, meta descriptions, and headers.</li>
                            <li className={styles.bulletItem}><strong>High-Quality Content Creation:</strong> Engaging blogs and articles.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>PPC & Paid Media</h2>
                        <p className={styles.detailDesc}>Amplify Your Reach Instantly</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Sometimes, organic reach isn&apos;t enough. Our PPC and Paid Media services put your brand directly in front of potential customers who are ready to engage.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Strategic Campaign Setup:</strong> Keyword selection and ad structuring.</li>
                            <li className={styles.bulletItem}><strong>Audience Targeting:</strong> Precision segmentation.</li>
                            <li className={styles.bulletItem}><strong>Ad Creative Development:</strong> Visually appealing ads.</li>
                            <li className={styles.bulletItem}><strong>Bid Management:</strong> Optimizing budgets for ROI.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Social Media Marketing</h2>
                        <p className={styles.detailDesc}>Build & Engage Your Community</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Social media is where conversations happen. We help you join and lead those conversations.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Platform-Specific Strategy:</strong> Tailored for Instagram, LinkedIn, TikTok.</li>
                            <li className={styles.bulletItem}><strong>Content Creation:</strong> Shareable visuals and stories.</li>
                            <li className={styles.bulletItem}><strong>Community Management:</strong> Active engagement.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}
