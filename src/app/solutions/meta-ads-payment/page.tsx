import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { SolutionCTA } from '../../../components/SolutionCTA';

export const metadata: Metadata = {
    title: "Pay Meta Ads in Naira | Radoss Agency Nigeria",
    description: "Official Meta Business Partner solution. Pay for Facebook & Instagram Ads in Naira without dollar card limits. Seamless, compliant, and efficient.",
    keywords: ["pay for facebook ads in naira", "meta business partner nigeria", "instagram ads payment nigeria", "no dollar limit card", "naira virtual card for ads"],
    alternates: {
        canonical: "https://radoss.agency/solutions/meta-ads-payment",
    },
    openGraph: {
        title: "Pay Meta Ads in Naira | Radoss Agency Nigeria",
        description: "Official Meta Business Partner solution. Pay for Facebook & Instagram Ads in Naira without dollar card limits.",
        url: "https://radoss.agency/solutions/meta-ads-payment",
        siteName: "Radoss Agency",
        images: [
            {
                url: "/images/solutions/meta-ads-og.png",
                width: 1200,
                height: 630,
                alt: "Pay Meta Ads in Naira",
            },
        ],
        locale: "en_NG",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pay Meta Ads in Naira | Radoss Agency",
        description: "Bypass dollar limits and pay for your Meta ads in Naira securely.",
        images: ["/images/solutions/meta-ads-og.png"],
    },
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
            icon: <span className="feature-num">01</span>
        },
        {
            title: "Meta Business Partner",
            description: "As verified partners, we offer a compliant, secure, and officially recognized channel for ad payments and account management.",
            icon: <span className="feature-num">02</span>
        },
        {
            title: "Instant Account Funding",
            description: "Say goodbye to campaign pauses. Our local payment infrastructure ensures your ad accounts are funded instantly.",
            icon: <span className="feature-num">03</span>
        },
        {
            title: "Dedicated Support",
            description: "Access official support channels for ad account issues, bans, or verification hurdles that standard users can't reach.",
            icon: <span className="feature-num">04</span>
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

                <SolutionCTA
                    title="Uncap Your Potential"
                    description="Stop letting payment limits dictate your growth. Join hundreds of businesses using our compliant payment channel."
                />
            </section>
        </>
    );
}
