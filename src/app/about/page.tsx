import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';
import InteractiveBackground from '../../components/InteractiveBackground';
import { Section } from '../../components/Section';
import { Reveal } from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'About Radoss Agency | Integrated Growth Partner',
    description: 'Learn how Radoss Agency helps brands connect business strategy, marketing execution, and technology to drive measurable transformation and sustainable growth.',
    keywords: [
        'about radoss agency',
        'integrated marketing agency nigeria',
        'business and digital transformation partner',
        'growth strategy agency lagos',
    ],
    alternates: {
        canonical: 'https://radoss.agency/about',
    },
    openGraph: {
        title: 'About Radoss Agency | Integrated Growth Partner',
        description: 'More than marketers: strategic partners connecting business, marketing, and technology for lasting growth.',
        url: 'https://radoss.agency/about',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Radoss Agency',
    description: 'Radoss Agency connects business, marketing, and technology to drive measurable growth.',
    url: 'https://radoss.agency/about',
};

const aboutFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How is Radoss Agency different from a typical marketing agency?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Radoss goes beyond campaign execution by aligning business strategy, marketing systems, and technology infrastructure in one integrated model.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does Radoss Agency support transformation beyond marketing?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Our teams support process optimization, MarTech adoption, digital operating models, and change management alongside growth marketing.',
            },
        },
        {
            '@type': 'Question',
            name: 'Where is Radoss Agency based?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Radoss Agency is headquartered in Lagos, Nigeria and works with clients in Nigeria and international markets.',
            },
        },
    ],
};

const teamMembers = [
    {
        name: 'Uchenna Innocent',
        role: 'Chief Digital Architect & Founder',
        focus: 'Digital Transformation, Tech, Strategy',
        summary: 'Leads enterprise transformation mandates that align commercial strategy, customer experience, and marketing technology execution.',
        domains: ['Transformation Roadmaps', 'MarTech Architecture', 'Revenue Strategy'],
        image: 'https://res.cloudinary.com/innosaint/image/upload/v1759535536/Uchenna-Innocent_headshot_nzenth.jpg',
        links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/uchenna-innocent/' },
            { label: 'Website', href: 'https://uchennainnocent.com' },
        ],
    },
    {
        name: 'Timi Uk',
        role: 'Chief Operating Officer & Co-Founder',
        focus: 'Performance, Brand, Marketing',
        summary: 'Owns operating discipline across campaigns and delivery, ensuring strategy is translated into measurable execution at speed.',
        domains: ['Performance Systems', 'Brand Operations', 'Delivery Governance'],
        image: '/images/team/timi-uk-silhouette.svg',
        links: [],
    },
    {
        name: 'Ebere Agbaje',
        role: 'Business Operations Lead',
        focus: 'Growth, Operations, Research',
        summary: 'Drives business operations and research intelligence that improve planning quality, resource allocation, and client outcomes.',
        domains: ['Operational Planning', 'Market Research', 'Growth Analytics'],
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQHarcZat2nPZw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719027089306?e=2147483647&v=beta&t=qEoLB81CVNV6nJK594wiSEHdc8D2ROPySo4U4kI5rg4',
        links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ebere-peace-agbaje/' },
        ],
    },
];

const teamSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://radoss.agency/#organization',
            name: 'Radoss Agency',
            url: 'https://radoss.agency',
        },
        {
            '@type': 'Person',
            '@id': 'https://radoss.agency/#uchenna-innocent',
            name: 'Uchenna Innocent',
            jobTitle: 'Chief Digital Architect & Founder',
            worksFor: { '@id': 'https://radoss.agency/#organization' },
            sameAs: ['https://www.linkedin.com/in/uchenna-innocent/', 'https://uchennainnocent.com'],
        },
        {
            '@type': 'Person',
            '@id': 'https://radoss.agency/#timi-uk',
            name: 'Timi Uk',
            jobTitle: 'Chief Operating Officer & Co-Founder',
            worksFor: { '@id': 'https://radoss.agency/#organization' },
        },
        {
            '@type': 'Person',
            '@id': 'https://radoss.agency/#ebere-agbaje',
            name: 'Ebere Agbaje',
            jobTitle: 'Business Operations Lead',
            worksFor: { '@id': 'https://radoss.agency/#organization' },
            sameAs: ['https://www.linkedin.com/in/ebere-peace-agbaje/'],
        },
    ],
};

