import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceSchema from '@/components/ServiceSchema';
import { ServiceHero, FeatureGrid } from '@/components/ServiceComponents';
import { SolutionCTA } from '@/components/SolutionCTA';
import styles from './page.module.css'; // Reusing the same CSS structure

export const metadata: Metadata = {
    title: 'Enterprise AI Workflow Automation | Radoss Agency',
    description: 'Transform manual processes into high-speed, intelligent workflows. We integrate AI into your tech stack to automate tasks, reduce errors, and accelerate growth.',
    keywords: [
        'AI automation',
        'enterprise workflow automation',
        'business process automation',
        'AI integration',
        'Radoss Agency AI',
    ],
    alternates: { canonical: '/ai/ai-automation' },
    openGraph: {
        title: 'Enterprise AI Workflow Automation | Radoss Agency',
        description: 'Transform manual processes into high-speed, intelligent workflows.',
        url: 'https://radoss.agency/ai/ai-automation',
    },
};

export default function AIAutomationPage() {
    const features = [
        {
            title: "Intelligent Document Processing",
            description: "Automate data extraction, classification, and routing for invoices, contracts, and inbound communications at scale."
        },
        {
            title: "CRM & ERP Integration",
            description: "Seamlessly connect your core marketing and operational stacks (HubSpot, Salesforce, Lark, etc.) with advanced LLMs."
        },
        {
            title: "Lifecycle Automation",
            description: "Trigger deeply personalized onboarding, nurture sequences, and retention loops based on real-time customer behavior."
        },
        {
            title: "Zero-Drift Architecture",
            description: "We map the entire dependency graph (roles, APIs, webhooks) before automating any core process."
        },
        {
            title: "Reliability First",
            description: "We deploy robust fallback mechanisms, rate limiting, and observability. Scaling gates ensure systems never crash under peak load."
        },
        {
            title: "Human-in-the-Loop (HITL)",
            description: "Critical workflows retain a human review gate where necessary, ensuring quality control over automated outputs."
        }
    ];

    return (
        <div className={styles.container}>
            <ServiceSchema 
                name="Enterprise AI Workflow Automation"
                description="Transform manual processes into high-speed, intelligent workflows."
                url="/ai/ai-automation"
                serviceType="AI Automation"
            />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' },
                        { name: 'AI Automation', url: '/ai/ai-automation' }
                    ]} 
                />
            </div>
            
            <ServiceHero 
                kicker="Efficiency at Scale"
                title="Enterprise AI Workflow Automation"
                subtitle="Remove bottlenecks and accelerate delivery by embedding intelligent automation directly into your operations."
                description="Manual, repetitive processes destroy operational momentum. We deploy Enterprise AI Workflow Automation to eliminate bottlenecks, reduce human error, and connect your fragmented data silos into intelligent, high-speed pipelines."
            />
            
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <FeatureGrid features={features} />
                </div>
            </section>

            <SolutionCTA 
                title="Ready to accelerate your operations?"
                description="By offloading routine cognitive tasks to AI pipelines, your team reclaims thousands of hours to focus on strategic growth."
                mainCTA={{
                    label: "Discuss Workflow Automation",
                    href: "mailto:hello@radoss.agency?subject=AI Workflow Automation Enquiry"
                }}
            />
        </div>
    );
}
