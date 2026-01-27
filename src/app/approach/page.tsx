"use client";
import styles from './page.module.css';
import InteractiveBackground from '@/components/InteractiveBackground';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';

const approaches = [
    {
        title: "Holistic Journey Mapping",
        desc: "We go beyond isolated channels to analyze the entire consumer journey. By identifying key touchpoints and opportunities, we create strategies that are cohesive, relevant, and effective at every stage.",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" // Check circle
    },
    {
        title: "Integrated Service Delivery",
        desc: "As a full-service agency, we offer a seamless, one-stop solution. From digital campaigns and tech integration to traditional media, we provide unified expertise under one roof, eliminating silos.",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" // Briefcase/Kit
    },
    {
        title: "Business + Marketing + Tech Synergy",
        desc: "Our core philosophy aligns your business objectives, marketing initiatives, and technology stack. We ensure they work in concert to amplify impact and drive sustainable growth, rather than competing for resources.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z" // Lightning
    }
];

export default function Approach() {
    return (
        <main className={styles.main}>
            {/* Reusing InteractiveBackground for consistency, or we could customize it */}
            <InteractiveBackground />

            <header className={styles.header}>
                <div className="container">
                    <Reveal>
                        <span className={styles.eyebrow}>Our Methodology</span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className={styles.title}>
                            Connecting<br />the Dots<span className="text-punctuation">.</span>
                        </h1>
                    </Reveal>
                </div>
            </header>

            <Section className={styles.introSection}>
                <div className={styles.introGrid}>
                    <Reveal>
                        <h2 className={styles.sectionTitle}>Comprehensive Results.</h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className={styles.text}>
                            We don&apos;t just tick boxes. We examine the entire ecosystem of your business to find connections others miss.
                        </p>
                    </Reveal>
                </div>
            </Section>

            <Section className={styles.approachSection}>
                <div className={styles.grid}>
                    {approaches.map((item, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div className={styles.card}>
                                <div className={styles.iconBox}>
                                    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>
        </main>
    );
}
