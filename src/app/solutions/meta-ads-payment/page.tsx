import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { SolutionCTA } from '../../../components/SolutionCTA';

export const metadata: Metadata = {
    title: "Pay Meta Ads in Naira | Radoss Agency Nigeria",
    description: "Pay for Facebook and Instagram ads in Naira through a compliant Meta Business Partner workflow without card-limit disruption.",
    keywords: ["pay for facebook ads in naira", "meta business partner nigeria", "instagram ads payment nigeria", "no dollar limit card", "naira virtual card for ads"],
    alternates: {
        canonical: "https://radoss.agency/solutions/meta-ads-payment",
    },
    openGraph: {
        title: "Pay Meta Ads in Naira | Radoss Agency Nigeria",
        description: "Fund Meta ad campaigns in Naira through a compliant and reliable local payment workflow.",
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
        description: "Run uninterrupted Meta campaigns with compliant local-currency funding.",
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
            description: "Avoid international card spending constraints and scale campaign delivery with predictable local funding.",
            icon: <span className="feature-num">01</span>
        },
        {
            title: "Meta Business Partner",
            description: "Operate through a verified partner channel with compliant payment support and dependable operational guidance.",
            icon: <span className="feature-num">02</span>
        },
        {
            title: "Instant Account Funding",
            description: "Minimize downtime from funding delays and maintain media continuity across active ad sets.",
            icon: <span className="feature-num">03</span>
        },
        {
            title: "Dedicated Support",
            description: "Get faster escalation support for account friction points including verification and delivery interruptions.",
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
                description="Remove payment friction from your growth strategy with a local-currency funding workflow designed for campaign continuity."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <SolutionCTA
                    title="Uncap Your Potential"
                    description="Stop letting card limits slow down growth and keep your campaigns running when it matters."
                />
            </section>
        </>
    );
}
