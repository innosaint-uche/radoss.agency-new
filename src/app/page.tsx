"use client";
import Link from 'next/link';
import styles from './page.module.css';
import { Reveal } from '../components/Reveal';
import FlowerOfLife from '../components/FlowerOfLife';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      {/* SECTION: HERO */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <Reveal>
                <h4 className={styles.kicker}>Radoss Agency</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className={styles.title}>
                  The Nexus of Business, Marketing & Technology<span className="text-punctuation">.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className={styles.subtitle}>
                  We are strategic growth partners. We craft holistic strategies that integrate business goals, marketing execution, and technology solutions to unlock growth potential for ambitious brands.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className={styles.actions}>
                  <Link href="/expertise" className="btn btn-primary">
                    Our Expertise
                  </Link>
                  <Link href="/contact" className="btn btn-secondary">
                    Start Project
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className={styles.heroVisual}>
              <FlowerOfLife />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: INTRO METRICS (Bento Row) */}
      <section className={styles.introSection}>
        <div className="container">
          <div className={styles.metricsGrid}>
            <Reveal width="100%">
              <div className={styles.metricCard}>
                <h3>Strategy</h3>
                <p>Bridging the gap between insight and execution.</p>
              </div>
            </Reveal>
            <Reveal width="100%" delay={0.1}>
              <div className={styles.metricCard}>
                <h3>Marketing</h3>
                <p>Data-driven performance campaigns.</p>
              </div>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <div className={styles.metricCard}>
                <h3>Technology</h3>
                <p>Digital transformation and Martech integration.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION: CAPABILITIES (Bento Grid) */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2>Integrated Capabilities</h2>
              <Link href="/expertise">View All Services &rarr;</Link>
            </div>
          </Reveal>

          <div className={styles.bentoGrid}>
            {/* Large Card: Digital */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/expertise/digital-performance-marketing" className={styles.bentoCardLarge}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNum}>01</span>
                    <h3>Digital Performance</h3>
                  </div>
                  <p>SEO, PPC, Social, and Analytics. Precision targeting for measurable ROI.</p>
                </div>
                <div className={styles.cardArrow}>&rarr;</div>
              </Link>
            </motion.div>

            {/* Medium Card: Transformation */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/expertise/business-digital-transformation" className={`${styles.bentoCard} ${styles.blueCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>02</span>
                  <h3>Transformation</h3>
                </div>
                <p>Process Optimization & MarTech.</p>
              </Link>
            </motion.div>

            {/* Medium Card: Brand */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/expertise/brand-traditional-marketing" className={`${styles.bentoCard} ${styles.goldCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>03</span>
                  <h3>Brand Strategy</h3>
                </div>
                <p>Identity, ATL, and PR.</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal width="100%">
            <div className={styles.ctaBox}>
              <h2>Ready to Connect the Dots?</h2>
              <p>Discuss how Radoss Agency can elevate your brand.</p>
              <Link href="/contact" className="btn btn-primary">
                Start the Conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
