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
                    <h2>Bridge the gap between AI hype and business reality</h2>
                    <p>
                        We do not deliver theoretical slide decks. Our AI Strategy consulting applies the <strong>M.C.I.A Framework (Map, Connect, Implement, Analyse)</strong> to identify high-ROI use cases, align intelligent technologies with your core business objectives, and design a governance model built for execution.
                    </p>

                    <h3>1. The Strategy Mandate</h3>
                    <ul>
                        <li><strong>One clear roadmap:</strong> We map constraints, failure modes, and leverage points before you write a single line of code.</li>
                        <li><strong>Measurable ROI:</strong> We evaluate the business impact of AI adoption against your specific operational costs and revenue targets.</li>
                        <li><strong>Data Maturity Assessment:</strong> We audit your existing data infrastructure to establish a solid foundation for AI readiness.</li>
                    </ul>

                    <h3>2. Executive Alignment &amp; Governance</h3>
                    <ul>
                        <li><strong>Risk Mitigation:</strong> We establish strict data privacy, security protocols, and compliance guardrails (including LLM bias and hallucination mitigation).</li>
                        <li><strong>Architecture Planning:</strong> Selecting the right foundation models, vector databases, and orchestration layers to scale securely.</li>
                        <li><strong>Change Management:</strong> Training your teams and defining clear operational protocols to ensure smooth enterprise adoption.</li>
                    </ul>

                    <h3>3. Execution &amp; Measurement</h3>
                    <p>
                        Every strategy we design includes a staged commitment plan: <strong>Validate &rarr; Stabilise &rarr; Scale &rarr; Optimise</strong>. We establish the launch floor, document recovery objectives (RPO/RTO), and define the primary growth engine before execution begins.
                    </p>
                </section>
            </div>
        </div>
    );
}
