import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceSchema from '@/components/ServiceSchema';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'AI Transformation & Strategy Consulting | Radoss Agency',
    description: 'Bridge the gap between AI hype and business reality. Our AI Strategy consulting aligns intelligent technologies with your core business objectives for measurable ROI.',
    keywords: [
        'AI strategy consulting',
        'AI business transformation',
        'enterprise AI roadmap',
        'AI ROI analysis',
        'Radoss Agency AI',
    ],
    alternates: { canonical: '/ai/ai-strategy' },
    openGraph: {
        title: 'AI Transformation & Strategy Consulting | Radoss Agency',
        description: 'Bridge the gap between AI hype and business reality with our strategic consulting.',
        url: 'https://radoss.agency/ai/ai-strategy',
    },
};

export default function AIStrategyPage() {
    return (
        <div className={styles.container}>
            <ServiceSchema 
                name="AI Transformation & Strategy Consulting"
                description="Bridge the gap between AI hype and business reality with strategic consulting."
                url="/ai/ai-strategy"
                serviceType="AI Consulting"
            />
            <div className={styles.content}>
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' },
                        { name: 'AI Strategy', url: '/ai/ai-strategy' }
                    ]} 
                />
                
                <section className={styles.hero}>
                    <h1 className={styles.title}>AI Transformation & Strategy</h1>
                    <p className={styles.subtitle}>
                        Define a clear, actionable roadmap for AI adoption that delivers measurable business value and competitive advantage.
                    </p>
                </section>
                
                <section className={styles.body}>
                    <h2>Strategy That Executes</h2>
                    <p>
                        We don&apos;t just deliver decks. Our strategic process involves assessing your current data maturity, identifying high-ROI AI use cases, and designing an architecture and governance model that sets you up for successful, scalable deployment.
                    </p>
                </section>
            </div>
        </div>
    );
}
