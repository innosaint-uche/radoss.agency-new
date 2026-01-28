import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { SolutionCTA } from '../../../components/SolutionCTA';

export const metadata: Metadata = {
    title: "Radoss Digital | High-ROI Performance Marketing Agency",
    description: "Data-driven performance marketing services. PPC, SEO, and Programmatic advertising that delivers measurable growth for ambitious brands.",
    keywords: ["performance marketing agency", "PPC management", "ROI driven marketing", "programmatic advertising", "digital growth agency"],
    alternates: {
        canonical: "https://radoss.agency/solutions/radoss-digital",
    },
    openGraph: {
        title: "Radoss Digital | High-ROI Performance Marketing Agency",
        description: "Data-driven performance marketing services. PPC, SEO, and Programmatic advertising that delivers measurable growth.",
        url: "https://radoss.agency/solutions/radoss-digital",
        siteName: "Radoss Agency",
        images: [
            {
                url: "/images/solutions/radoss-digital-og.png",
                width: 1200,
                height: 630,
                alt: "Radoss Digital Performance Marketing",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Radoss Digital | High-ROI Performance Marketing Agency",
        description: "Data-driven performance marketing services that deliver measurable growth.",
        images: ["/images/solutions/radoss-digital-og.png"],
    },
};

export default function RadossDigitalPage() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Radoss Digital",
        "description": "Premium performance marketing agency specializing in high-ROI campaigns.",
        "url": "https://radoss.agency/solutions/radoss-digital",
        "serviceType": "Performance Marketing",
        "areaServed": "Global",
        "provider": {
            "@type": "Organization",
            "name": "Radoss Agency"
        }
    };

    const features = [
        {
            title: "Precision Targeting",
            description: "We don't guess. We utilize advanced audience segmentation and behavioral data to ensure your ad spend reaches exactly the right eyes.",
            icon: <span className="feature-num">01</span>
        },
        {
            title: "Data-Driven Creative",
            description: "Art meets Science. Our creative strategies are informed by real-time performance metrics, ensuring high engagement and conversion rates.",
            icon: <span className="feature-num">02</span>
        },
        {
            title: "Full-Funnel Attribution",
            description: "We track every touchpoint. From first click to final conversion, giving you a crystal-clear view of your ROI across all channels.",
            icon: <span className="feature-num">03</span>
        },
        {
            title: "Programmatic Scale",
            description: "Leveraging automated buying to access premium inventory at efficient rates, scaling your reach beyond walled gardens.",
            icon: <span className="feature-num">04</span>
        }
    ];

    return (
        <>
            <SchemaMarkup data={schemaData} />

            <ServiceHero
                kicker="Radoss Digital"
                title="Performance Marketing"
                subtitle="Growth, Quantified."
                description="We combine deep analytical rigor with compelling creative to drive measurable business outcomes. Stop paying for impressions. Start paying for growth."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <SolutionCTA
                    title="Ready to Scale?"
                    description="Partner with a team that treats your budget like their own."
                    mainCTA={{
                        label: "Visit Radoss Digital",
                        href: "https://radossdigital.com",
                        external: true
                    }}
                />
            </section>
        </>
    );
}
