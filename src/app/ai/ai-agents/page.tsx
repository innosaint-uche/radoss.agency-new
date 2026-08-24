import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceSchema from '@/components/ServiceSchema';
import { ServiceHero, FeatureGrid } from '@/components/ServiceComponents';
import { SolutionCTA } from '@/components/SolutionCTA';
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
    const features = [
        {
            title: "Task Execution",
            description: "Agents that can autonomously browse the web, scrape data, execute code, and trigger API endpoints to fulfill complex business logic."
        },
        {
            title: "Multi-Agent Orchestration",
            description: "Deploying specialized agent swarms where a 'Planner' agent delegates sub-tasks to 'Researcher' or 'Executor' agents for parallel processing."
        },
        {
            title: "Contextual Memory",
            description: "Our agents utilize vector databases (RAG) and structured registries to retain deep contextual knowledge across long-running sessions."
        },
        {
            title: "Strict Access Control",
            description: "Service-role keys never leave controlled server-side environments. Agents operate under strictly defined Role-Based Access Controls (RBAC)."
        },
        {
            title: "Sandboxed Environments",
            description: "Code execution and web interactions occur within secure, isolated sandboxes to prevent unauthorized system access."
        },
        {
            title: "Deterministic Outcomes",
            description: "We impose strict operational protocols to compress ambiguity, reduce hallucination, and guarantee reliable execution paths."
        }
    ];

    return (
        <div className={styles.container}>
            <ServiceSchema 
                name="AI Agents & Autonomous Systems"
                description="Custom AI agents that autonomously execute complex business workflows."
                url="/ai/ai-agents"
                serviceType="AI Development"
            />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <Breadcrumbs 
                    items={[
                        { name: 'AI', url: '/ai' },
                        { name: 'AI Agents', url: '/ai/ai-agents' }
                    ]} 
                />
            </div>
            
            <ServiceHero 
                kicker="True Autonomous Execution"
                title="AI Agents & Autonomous Systems"
                subtitle="Scale your operations with intelligent, task-oriented AI agents that act autonomously."
                description="Chatbots answer questions; AI Agents take action. We build, deploy, and monitor task-oriented autonomous systems equipped with specialized tools to execute multi-step workflows, query databases, and operate software just like a human operator."
            />
            
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <FeatureGrid features={features} />
                </div>
            </section>

            <SolutionCTA 
                title="Deploy agents, not just models."
                description="Every agent deployment undergoes staged validation: Validate → Stabilise → Scale → Optimise. We ensure your autonomous systems are secure, auditable, and directly tied to your revenue engine."
                mainCTA={{
                    label: "Discuss Autonomous Systems",
                    href: "mailto:hello@radoss.agency?subject=AI Agents Enquiry"
                }}
            />
        </div>
    );
}
