import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceSchema from '@/components/ServiceSchema';
import { ServiceHero, FeatureGrid } from '@/components/ServiceComponents';
import { SolutionCTA } from '@/components/SolutionCTA';
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
    const features = [
        {
            title: "1. The Strategy Mandate",
            description: "One clear roadmap mapping constraints, failure modes, and leverage points before code is written. We evaluate the business impact of AI against your operational costs and revenue targets, starting with a Data Maturity Assessment."
        },
        {
            title: "2. Executive Alignment & Governance",
            description: "Establish strict data privacy, security protocols, and compliance guardrails. We select the right foundation models and orchestration layers to scale securely, and define change management protocols."
        },
        {
            title: "3. Execution & Measurement",
            description: "Every strategy includes a staged commitment plan: Validate → Stabilise → Scale → Optimise. We establish the launch floor, document RPO/RTO objectives, and define the primary growth engine."
        }
    ];

    return (
        <div className={styles.container}>
            <ServiceSchema 
                name="AI Transformation & Strategy Consulting"
                description="Bridge the gap between AI hype and business reality with strategic consulting."
                url="/ai/ai-strategy"
                serviceType="AI Consulting"
            />
            
            <div className="container" style={{ paddingTop: '2rem' }}>
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' },
                        { name: 'AI Strategy', url: '/ai/ai-strategy' }
                    ]} 
                />
            </div>
            
            <ServiceHero 
                kicker="Strategic Consulting"
                title="AI Transformation & Strategy"
                subtitle="Define a clear, actionable roadmap for AI adoption."
                description="We do not deliver theoretical slide decks. Our AI Strategy consulting applies the M.C.I.A Framework to identify high-ROI use cases, align intelligent technologies with core business objectives, and design a governance model built for execution."
            />
            
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <FeatureGrid features={features} />
                </div>
            </section>

            <SolutionCTA 
                title="Ready to define your AI roadmap?"
                description="Get in touch for a strategic consultation on your AI transformation journey."
                mainCTA={{
                    label: "Book a Consultation",
                    href: "mailto:ai@radoss.agency?subject=AI Strategy Consultation"
                }}
            />
        </div>
    );
}