export default function About() {
    return (
        <main className={styles.main}>
            <SchemaMarkup data={aboutPageSchema} />
            <SchemaMarkup data={aboutFaqSchema} />
            <SchemaMarkup data={teamSchema} />
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
                            <h2 className={styles.sectionTitle}>Our Genesis: The Drive to Connect</h2>
                        </Reveal>
                    </div>
                    <div>
                        <Reveal delay={0.2}>
                            <p className={styles.text}>
                                Radoss Agency was founded from a clear observation: modern businesses sit on huge growth opportunities, yet many struggle to connect strategy, marketing execution, and enabling technology.
                            </p>
                            <p className={styles.text}>
                                Too often, strong ideas fail because teams are siloed, channels are fragmented, and measurement is disconnected from commercial outcomes. We saw too much potential being lost in those gaps.
                            </p>
                            <p className={styles.text}>
                                Our response was intentional: build a firm that does not just execute tasks, but architects integrated growth systems. We help organizations move from disconnected activity to coordinated momentum.
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
                                To help ambitious brands translate business ambition into measurable outcomes through integrated strategy, high-performance marketing, and practical technology adoption.
                            </p>
                        </Reveal>
                    </div>
                    <div className={styles.card}>
                        <Reveal delay={0.2}>
                            <span className={styles.cardLabel}>Vision</span>
                            <h3 className={styles.cardHeading}>Shaping What&apos;s Next</h3>
                            <p className={styles.cardText}>
                                We envision a future where every growth decision is connected, data-informed, and execution-ready. Radoss Agency aims to be the most trusted partner for business and digital transformation in Africa and beyond.
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
                            { title: 'Holistic Perspective', desc: 'Every channel, system, and initiative should support one shared business direction.' },
                            { title: 'Strategic Partnership', desc: 'We work as an extension of your internal team, not as a detached vendor.' },
                            { title: 'Data-Driven Decisions', desc: 'Insights, attribution, and clear KPI governance guide our recommendations.' },
                            { title: 'Relentless Innovation', desc: 'We continuously test, learn, and optimize to unlock compounding growth.' },
                            { title: 'Execution Discipline', desc: 'Strong strategies are only valuable when translated into dependable delivery.' },
                            { title: 'Unwavering Integrity', desc: 'Transparent reporting and honest counsel build trust and long-term value.' },
                        ].map((value, i) => (
                            <Reveal key={value.title} delay={i * 0.1}>
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

            <Section className={styles.teamSection}>
                <div className="container">
                    <Reveal>
                        <div className={styles.teamHeader}>
                            <span className={styles.teamLabel}>Leadership</span>
                            <h2 className={styles.teamTitle}>The Team Connecting Strategy to Execution</h2>
                            <p className={styles.teamIntro}>
                                Radoss is led by operators and strategists who understand growth from the inside out, from executive planning through campaign and systems delivery.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.teamGrid}>
                        {teamMembers.map((member, index) => (
                            <Reveal key={member.name} delay={index * 0.1} width="100%">
                                <article className={styles.teamCard}>
                                    <div className={styles.avatarWrap}>
                                        <span className={styles.memberBadge}>L{index + 1}</span>
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={440}
                                            height={520}
                                            priority={index === 0}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className={styles.avatarImage}
                                        />
                                    </div>
                                    <div className={styles.memberMeta}>
                                        <h3 className={styles.memberName}>{member.name}</h3>
                                        <p className={styles.memberRole}>{member.role}</p>
                                        <p className={styles.memberFocus}>{member.focus}</p>
                                        <p className={styles.memberSummary}>{member.summary}</p>
                                        <ul className={styles.memberDomains}>
                                            {member.domains.map((domain) => (
                                                <li key={domain}>{domain}</li>
                                            ))}
                                        </ul>
                                        {member.links.length > 0 && (
                                            <div className={styles.memberLinks}>
                                                {member.links.map((item) => (
                                                    <a
                                                        key={item.href}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.memberLink}
                                                    >
                                                        {item.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    );
}
