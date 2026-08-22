import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceSchema from '@/components/ServiceSchema';
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
    return (
        <div className={styles.container}>
            <ServiceSchema 
                name="Enterprise AI Workflow Automation"
                description="Transform manual processes into high-speed, intelligent workflows."
                url="/ai/ai-automation"
                serviceType="AI Automation"
            />
            <div className={styles.content}>
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' },
                        { name: 'AI Automation', url: '/ai/ai-automation' }
                    ]} 
                />
                
                <section className={styles.hero}>
                    <h1 className={styles.title}>Enterprise AI Workflow Automation</h1>
                    <p className={styles.subtitle}>
                        Remove bottlenecks and accelerate delivery by embedding intelligent automation directly into your operations.
                    </p>
                </section>
                
                <section className={styles.body}>
                    <h2>Efficiency at Scale</h2>
                    <p>
                        Our automation solutions connect your existing tools (CRM, ERP, Marketing Stacks) with advanced AI models. Whether it&apos;s document processing, customer onboarding, or intelligent data routing, we build robust pipelines that save thousands of human hours.
                    </p>
                </section>
            </div>
        </div>
    );
}
