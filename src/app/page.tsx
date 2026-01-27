"use client";
import Link from 'next/link';
import styles from './page.module.css';
import { Reveal } from '../components/Reveal';
import FlowerOfLife from '../components/FlowerOfLife';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Reveal>
            <span className={styles.eyebrow}>Radoss Agency</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.title}>
              Connecting Dots<span className="text-punctuation">.</span>
              <br />
              Crafting Growth<span className="text-punctuation">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.subtitle}>
              A premium digital agency specializing in performance marketing, 
              digital transformation, and custom software solutions.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className={styles.ctas}>
              <Link href="/contact" className={styles.primaryCta}>
                Start a Project
              </Link>
              <Link href="/work" className={styles.secondaryCta}>
                View Our Work
              </Link>
            </div>
          </Reveal>
        </div>
        <div className={styles.heroVisual}>
          <FlowerOfLife />
        </div>
      </section>
      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <h2 className={styles.sectionTitle}>What We Do</h2>
          </Reveal>
          <div className={styles.serviceGrid}>
            <Reveal delay={0.1}>
              <motion.div className={styles.serviceCard} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <h3>Performance Marketing</h3>
                <p>Data-driven campaigns that deliver measurable ROI across paid media channels.</p>
              </motion.div>
            </Reveal>
            <Reveal delay={0.2}>
              <motion.div className={styles.serviceCard} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <h3>Digital Transformation</h3>
                <p>End-to-end digital solutions that modernize your business operations.</p>
              </motion.div>
            </Reveal>
            <Reveal delay={0.3}>
              <motion.div className={styles.serviceCard} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <h3>Brand Strategy</h3>
                <p>Compelling brand narratives that resonate with your target audience.</p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className={styles.solutions}>
        <div className="container">
          <Reveal>
            <h2 className={styles.sectionTitle}>Our Solutions</h2>
          </Reveal>
          <div className={styles.solutionGrid}>
            <Reveal delay={0.1}>
              <Link href="/solutions/radoss-digital" className={styles.solutionCard}>
                <h3>Radoss Digital</h3>
                <p>Full-service performance marketing agency</p>
              </Link>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/solutions/meta-ads-payment" className={styles.solutionCard}>
                <h3>Pay Meta in Naira</h3>
                <p>Facebook and Instagram ads payment solution</p>
              </Link>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/solutions/wabar-whatsapp-api" className={styles.solutionCard}>
                <h3>WABAR API</h3>
                <p>WhatsApp Business API integration</p>
              </Link>
            </Reveal>
            <Reveal delay={0.4}>
              <Link href="/solutions/digital-maturity-assessment" className={styles.solutionCard}>
                <h3>Digital Maturity Tool</h3>
                <p>Assess your digital readiness</p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal>
            <h2>Ready to Transform Your Business?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Let us discuss how we can help you achieve your goals.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.primaryCta}>
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
