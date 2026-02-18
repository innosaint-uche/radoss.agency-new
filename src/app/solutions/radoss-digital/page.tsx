import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { SolutionCTA } from '../../../components/SolutionCTA';

export const metadata: Metadata = {
    title: "Radoss Digital | Performance Marketing for Revenue Growth",
    description: "Performance marketing services covering SEO, paid media, analytics, and conversion optimization for measurable revenue growth.",
    keywords: ["performance marketing agency", "PPC management", "SEO and paid media", "programmatic advertising", "digital growth agency"],
    alternates: {
        canonical: "https://radoss.agency/solutions/radoss-digital",
    },
    openGraph: {
        title: "Radoss Digital | Performance Marketing for Revenue Growth",
        description: "Integrated SEO, paid media, analytics, and conversion programs for ambitious brands.",
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
        title: "Radoss Digital | Performance Marketing for Revenue Growth",
        description: "Performance marketing services designed for measurable business outcomes.",
        images: ["/images/solutions/radoss-digital-og.png"],
    },
};

export default function RadossDigitalPage() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Radoss Digital",
        "description": "Performance marketing solution for organizations that need attributable growth outcomes.",
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
            description: "Audience, intent, and behavior modeling to direct spend toward high-propensity segments and reduce wasted impressions.",
            icon: <span className="feature-num">01</span>
        },
        {
            title: "Data-Driven Creative",
            description: "Creative strategy informed by real-time signals, structured testing, and conversion feedback loops.",
            icon: <span className="feature-num">02</span>
        },
        {
            title: "Full-Funnel Attribution",
            description: "Channel and campaign attribution that connects media investment to pipeline and revenue outcomes.",
            icon: <span className="feature-num">03</span>
        },
        {
            title: "Programmatic Scale",
            description: "Automated buying and optimization that expands quality reach while maintaining efficiency targets.",
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
                description="We combine analytical rigor, creative discipline, and channel expertise to convert media spend into measurable business growth."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <SolutionCTA
                    title="Ready to Scale?"
                    description="Partner with a team that ties campaign strategy directly to revenue accountability."
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
