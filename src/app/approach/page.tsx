import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import InteractiveBackground from '../../components/InteractiveBackground';
import { Section } from '../../components/Section';
import { Reveal } from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'Our Approach | Integrated Growth Methodology',
    description: 'Discover the Radoss methodology for connecting business strategy, marketing execution, and technology systems into one growth engine.',
    keywords: [
        'integrated marketing approach',
        'business marketing technology synergy',
        'growth methodology',
        'digital transformation strategy',
    ],
    alternates: {
        canonical: 'https://radoss.agency/approach',
    },
    openGraph: {
        title: 'Our Approach | Radoss Agency',
        description: 'A practical methodology for aligning strategy, execution, and systems to deliver measurable outcomes.',
        url: 'https://radoss.agency/approach',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const approachSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Radoss Agency Approach',
    url: 'https://radoss.agency/approach',
    description: 'Integrated methodology for business strategy, marketing execution, and technology alignment.',
};

const approaches = [
    {
        title: 'Holistic Journey Mapping',
        desc: 'We map the complete customer and revenue journey, from demand creation to retention. This reveals hidden drop-off points, channel dependencies, and growth opportunities that isolated teams typically miss.',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        accent: 'blue',
    },
    {
        title: 'Integrated Service Delivery',
        desc: 'Our model unifies strategy, campaign operations, and technology implementation under one coordinated delivery plan. This removes handoff friction and protects execution quality across the lifecycle.',
        icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        accent: 'gold',
    },
    {
        title: 'Business + Marketing + Tech Synergy',
        desc: 'Every initiative is evaluated against business goals, market realities, and technology readiness. The result is faster decision-making, better resource utilization, and sustainable growth.',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        accent: 'sand',
    },
];

const accentClass = {
    blue: styles.cardBlue,
    gold: styles.cardGold,
    sand: styles.cardSand,
} as const;

export default function Approach() {
    return (
        <main className={styles.main}>
            <SchemaMarkup data={approachSchema} />
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
                        <h2 className={styles.sectionTitle}>Built for Measurable Outcomes.</h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className={styles.text}>
                            We design growth systems, not disconnected tactics. The Radoss approach links strategic intent to campaign execution and technology adoption, so each decision compounds business impact over time.
                        </p>
                    </Reveal>
                </div>
            </Section>

            <Section className={styles.approachSection}>
                <div className={styles.grid}>
                    {approaches.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.1} width="100%">
                            <div className={`${styles.card} ${accentClass[item.accent]}`}>
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

            <Section className={styles.frameworkSection}>
                <Reveal>
                    <div className={styles.frameworkCard}>
                        <span className={styles.frameworkLabel}>Strategic Framework</span>
                        <h2 className={styles.frameworkTitle}>M-C-I-A: Map, Connect, Implement, Analyse</h2>
                        <p className={styles.frameworkText}>
                            Explore our full M-C-I-A methodology in depth. This strategic flywheel explains how we
                            diagnose market reality, align customer relevance, execute with operational precision, and
                            compound learning through analytics and iteration.
                        </p>
                        <Link href="/approach/mcia-strategic-framework" className="btn btn-primary">
                            Explore M-C-I-A Framework
                        </Link>
                    </div>
                </Reveal>
            </Section>
        </main>
    );
}
