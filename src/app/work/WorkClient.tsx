"use client";
import Image from 'next/image';
import styles from './page.module.css';
import InteractiveBackground from '../../components/InteractiveBackground';
import { motion, AnimatePresence } from '@/lib/motion';
import { Reveal } from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useState } from 'react';

interface Project {
    id: string;
    client: string;
    title: string;
    challenge: string;
    solution: string;
    metrics: string[];
    logo: string;
    category: string;
}

const projects: Project[] = [
    {
        id: 'zenith',
        client: 'Zenith Bank',
        title: 'Performance Campaign',
        category: 'Customer Acquisition',
        challenge: 'Zenith Bank aimed to acquire a minimum of 2,000 new customer accounts via their Beta Life Promo. This required a robust and scalable customer acquisition strategy capable of reaching and converting a wide audience efficiently.',
        solution: 'Our team successfully generated significant social media buzz and drove direct sales through meticulously planned promo campaigns. This strategic execution resulted in a remarkably low cost per new account opening for Zenith Bank, averaging 750 naira, showcasing excellent ROI and campaign effectiveness.',
        metrics: [
            "Target: Minimum 2,000 new customer accounts",
            "Result: Average 750 naira per new account opening"
        ],
        logo: 'https://beyondlimits.global/zenithbankpitchcompetition/wp-content/uploads/2024/11/zenith.png',
    },
    {
        id: 'eatalia',
        client: 'Eatalia Limited',
        title: 'Digital Process Optimization',
        category: 'Digital Transformation',
        challenge: 'Eatalia faced the multifaceted challenge of needing a new, functional website, improving significant operational inefficiencies across their services, creating a reliable online ordering and delivery infrastructure from scratch, and establishing a compelling digital presence to effectively engage with their target customers.',
        solution: 'Radoss Agency delivered a full-featured website for Eatalia and implemented integrated Point of Sale (POS), inventory, and stock management systems. This foundational work streamlined the entire order flow, drastically reduced manual errors, and enabled real-time operational tracking. Furthermore, we developed a seamless online ordering portal, which significantly improved customer convenience and accessibility.',
        metrics: [
            "Drastically reduced manual errors",
            "Increased digital footfall"
        ],
        logo: 'https://res.cloudinary.com/innosaint/image/upload/v1745856555/Vertical_logo_jynkx8.png',
    },
    {
        id: 'miva',
        client: 'Miva University',
        title: 'Integrated ATL Campaign',
        category: 'Integrated Campaign',
        challenge: 'Miva University\'s primary objective was to attract and enroll new students for their early enrolment window ahead of the new academic year starting in May. A key component of this was the need for a strategic offline Out-Of-Home (OOH) advertising campaign that could effectively complement and amplify their ongoing digital marketing efforts.',
        solution: 'Our team recommended and executed a targeted BRT (Bus Rapid Transit) Branding campaign, strategically selecting routes that aligned with the university\'s target student demographics. This initiative not only significantly increased brand visibility in key areas but also resulted in a lower overall cost for the OOH campaign component.',
        metrics: [
            "Significantly increased brand visibility",
            "Successfully achieved enrolment targets",
            "Lower overall cost for OOH component"
        ],
        logo: 'https://miva-university.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/02/12140233/Miva-mobile-logo-dark-4x-1.png',
    },
    {
        id: 'indomie',
        client: 'Tolaram Group (Indomie Nigeria)',
        title: 'Always-On Meta Campaign Support',
        category: 'Meta Optimization',
        challenge: 'Tolaram aimed to maintain continuous visibility and engagement for the Indomie brand on Meta platforms through a sustained campaign push. However, recurring bottlenecks with payment processing on the platform threatened to disrupt campaign consistency and overall performance.',
        solution: 'By directly funding their Meta ad account, we eliminated payment-related delays and ensured the uninterrupted delivery of their digital campaigns. This support enabled the Indomie team to stay on schedule with their media plan.',
        metrics: [
            "Eliminated payment-related delays",
            "Ensured uninterrupted delivery of digital campaigns"
        ],
        logo: 'https://cdn.worldvectorlogo.com/logos/indomie-1.svg',
    },
    {
        id: 'healthtracka',
        client: 'Healthtracka',
        title: 'Social Conversion & SEM',
        category: 'Performance Marketing',
        challenge: 'Healthtracka aimed to increase conversions from their underperforming social media channels (Facebook, Instagram, Twitter). Additionally, they sought to establish a strong presence through Search Engine Marketing (SEM), Display, and Programmatic Advertising to drive qualified leads and customer acquisition.',
        solution: 'Radoss implemented highly targeted advertising campaigns on Meta (Facebook, Instagram) and Twitter, focusing on delivering the right message to the optimal audience segments. We crafted compelling brand messaging designed to resonate deeply with customers.',
        metrics: [
            "Increased brand affinity and recall",
            "Effectively converted audience interest into paying customers"
        ],
        logo: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="80" viewBox="0 0 150 80"><rect width="150" height="80" fill="%23111827" rx="8"/><text x="75" y="42" text-anchor="middle" dominant-baseline="middle" fill="%23FFD903" font-size="13" font-weight="700" font-family="Inter,sans-serif">Healthtracka</text></svg>',
    },
    {
        id: 'bracken',
        client: 'Bracken (Ad-Tech Agency)',
        title: 'Paid Media Execution',
        category: 'Ad-Tech Support',
        challenge: 'Bracken subcontracted Radoss for the implementation of social media advertising campaigns for several of their key clients, such as Palmpay. The primary goal was to significantly enhance brand awareness and drive user engagement for these end-clients through strategic paid media.',
        solution: 'Our team effectively utilized a range of digital channels to execute data-driven paid media marketing campaigns. These efforts successfully built brand awareness, attracted new users, and expanded the target customer base.',
        metrics: [
            "Significantly enhanced brand awareness",
            "Driven user engagement for subcontracted clients"
        ],
        logo: 'https://brackenads.com/wp-content/uploads/2024/05/output-onlinepngtools-1.png',
    },
    {
        id: 'hippoads',
        client: 'HippoAds',
        title: 'Social Media Ad Implementation',
        category: 'Campaign Management',
        challenge: 'HippoAds subcontracted Radoss to manage and implement social media advertising campaigns for their diverse clientele. The core task was to effectively execute these campaigns across various social platforms to achieve client-specific marketing objectives.',
        solution: 'We successfully rolled out and managed advertising campaigns across a wide array of Facebook and Instagram placements. This included Facebook Mobile, Facebook feed, Facebook Stories, the Facebook Audience Network, Instagram feed, and Instagram Stories.',
        metrics: [
            "Comprehensive coverage across Facebook and Instagram placements",
            "Optimized for engagement and reach"
        ],
        logo: 'https://media.licdn.com/dms/image/v2/C560BAQElqBgZ0XSXuA/company-logo_200_200/company-logo_200_200/0/1640168693330?e=2147483647&v=beta&t=joGpE0BCxNUrZbMzdjw0I3PTdx-p1Qq2YaJRx8XyVKg',
    }
];

