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
                        Chatbots answer questions; <strong>AI Agents take action.</strong> We build, deploy, and monitor task-oriented autonomous systems equipped with specialized tools to execute multi-step workflows, query databases, and operate software just like a human operator.
                    </p>

                    <h3>1. Autonomous Capabilities</h3>
                    <ul>
                        <li><strong>Task Execution:</strong> Agents that can autonomously browse the web, scrape data, execute code, and trigger API endpoints to fulfill complex business logic.</li>
                        <li><strong>Multi-Agent Orchestration:</strong> Deploying specialized agent swarms where a &quot;Planner&quot; agent delegates sub-tasks to &quot;Researcher&quot; or &quot;Executor&quot; agents for parallel processing.</li>
                        <li><strong>Contextual Memory:</strong> Our agents utilize vector databases (RAG) and structured registries to retain deep contextual knowledge across long-running sessions.</li>
                    </ul>

                    <h3>2. Enterprise Security &amp; Guardrails</h3>
                    <ul>
                        <li><strong>Strict Access Control:</strong> Service-role keys never leave controlled server-side environments. Agents operate under strictly defined Role-Based Access Controls (RBAC).</li>
                        <li><strong>Sandboxed Environments:</strong> Code execution and web interactions occur within secure, isolated sandboxes to prevent unauthorized system access.</li>
                        <li><strong>Deterministic Outcomes:</strong> We impose strict operational protocols to compress ambiguity, reduce hallucination, and guarantee reliable execution paths.</li>
                    </ul>

                    <h3>3. Deployment Architecture</h3>
                    <p>
                        We do not experiment in production. Every agent deployment undergoes staged validation: <strong>Validate &rarr; Stabilise &rarr; Scale &rarr; Optimise</strong>. We ensure your autonomous systems are secure, auditable, and directly tied to your primary revenue engine.
                    </p>
                </section>
            </div>
        </div>
    );
}
