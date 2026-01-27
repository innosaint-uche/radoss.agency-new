import Link from 'next/link';
import styles from '../detail.module.css';

export default function BrandMarketing() {
    return (
        <>
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
                    In a world saturated with messages, a strong brand and strategic traditional marketing are vital for cutting through the noise and forging genuine connections. At Radoss Agency, we specialize in building memorable brand identities and deploying effective traditional marketing strategies.
                </p>
            </section>

            <div className={`container ${styles.detailList}`}>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>Brand Strategy & Identity</h2>
                        <p className={styles.detailDesc}>Defining Your Unique Voice</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1rem' }}>Your brand is more than a logo; it&apos;s your promise to the world. We work with you to unearth your core values.</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Brand Positioning:</strong> Identifying unique market space.</li>
                            <li className={styles.bulletItem}><strong>Visual Identity:</strong> Logo, color palette, typography.</li>
                            <li className={styles.bulletItem}><strong>Brand Voice:</strong> Establishing how you speak.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>ATL Advertising</h2>
                        <p className={styles.detailDesc}>Broad Reach for Maximum Impact</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Media Planning & Buying:</strong> Securing best slots.</li>
                            <li className={styles.bulletItem}><strong>Creative Production:</strong> TVC, Radio, Print.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.detailItem}>
                    <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>BTL Activations</h2>
                        <p className={styles.detailDesc}>Engaging Experiences</p>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Event Management:</strong> Memorable events.</li>
                            <li className={styles.bulletItem}><strong>Activations:</strong> Street teams, in-store.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}
