import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { Reveal } from '../../../components/Reveal';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Radoss Digital | High-ROI Performance Marketing Agency",
    description: "Data-driven performance marketing services. PPC, SEO, and Programmatic advertising that delivers measurable growth for ambitious brands.",
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
            icon: <span style={{ fontSize: '24px' }}>🎯</span>
        },
        {
            title: "Data-Driven Creative",
            description: "Art meets Science. Our creative strategies are informed by real-time performance metrics, ensuring high engagement and conversion rates.",
            icon: <span style={{ fontSize: '24px' }}>🎨</span>
        },
        {
            title: "Full-Funnel Attribution",
            description: "We track every touchpoint. From first click to final conversion, giving you a crystal-clear view of your ROI across all channels.",
            icon: <span style={{ fontSize: '24px' }}>📊</span>
        },
        {
            title: "Programmatic Scale",
            description: "Leveraging automated buying to access premium inventory at efficient rates, scaling your reach beyond walled gardens.",
            icon: <span style={{ fontSize: '24px' }}>🚀</span>
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

                <div style={{ marginTop: '100px', textAlign: 'center' }}>
                    <Reveal>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Ready to Scale?</h3>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
                            Partner with a team that treats your budget like their own.
                        </p>
                        <a href="https://radossdigital.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                            Visit Radoss Digital
                        </a>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
