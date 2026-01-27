import Link from 'next/link';
import styles from './page.module.css';

export default function Expertise() {
    return (
        <div className={styles.main}>

            <header className={styles.header}>
                <div className="container">
                    <span className={styles.eyebrow}>Our Capabilities</span>
                    <h1 className={styles.title}>
                        Holistic<br />Competence<span className="text-punctuation">.</span>
                    </h1>
                </div>
            </header>

            <div className="container">
                <div className={styles.bentoGrid}>

                    {/* Digital */}
                    <Link href="/expertise/digital-performance-marketing" className={styles.gridItem}>
                        <div className={styles.itemMeta}>
                            <span className={styles.number} style={{ color: 'var(--brand-gold)' }}>01</span>
                            <div className={styles.tagPill}>Performance</div>
                        </div>
                        <div className={styles.itemContent}>
                            <h2 className={styles.itemTitle}>Digital<br />Marketing</h2>
                            <p className={styles.itemDesc}>
                                SEO, PPC, Social, and Analytics. Precision targeting for measurable ROI.
                            </p>
                            <span className={styles.linkArrow}>Explore &rarr;</span>
                        </div>
                    </Link>

                    {/* Transformation */}
                    <Link href="/expertise/business-digital-transformation" className={styles.gridItem}>
                        <div className={styles.itemMeta}>
                            <span className={styles.number} style={{ color: 'var(--brand-blue)' }}>02</span>
                            <div className={styles.tagPill}>Operations</div>
                        </div>
                        <div className={styles.itemContent}>
                            <h2 className={styles.itemTitle}>Business<br />Transformation</h2>
                            <p className={styles.itemDesc}>
                                Process optimization, MarTech integration, and change management.
                            </p>
                            <span className={styles.linkArrow}>Explore &rarr;</span>
                        </div>
                    </Link>

                    {/* Brand */}
                    <Link href="/expertise/brand-traditional-marketing" className={styles.gridItem}>
                        <div className={styles.itemMeta}>
                            <span className={styles.number} style={{ color: 'var(--text-tertiary)' }}>03</span>
                            <div className={styles.tagPill}>Identity</div>
                        </div>
                        <div className={styles.itemContent}>
                            <h2 className={styles.itemTitle}>Brand &<br />Traditional</h2>
                            <p className={styles.itemDesc}>
                                Narrative building, ATL advertising, and PR strategy.
                            </p>
                            <span className={styles.linkArrow}>Explore &rarr;</span>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    );
}
