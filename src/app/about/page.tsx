"use client";
import styles from './page.module.css';
import InteractiveBackground from '@/components/InteractiveBackground';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';

import SchemaMarkup from '@/components/SchemaMarkup';

export default function About() {
    return (
        <main className={styles.main}>
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About Radoss Agency",
                "description": "Radoss Agency connects business, marketing, and technology to drive growth.",
                "url": "https://radoss.agency/about"
            }} />
            <InteractiveBackground />

            <header className={styles.header}>
                <div className="container">
                    <Reveal>
                        <span className={styles.eyebrow}>About Radoss Agency</span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className={styles.title}>
                            More Than Marketers<span className="text-punctuation">.</span><br />We Connect the Dots<span className="text-punctuation">.</span>
                        </h1>
                    </Reveal>
                </div>
            </header>

            <Section className={styles.genesisSection}>
                <div className={styles.grid2}>
                    <div>
                        <Reveal>
                            <h2 className={styles.sectionTitle}>The Drive to Connect.</h2>
                        </Reveal>
                    </div>
                    <div>
                        <Reveal delay={0.2}>
                            <p className={styles.text}>
                                Radoss Agency was conceived from a clear observation: the modern business landscape is a constellation of opportunities, yet many brands struggle to connect these points of light.
                            </p>
                            <p className={styles.text}>
                                Brilliant strategies often falter due to disconnected marketing efforts, siloed technological implementation, or a misalignment with core business objectives. We saw the immense potential lost in these gaps.
                            </p>
                            <p className={styles.text}>
                                Our founding was driven by a singular passion: to be the force that <strong>connects these vital dots</strong>. We are here to illuminate the path, transforming complexity into clarity and ambition into achievement.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </Section>

            <Section className={styles.missionVisionSection}>
                <div className={styles.grid2}>
                    <div className={styles.card}>
                        <Reveal>
                            <span className={styles.cardLabel}>Mission</span>
                            <h3 className={styles.cardHeading}>Guiding Your Ascent</h3>
                            <p className={styles.cardText}>
                                &quot;To empower businesses through innovative, integrated marketing solutions that drive measurable growth, foster meaningful connections, and consistently exceed expectations.&quot;
                            </p>
                        </Reveal>
                    </div>
                    <div className={styles.card}>
                        <Reveal delay={0.2}>
                            <span className={styles.cardLabel}>Vision</span>
                            <h3 className={styles.cardHeading}>Shaping the Future</h3>
                            <p className={styles.cardText}>
                                We envision a landscape where technology seamlessly amplifies marketing strategy. Radoss Agency strives to be the premier partner, guiding businesses to not only navigate the present but to confidently shape their future.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </Section>

            <Section className={styles.valuesSection}>
                <div className="container" style={{ maxWidth: '100%' }}>
                    <Reveal>
                        <h2 className={styles.valuesTitle}>The Radoss DNA</h2>
                    </Reveal>
                    <div className={styles.valuesGrid}>
                        {[
                            { title: "Holistic Perspective", desc: "We connect all the dots, ensuring every action serves the bigger picture." },
                            { title: "Strategic Partnership", desc: "Your goals are our goals. We integrate with your team for shared success." },
                            { title: "Data-Driven Decisions", desc: "Insights fuel our strategies, ensuring precision and impact." },
                            { title: "Relentless Innovation", desc: "We embrace change, constantly seeking better ways to deliver results." },
                            { title: "Unwavering Integrity", desc: "Transparency and trust are the foundations of all our relationships." }
                        ].map((value, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className={styles.valueItem}>
                                    <div className={styles.dot}></div>
                                    <h4>{value.title}</h4>
                                    <p>{value.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    );
}