export default function Work() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const caseStudySchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Radoss Agency Case Studies",
        "itemListElement": projects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": `${project.client} - ${project.title}`,
            "description": project.solution
        }))
    };

    return (
        <>
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Radoss Agency Work",
                "description": "Case studies and success stories from Radoss Agency.",
                "url": "https://radoss.agency/work"
            }} />
            <SchemaMarkup data={caseStudySchema} />
            <InteractiveBackground />

            <div className={styles.main}>
                <header className={styles.header}>
                    <div className="container">
                        <Reveal>
                            <span className={styles.eyebrow}>Selected Works</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h1 className={styles.title}>
                                Impact in<br />Motion<span className="text-punctuation">.</span>
                            </h1>
                            <p style={{ maxWidth: '760px', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                                These case studies show how integrated strategy, media execution, and technology enablement can produce practical and measurable business results.
                            </p>
                        </Reveal>
                    </div>
                </header>

                <section className="container">
                    <div className={styles.galleryGrid}>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={styles.projectCard}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedProject(project)}
                                layoutId={`card-${project.id}`}
                            >
                                <div className={styles.cardVisual}>
                                    {/* Logo Container */}
                                    <motion.div className={styles.logoContainer} layoutId={`logo-${project.id}`}>
                                        <Image
                                            src={project.logo}
                                            alt={project.client}
                                            width={150}
                                            height={80}
                                            style={{ objectFit: 'contain', maxWidth: '80%', maxHeight: '60%' }}
                                        />
                                    </motion.div>
                                    <div className={styles.overlay}>
                                        <span className={styles.viewProject}>View Case Study</span>
                                    </div>
                                </div>

                                <div className={styles.cardMeta}>
                                    <span className={styles.category}>{project.category}</span>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDesc}>{project.client}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className="container">
                        <Reveal width="100%">
                            <div className={styles.ctaBox}>
                                <h2>Ready to start your next project?</h2>
                                <p>Let&apos;s build something extraordinary together.</p>
                                <a href="/contact" className="btn btn-secondary">
                                    Start Project
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        <motion.div
                            className={styles.modalBackdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        />
                        <motion.div
                            className={styles.modalContent}
                            layoutId={`card-${selectedProject.id}`}
                        >
                            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>×</button>

                            <div className={styles.modalHeader}>
                                <motion.div className={styles.modalLogoContainer} layoutId={`logo-${selectedProject.id}`}>
                                    <Image
                                        src={selectedProject.logo}
                                        alt={selectedProject.client}
                                        width={120}
                                        height={60}
                                        style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </motion.div>
                                <div>
                                    <span className={styles.modalCategory}>{selectedProject.category}</span>
                                    <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                                    <p className={styles.modalClient}>{selectedProject.client}</p>
                                </div>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.modalSection}>
                                    <h3>The Challenge</h3>
                                    <p>{selectedProject.challenge}</p>
                                </div>
                                <div className={styles.modalSection}>
                                    <h3>Our Impact & Achievement</h3>
                                    <p>{selectedProject.solution}</p>
                                </div>

                                {selectedProject.metrics.length > 0 && (
                                    <div className={styles.modalMetrics}>
                                        {selectedProject.metrics.map((metric, i) => (
                                            <div key={i} className={styles.metricItem}>
                                                • {metric}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
