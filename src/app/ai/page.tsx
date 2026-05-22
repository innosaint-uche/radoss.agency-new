import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
    title: 'AI Services — Consulting, Implementation & Optimization',
    description:
        'Radoss AI services: forward-deployed AI consulting, AI search optimization (AEO + GEO + LLM SEO), AI implementation, and AI training. Ship real AI in production in 60 days.',
    keywords: [
        'AI consulting Nigeria',
        'AI services Africa',
        'AI search optimization',
        'answer engine optimization',
        'generative engine optimization',
        'AI implementation agency',
        'AI training for teams',
        'Forward Deployed Engineers',
        'Radoss AI',
    ],
    alternates: { canonical: 'https://radoss.agency/ai' },
    openGraph: {
        title: 'AI Services — Radoss Agency',
        description: 'Forward-deployed AI consulting, AI search optimization, implementation, and training.',
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
            name: 'AI Search Optimization (AEO + GEO + LLM SEO)',
            url: 'https://radoss.agency/ai/ai-search-optimization',
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Implementation',
            url: 'https://radoss.agency/ai/ai-implementation',
        },
        {
            '@type': 'ListItem',
            position: 4,
            name: 'AI Training',
            url: 'https://radoss.agency/ai/ai-training',
        },
    ],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://radoss.agency/' },
        { '@type': 'ListItem', position: 2, name: 'AI', item: 'https://radoss.agency/ai' },
    ],
};

export default function AIHubPage() {
    return (
        <main className={styles.main}>
            <SchemaMarkup data={hubSchema} />
            <SchemaMarkup data={breadcrumbSchema} />

            <div className="container">
                <header className={styles.header}>
                    <span className={styles.eyebrow}>AI Services</span>
                    <h1 className={styles.title}>
                        We close the<br />
                        <strong>AI execution gap<span className="text-punctuation">.</span></strong>
                    </h1>
                    <p className={styles.intro}>
                        Forward Deployed Engineers, AI Product Leaders, and an integrated strategy practice — built
                        to take enterprise AI from deck to deployment. Choose the engagement that matches where you
                        are: full transformation, search visibility, focused implementation, or team upskilling.
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

                    <div className={styles.cardDisabled} aria-disabled="true">
                        <span className={styles.number}>02</span>
                        <h2>AI Search Optimization</h2>
                        <p>
                            Rank where AI sends buyers next. AEO + GEO + LLM SEO for ChatGPT, Google AI Overviews,
                            Perplexity, and Claude citations.
                        </p>
                        <span className={styles.comingSoon}>Coming soon</span>
                    </div>

                    <div className={styles.cardDisabled} aria-disabled="true">
                        <span className={styles.number}>03</span>
                        <h2>AI Implementation</h2>
                        <p>
                            Standalone build engagement. We embed our Forward Deployed Engineers into your team to
                            ship a specific AI capability inside your stack and governance posture.
                        </p>
                        <span className={styles.comingSoon}>Coming soon</span>
                    </div>

                    <div className={styles.cardDisabled} aria-disabled="true">
                        <span className={styles.number}>04</span>
                        <h2>AI Training</h2>
                        <p>
                            Customised programs led by AI Product Leaders. Strategy for executives, agent
                            development for builders, prompt engineering by role, evaluation & quality control.
                        </p>
                        <span className={styles.comingSoon}>Coming soon</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
