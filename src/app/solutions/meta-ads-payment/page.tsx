import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { Reveal } from '../../../components/Reveal';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Pay Meta Ads in Naira | Radoss Agency Nigeria",
    description: "Official Meta Business Partner solution. Pay for Facebook & Instagram Ads in Naira without dollar card limits. Seamless, compliant, and efficient.",
};

export default function MetaAdsPaymentPage() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Meta Ads Naira Payment Service",
        "description": "Service enabling Nigerian businesses to pay for Meta (Facebook/Instagram) advertising in local currency (Naira).",
        "url": "https://radoss.agency/solutions/meta-ads-payment",
        "brand": {
            "@type": "Brand",
            "name": "Radoss Agency"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "NGN",
            "availability": "https://schema.org/InStock"
        }
    };

    const features = [
        {
            title: "No Dollar Limits",
            description: "Bypass the restrictive international spending limits on standard Nigerian debit cards. Scale your ad spend without friction.",
            icon: <span style={{ fontSize: '24px' }}>💳</span>
        },
        {
            title: "Meta Business Partner",
            description: "As verified partners, we offer a compliant, secure, and officially recognized channel for ad payments and account management.",
            icon: <span style={{ fontSize: '24px' }}>🛡️</span>
        },
        {
            title: "Instant Account Funding",
            description: "Say goodbye to campaign pauses. Our local payment infrastructure ensures your ad accounts are funded instantly.",
            icon: <span style={{ fontSize: '24px' }}>⚡</span>
        },
        {
            title: "Dedicated Support",
            description: "Access official support channels for ad account issues, bans, or verification hurdles that standard users can't reach.",
            icon: <span style={{ fontSize: '24px' }}>🤝</span>
        }
    ];

    return (
        <>
            <SchemaMarkup data={schemaData} />

            <ServiceHero
                kicker="Meta Business Partner"
                title="Pay Meta Ads in Naira"
                subtitle="Advertise Globally. Pay Locally."
                description="Eliminate payment friction. We provide a seamless, compliant solution for Nigerian businesses to fund Facebook and Instagram ad campaigns in Naira, unrestricted."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <div style={{ marginTop: '100px', textAlign: 'center' }}>
                    <Reveal>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Uncap Your Potential</h3>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
                            Stop letting payment limits dictate your growth.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                            Open Ad Account
                        </Link>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
