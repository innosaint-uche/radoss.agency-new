import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceSchema from '@/components/ServiceSchema';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'AI Agents & Autonomous Systems | Radoss Agency',
    description: 'Deploy custom AI Agents that autonomously execute complex business workflows. From customer support to data analysis, scale your operations with intelligent agents.',
    keywords: [
        'AI agents',
        'autonomous systems',
        'custom AI development',
        'business workflow automation',
        'Radoss Agency AI',
    ],
    alternates: { canonical: '/ai/ai-agents' },
    openGraph: {
        title: 'AI Agents & Autonomous Systems | Radoss Agency',
        description: 'Deploy custom AI Agents that autonomously execute complex business workflows.',
        url: 'https://radoss.agency/ai/ai-agents',
    },
};

export default function AIAgentsPage() {
    return (
        <div className={styles.container}>
            <ServiceSchema 
                name="AI Agents & Autonomous Systems"
                description="Custom AI agents that autonomously execute complex business workflows."
                url="/ai/ai-agents"
                serviceType="AI Development"
            />
            <div className={styles.content}>
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' },
                        { name: 'AI Agents', url: '/ai/ai-agents' }
                    ]} 
                />
                
                <section className={styles.hero}>
                    <h1 className={styles.title}>AI Agents & Autonomous Systems</h1>
                    <p className={styles.subtitle}>
                        Scale your operations with intelligent, task-oriented AI agents that act autonomously to solve complex business problems.
                    </p>
                </section>
                
                <section className={styles.body}>
                    <h2>Beyond Chatbots: True Autonomous Execution</h2>
                    <p>
                        While chatbots respond to queries, AI agents take action. We build specialized agents equipped with tools to browse the web, query databases, execute code, and complete end-to-end workflows without human intervention.
                    </p>
                </section>
            </div>
        </div>
    );
}
