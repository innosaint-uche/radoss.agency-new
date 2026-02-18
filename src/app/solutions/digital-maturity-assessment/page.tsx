import type { Metadata } from 'next';
import AssessmentTool from './AssessmentTool';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
    title: "Free Digital Maturity Assessment Tool | Radoss Agency",
    description: "Free digital maturity assessment to evaluate readiness across strategy, customer, operations, technology, and culture with instant recommendations.",
    keywords: ["digital maturity assessment", "digital transformation audit", "business digital readiness", "marketing technology audit", "digital growth strategy"],
    alternates: {
        canonical: "https://radoss.agency/solutions/digital-maturity-assessment",
    },
    openGraph: {
        title: "Digital Maturity Assessment | Radoss Agency",
        description: "Benchmark your digital capabilities and get a personalized transformation roadmap.",
        url: "https://radoss.agency/solutions/digital-maturity-assessment",
        siteName: "Radoss Agency",
        images: [
            {
                url: "/images/solutions/dma-og.png",
                width: 1200,
                height: 630,
                alt: "Digital Maturity Assessment Tool",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Maturity Assessment | Radoss Agency",
        description: "Free tool to evaluate your organization's digital maturity and growth potential.",
        images: ["/images/solutions/dma-og.png"],
    },
};

export default function Page() {
    return (
        <>
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Radoss Digital Maturity Assessment",
                "description": "Free interactive tool for assessing organizational digital maturity and generating tailored recommendations.",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "url": "https://radoss.agency/solutions/digital-maturity-assessment",
                "isAccessibleForFree": true,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            }} />
            <SchemaMarkup data={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Is the Digital Maturity Assessment free?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. The Radoss Digital Maturity Assessment is free to complete and includes instant scoring and downloadable results."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How long does the assessment take?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most teams complete the assessment in under 10 minutes."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What dimensions are covered?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The tool evaluates Customer, Strategy, Technology, Operations, and Organisation & Culture maturity."
                        }
                    }
                ]
            }} />
            <AssessmentTool />
        </>
    );
}
