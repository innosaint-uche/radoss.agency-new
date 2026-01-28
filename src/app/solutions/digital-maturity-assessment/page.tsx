import type { Metadata } from 'next';
import AssessmentTool from './AssessmentTool';

export const metadata: Metadata = {
    title: "Digital Maturity Assessment | Radoss Agency",
    description: "Evaluate your organization's digital capabilities and receive a bespoke growth roadmap. Free digital audit and transformation scoring.",
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
    return <AssessmentTool />;
}
