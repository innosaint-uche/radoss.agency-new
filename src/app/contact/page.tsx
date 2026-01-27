import styles from './page.module.css';

import SchemaMarkup from '@/components/SchemaMarkup';

export default function Contact() {
    return (
        <>
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact Radoss Agency",
                "description": "Get in touch with Radoss Agency for premium digital consultancy.",
                "url": "https://radoss.agency/contact"
            }} />
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Ready to Connect the Dots?</h1>
                    <p className={styles.subtitle}>
                        Our integrated approach ensures all aspects of your business, marketing, and technology work together seamlessly. Let&apos;s discuss how we can tailor a holistic strategy for your unique goals.
                    </p>
                </div>
            </section>

            <section className={`container ${styles.grid}`}>
                <div className={styles.infoItem}>
                    <h3>Start the Conversation</h3>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                        We&apos;re eager to learn about your challenges and explore how Radoss Agency&apos;s integrated expertise can drive your business forward. Reach out to us using the details below, or send us a message, and let&apos;s begin connecting the dots for your success.
                    </p>

                    <div style={{ marginTop: '3rem' }}>
                        <div className={styles.infoItem}>
                            <h3>Email</h3>
                            <a href="mailto:hello@radoss.agency" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>hello@radoss.agency</a>
                        </div>
                        <div className={styles.infoItem}>
                            <h3>Phone</h3>
                            <a href="tel:+2347033827657" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>+234 703 382 7657</a>
                        </div>
                        <div className={styles.infoItem}>
                            <h3>Location</h3>
                            <p style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Lagos, Nigeria (HQ)</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formCard}>
                    {/* Standard Contact Form Structure */}
                    <form>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Name</label>
                            <input type="text" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input type="email" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Message</label>
                            <textarea className={styles.textarea}></textarea>
                        </div>
                        <button type="button" className={styles.submitButton}>Send Message</button>
                    </form>
                </div>
            </section>
        </>
    );
}
