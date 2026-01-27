import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { Reveal } from '../../../components/Reveal';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "WABAR by Radoss | Enterprise WhatsApp Business API",
    description: "Official WhatsApp Business API solution. Automate customer support, drive sales, and integrate chatbots with WABAR by Radoss.",
};

export default function WabarPage() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WABAR by Radoss",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "Enterprise-grade WhatsApp Business API solution for automation and commerce.",
        "url": "https://radoss.agency/solutions/wabar-whatsapp-api",
        "provider": {
            "@type": "Organization",
            "name": "Radoss Agency"
        }
    };

    const features = [
        {
            title: "Official API Access",
            description: "Direct integration with Meta's independent WhatsApp Business API. Verified Green Tick application support included.",
            icon: <span style={{ fontSize: '24px' }}>✅</span>
        },
        {
            title: "Smart Automation & Chatbots",
            description: "Deploy AI-driven agents to handle FAQs, booking, and support 24/7. Reduce support costs while increasing engagement.",
            icon: <span style={{ fontSize: '24px' }}>🤖</span>
        },
        {
            title: "Broadcast Campaigns",
            description: "Send personalized, template-approved messages to thousands of customers instantly. High open rates for high-impact alerts.",
            icon: <span style={{ fontSize: '24px' }}>📢</span>
        },
        {
            title: "eCommerce Integration",
            description: "Sync with your inventory. Allow customers to browse via Catalogs and complete purchases directly within WhatsApp.",
            icon: <span style={{ fontSize: '24px' }}>🛒</span>
        }
    ];

    return (
        <>
            <SchemaMarkup data={schemaData} />

            <ServiceHero
                kicker="WABAR by Radoss"
                title="Enterprise WhatsApp Solutions"
                subtitle="Conversational Commerce at Scale."
                description="Transform the world's most popular messaging app into your most powerful revenue channel. WABAR provides the infrastructure for enterprise-grade WhatsApp automation."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <div style={{ marginTop: '100px', textAlign: 'center' }}>
                    <Reveal>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Start the Conversation</h3>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
                            Demo WABAR today and see the power of automated messaging.
                        </p>
                        <a href="https://wabar.radoss.agency" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                            Get WABAR Access
                        </a>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
