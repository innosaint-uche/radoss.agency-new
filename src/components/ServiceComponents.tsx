import React from 'react';
import { Reveal } from './Reveal';
import styles from './ServiceComponents.module.css';

interface HeroProps {
    title: string;
    subtitle: string;
    kicker: string;
    description: string;
}

export const ServiceHero = ({ title, subtitle, kicker, description }: HeroProps) => {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <Reveal>
                        <span className={styles.kicker}>{kicker}</span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className={styles.title}>
                            {title}
                            <span className="text-punctuation">.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h2 className={styles.subtitle}>{subtitle}</h2>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.description}>{description}</p>
                    </Reveal>
                </div>
            </div>
            <div className={styles.backgroundGlow} />
        </section>
    );
};

interface FeatureProps {
    features: {
        title: string;
        description: string;
        icon?: React.ReactNode;
    }[];
}

export const FeatureGrid = ({ features }: FeatureProps) => {
    return (
        <div className={styles.featureGrid}>
            {features.map((feature, index) => (
                <Reveal key={index} delay={index * 0.1}>
                    <div className={styles.featureCard}>
                        {feature.icon && <div className={styles.iconWrapper}>{feature.icon}</div>}
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>{feature.description}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    );
};
