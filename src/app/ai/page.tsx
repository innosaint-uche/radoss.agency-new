import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'AI Services — Consulting, Implementation & Optimization',
    description:
        'Radoss AI services: AI Strategy, AI Agents, Enterprise AI Automation, and AI Partners. Ship real AI in production in 60 days.',
    keywords: [
        'AI consulting Nigeria',
        'AI services Africa',
        'AI strategy consulting',
        'AI agents development',
        'Enterprise AI automation',
        'AI implementation agency',
        'Forward Deployed Engineers',
        'Radoss AI',
    ],
    alternates: { canonical: 'https://radoss.agency/ai' },
    openGraph: {
        title: 'AI Services — Radoss Agency',
        description: 'AI Strategy, AI Agents, Enterprise AI Automation, and AI Partners.',
        url: 'https://radoss.agency/ai',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Radoss AI Services',
    url: 'https://radoss.agency/ai',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'AI Partners',
            url: 'https://radoss.agency/ai/ai-partners',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Strategy & Transformation',
            url: 'https://radoss.agency/ai/ai-strategy',
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Agents & Autonomous Systems',
            url: 'https://radoss.agency/ai/ai-agents',
        },
        {
            '@type': 'ListItem',
            position: 4,
            name: 'Enterprise AI Automation',
            url: 'https://radoss.agency/ai/ai-automation',
        },
    ],
};

export default function AIHubPage() {
    return (
        <main className={styles.main}>
            <SchemaMarkup data={hubSchema} />

            <div className="container">
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' }
                    ]} 
                />
                
                <header className={styles.header}>
                    <span className={styles.eyebrow}>AI Services</span>
                    <h1 className={styles.title}>
                        We close the<br />
                        <strong>AI execution gap<span className="text-punctuation">.</span></strong>
                    </h1>
                    <p className={styles.intro}>
                        Forward Deployed Engineers, AI Product Leaders, and an integrated strategy practice — built
                        to take enterprise AI from deck to deployment. Choose the engagement that matches where you
                        are: full transformation, autonomous agents, workflow automation, or strategic consulting.
                    </p>
                </header>

                <div className={styles.grid}>
                    <Link href="/ai/ai-partners" className={styles.card}>
                        <span className={styles.number}>01</span>
                        <h2>AI Partners</h2>
                        <p>
                            Flagship 60-day forward-deployed engagement. Cross-domain AI assessment,
                            implementation by FDEs, and customised team training — all in one pod.
                        </p>
                        <span className={styles.linkArrow}>Explore →</span>
                    </Link>

                    <Link href="/ai/ai-strategy" className={styles.card}>
                        <span className={styles.number}>02</span>
                        <h2>AI Strategy</h2>
                        <p>
                            Bridge the gap between AI hype and business reality. We align intelligent technologies 
                            with your core business objectives for measurable ROI.
                        </p>
                        <span className={styles.linkArrow}>Explore →</span>
                    </Link>

                    <Link href="/ai/ai-agents" className={styles.card}>
                        <span className={styles.number}>03</span>
                        <h2>AI Agents</h2>
                        <p>
                            Deploy custom AI Agents that autonomously execute complex business workflows, 
                            from customer support to data analysis.
                        </p>
                        <span className={styles.linkArrow}>Explore →</span>
                    </Link>

                    <Link href="/ai/ai-automation" className={styles.card}>
                        <span className={styles.number}>04</span>
                        <h2>AI Automation</h2>
                        <p>
                            Transform manual processes into high-speed workflows. We embed intelligent automation 
                            directly into your operations to accelerate delivery.
                        </p>
                        <span className={styles.linkArrow}>Explore →</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}

