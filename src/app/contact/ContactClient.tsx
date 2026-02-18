"use client";
import { useState } from 'react';

import styles from './page.module.css';

import SchemaMarkup from '../../components/SchemaMarkup';

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact Radoss Agency",
                "description": "Get in touch with Radoss Agency to discuss integrated business, marketing, and digital transformation goals.",
                "url": "https://radoss.agency/contact",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Radoss Agency",
                    "contactPoint": [
                        {
                            "@type": "ContactPoint",
                            "telephone": "+2347033827657",
                            "contactType": "sales",
                            "email": "hello@radoss.agency",
                            "areaServed": "NG"
                        }
                    ]
                }
            }} />
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What type of businesses does Radoss Agency work with?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Radoss Agency works with growth-focused startups, SMEs, and enterprise teams across sectors that need aligned strategy, marketing execution, and technology support."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can we engage Radoss for one service area only?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. You can engage Radoss for a specific need such as performance marketing, transformation advisory, or brand and traditional campaign support."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How soon can we start?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "After an initial discovery conversation, we define scope, priorities, and timelines, then move into a phased execution plan."
                        }
                    }
                ]
            }} />
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Ready to Connect the Dots?</h1>
                    <p className={styles.subtitle}>
                        Tell us where you are today and where you need to be next. We&apos;ll help you align strategy, marketing execution, and technology priorities into one growth-focused plan.
                    </p>
                </div>
            </section>

            <section className={`container ${styles.grid}`}>
                <div className={styles.infoItem}>
                    <h3>Start the Conversation</h3>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                        We&apos;re ready to understand your growth goals, operational bottlenecks, and market opportunities. Share context, and our team will recommend a practical path forward with clear priorities and expected outcomes.
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
                        <div className={styles.infoItem}>
                            <h3>Engagement Focus</h3>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                                Business & digital transformation, performance marketing, MarTech optimization, and integrated brand execution.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us your goals, current challenges, and timeline."
                                required
                            ></textarea>
                        </div>

                        {status === 'error' && (
                            <div style={{ color: 'red', marginBottom: '1rem' }}>
                                {errorMessage}
                            </div>
                        )}

                        {status === 'success' && (
                            <div style={{ color: 'green', marginBottom: '1rem' }}>
                                Message sent successfully! We will get back to you soon.
                            </div>
                        )}

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
