"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { Reveal } from '@/components/Reveal';
import FlowerOfLife from '@/components/FlowerOfLife';
import { motion } from '@/lib/motion';
import SchemaMarkup from '@/components/SchemaMarkup';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Radoss Agency",
  "url": "https://radoss.agency",
  "logo": "https://radoss.agency/favicon.png",
  "description": "Integrated growth agency connecting business strategy, marketing execution, and technology transformation.",
  "areaServed": ["Nigeria", "Global"],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+2347033827657",
      "contactType": "sales",
      "email": "hello@radoss.agency",
      "areaServed": "NG"
    }
  ]
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Radoss Agency Homepage",
  "url": "https://radoss.agency",
  "description": "Integrated business, marketing, and technology services that drive measurable growth.",
  "about": {
    "@type": "Thing",
    "name": "Business, marketing and digital transformation"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Radoss Agency do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Radoss Agency helps organizations align business strategy, marketing delivery, and technology implementation to improve acquisition, conversion, and operational performance."
      }
    },
    {
      "@type": "Question",
      "name": "Who is Radoss Agency best suited for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We typically support growth-focused companies, enterprise teams, and ambitious SMEs that need integrated support across digital marketing, transformation, and brand execution."
      }
    },
    {
      "@type": "Question",
      "name": "Does Radoss Agency support businesses in Nigeria only?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Radoss Agency is headquartered in Lagos, Nigeria and supports clients in Nigeria and other markets through in-country and remote delivery models."
      }
    }
  ]
};

const leadershipTeam = [
  {
    name: 'Uchenna Innocent',
    role: 'Chief Digital Architect & Founder',
    focus: 'Digital Transformation, Tech, Strategy',
    image: 'https://res.cloudinary.com/innosaint/image/upload/v1759535536/Uchenna-Innocent_headshot_nzenth.jpg',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/uchenna-innocent/' },
      { label: 'Website', href: 'https://uchennainnocent.com' }
    ]
  },
  {
    name: 'Timi Uk',
    role: 'Chief Operating Officer & Co-Founder',
    focus: 'Performance, Brand, Marketing',
    image: '/images/team/timi-uk-silhouette.svg',
    links: [
      { label: 'Profile', href: '/about' }
    ]
  },
  {
    name: 'Ebere Agbaje',
    role: 'Business Operations Lead',
    focus: 'Growth, Operations, Research',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHarcZat2nPZw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719027089306?e=2147483647&v=beta&t=qEoLB81CVNV6nJK594wiSEHdc8D2ROPySo4U4kI5rg4',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ebere-peace-agbaje/' }
    ]
  }
];

export default function Home() {
  return (
    <>
      <SchemaMarkup data={organizationSchema} />
      <SchemaMarkup data={webPageSchema} />
      <SchemaMarkup data={faqSchema} />

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
                  Radoss Agency is a strategic growth partner for organizations that need clearer alignment between business goals, marketing execution, and digital capability. We design integrated systems that improve revenue outcomes, brand performance, and operational efficiency.
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
                <h3>Business Strategy</h3>
                <p>Turning boardroom goals into practical growth plans and measurable delivery pathways.</p>
              </div>
            </Reveal>
            <Reveal width="100%" delay={0.1}>
              <div className={styles.metricCard}>
                <h3>Marketing Execution</h3>
                <p>Full-funnel campaigns across digital and traditional channels with clear performance accountability.</p>
              </div>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <div className={styles.metricCard}>
                <h3>Technology Enablement</h3>
                <p>MarTech integration, automation, and data infrastructure that support scale and decision quality.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION: CAPABILITIES (Bento Grid) */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <Reveal width="100%">
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
                  <p>SEO, paid media, social strategy, lifecycle automation, and analytics built for consistent, attributable growth.</p>
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
                <p>Operating model design, process optimization, MarTech modernization, and change adoption support.</p>
              </Link>
            </motion.div>

            {/* Medium Card: Brand */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/expertise/brand-traditional-marketing" className={`${styles.bentoCard} ${styles.goldCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>03</span>
                  <h3>Brand Strategy</h3>
                </div>
                <p>Brand positioning, identity systems, ATL and BTL campaign planning, and reputation support.</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: SOLUTIONS & SERVICES */}
      <section className={styles.solutionsSection}>
        <div className="container">
          <Reveal width="100%">
            <div className={styles.sectionHeader}>
              <h2>Radoss<span className="text-punctuation">.</span> Solutions & Services</h2>
              <Link href="/solutions">Explore All &rarr;</Link>
            </div>
          </Reveal>

          <div className={styles.bentoGrid}>
            {/* Performance Marketing */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/solutions/radoss-digital" className={styles.bentoCardLarge}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNum}>01</span>
                    <h3>Performance Marketing</h3>
                  </div>
                  <p>High-ROI acquisition and conversion programs powered by data modeling, creative testing, and channel optimization.</p>
                </div>
                <div className={styles.cardArrow}>&rarr;</div>
              </Link>
            </motion.div>

            {/* Pay Meta in Naira */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/solutions/meta-ads-payment" className={`${styles.bentoCard} ${styles.blueCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>02</span>
                  <h3>Pay Meta in Naira</h3>
                </div>
                <p>Reliable local-currency ad funding with compliant support for uninterrupted Facebook and Instagram delivery.</p>
              </Link>
            </motion.div>

            {/* WABAR API */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/solutions/wabar-whatsapp-api" className={`${styles.bentoCard} ${styles.goldCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>03</span>
                  <h3>WABAR API</h3>
                </div>
                <p>Enterprise-grade WhatsApp automation for sales, customer support, and retention workflows.</p>
              </Link>
            </motion.div>

            {/* Digital Maturity */}
            <motion.div whileHover={{ scale: 1.01 }} className={styles.cardWrapper}>
              <Link href="/solutions/digital-maturity-assessment" className={`${styles.bentoCard} ${styles.sandCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>04</span>
                  <h3>Digital Maturity</h3>
                </div>
                <p>Assess your digital readiness across strategy, customer experience, operations, and technology.</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className="container">
          <Reveal width="100%">
            <div className={styles.teamSectionHeader}>
              <h2>Leadership Team</h2>
              <Link href="/about">Meet The Team &rarr;</Link>
            </div>
          </Reveal>
          <Reveal delay={0.05} width="100%">
            <p className={styles.teamIntro}>
              Full leadership profiles live on the Agency page. This preview highlights the operators driving transformation, performance, and execution across Radoss engagements.
            </p>
          </Reveal>
          <div className={styles.teamGrid}>
            {leadershipTeam.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.1} width="100%">
                <article className={styles.teamCard}>
                  <div className={styles.teamImageWrap}>
                    <span className={styles.teamBadge}>L{index + 1}</span>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={360}
                      height={420}
                      priority={index === 0}
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className={styles.teamImage}
                    />
                  </div>
                  <div className={styles.teamMeta}>
                    <h3>{member.name}</h3>
                    <p className={styles.teamRole}>{member.role}</p>
                    <p>{member.focus}</p>
                    <div className={styles.teamLinks}>
                      {member.links.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal width="100%">
            <div className={styles.ctaBox}>
              <h2>Ready to Connect the Dots?</h2>
              <p>Discuss your business goals with a team that integrates strategy, marketing, and technology from day one.</p>
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
