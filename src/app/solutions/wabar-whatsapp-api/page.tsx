import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { SolutionCTA } from '../../../components/SolutionCTA';

export const metadata: Metadata = {
    title: "WABAR by Radoss | Enterprise WhatsApp Business API",
    description: "Official WhatsApp Business API solution for support automation, broadcast campaigns, and conversational commerce workflows.",
    keywords: ["whatsapp business api nigeria", "whatsapp chatbot for business", "official meta whatsapp api", "wabar whatsapp solution", "conversational commerce"],
    alternates: {
        canonical: "https://radoss.agency/solutions/wabar-whatsapp-api",
    },
    openGraph: {
        title: "WABAR by Radoss | Enterprise WhatsApp Business API",
        description: "Automate customer conversations, scale support, and drive sales with the official WhatsApp API.",
        url: "https://radoss.agency/solutions/wabar-whatsapp-api",
        siteName: "Radoss Agency",
        images: [
            {
                url: "/images/solutions/wabar-og.png",
                width: 1200,
                height: 630,
                alt: "WABAR WhatsApp Business API",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "WABAR | Enterprise WhatsApp Solutions",
        description: "Scale support and sales operations with the official WhatsApp Business API.",
        images: ["/images/solutions/wabar-og.png"],
    },
};

export default function WabarPage() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WABAR by Radoss",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "Enterprise-grade WhatsApp Business API service for automation, support, and commerce use cases.",
        "url": "https://radoss.agency/solutions/wabar-whatsapp-api",
        "provider": {
            "@type": "Organization",
            "name": "Radoss Agency"
        }
    };

    const features = [
        {
            title: "Official API Access",
            description: "Direct onboarding and implementation support for official WhatsApp Business API access and compliant messaging operations.",
            icon: <span className="feature-num">01</span>
        },
        {
            title: "Smart Automation & Chatbots",
            description: "Deploy structured automation for FAQs, lead qualification, booking flows, and always-on support experiences.",
            icon: <span className="feature-num">02</span>
        },
        {
            title: "Broadcast Campaigns",
            description: "Execute template-compliant broadcast journeys for lifecycle messaging, promotions, reminders, and alerts.",
            icon: <span className="feature-num">03</span>
        },
        {
            title: "eCommerce Integration",
            description: "Integrate catalogs, order flows, and CRM data so customers can discover, inquire, and purchase with less friction.",
            icon: <span className="feature-num">04</span>
        }
    ];

    return (
        <>
            <SchemaMarkup data={schemaData} />

            <ServiceHero
                kicker="WABAR by Radoss"
                title="Enterprise WhatsApp Solutions"
                subtitle="Conversational Commerce at Scale."
                description="Convert WhatsApp into a structured customer communication channel for support, retention, and revenue workflows."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <SolutionCTA
                    title="Start the Conversation"
                    description="Launch with a reliable API setup, scalable messaging logic, and practical onboarding support."
                    mainCTA={{
                        label: "Get WABAR Access",
                        href: "https://wabar.radoss.agency",
                        external: true
                    }}
                />
            </section>
        </>
    );
}
