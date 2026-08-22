import type { Metadata } from 'next';
import { ServiceHero, FeatureGrid } from '../../../components/ServiceComponents';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ServiceSchema from '../../../components/ServiceSchema';
import { SolutionCTA } from '../../../components/SolutionCTA';

export const metadata: Metadata = {
    title: "Radoss DSP | Intelligent Programmatic Advertising",
    description: "Africa's leading Demand-Side Platform. Access premium inventory, real-time bidding, and advanced targeting across 50+ African markets.",
    keywords: ["programmatic advertising", "DSP africa", "demand side platform", "real time bidding", "mobile advertising africa"],
    alternates: {
        canonical: "https://radoss.agency/solutions/PROGRAMMATIC-DSP",
    },
    openGraph: {
        title: "Radoss DSP | Intelligent Programmatic Advertising",
        description: "Execute hyper-local programmatic campaigns across Africa with sub-100ms response times and 260M+ user insights.",
        url: "https://radoss.agency/solutions/PROGRAMMATIC-DSP",
        siteName: "Radoss Agency",
        images: [
            {
                url: "/images/solutions/programmatic-dsp-og.png",
                width: 1200,
                height: 630,
                alt: "Radoss DSP - African Programmatic Platform",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Radoss DSP | Intelligent Programmatic Advertising",
        description: "Africa's leading Demand-Side Platform for automated ad buying and targeting.",
        images: ["/images/solutions/programmatic-dsp-og.png"],
    },
};

export default function ProgrammaticDSPPage() {
    const features = [
        {
            title: "Real-Time Bidding",
            description: "Access premium inventory instantly with our lightning-fast RTB optimization engine, securing placements with sub-100ms response times.",
            icon: <span className="feature-num">01</span>
        },
        {
            title: "Hyper-Local Targeting",
            description: "Reach your most valuable audiences across 50+ African markets utilizing pinpoint behavioral, contextual, and regional precision.",
            icon: <span className="feature-num">02</span>
        },
        {
            title: "Audience Intelligence",
            description: "Activate first-party data to segment over 260M+ African users and deploy campaigns across 4000+ specialized interest categories.",
            icon: <span className="feature-num">03</span>
        },
        {
            title: "Premium Mobile Formats",
            description: "Engage Africa's mobile-first demographic natively with Interstitial, Splash, Native Feed, Rewarded, and Playable ad experiences.",
            icon: <span className="feature-num">04</span>
        }
    ];

    return (
        <>
            <ServiceSchema 
                name="Radoss Programmatic DSP"
                description="Enterprise Demand-Side Platform offering programmatic advertising, real-time bidding, and vast publisher inventory across Africa."
                url="/solutions/PROGRAMMATIC-DSP"
                serviceType="Programmatic Advertising Tech"
                areaServed="Africa"
            />
            
            <div className="container" style={{ padding: '20px 0 0' }}>
                <Breadcrumbs 
                    items={[
                        { name: 'Solutions', url: '/solutions' },
                        { name: 'Programmatic DSP', url: '/solutions/PROGRAMMATIC-DSP' }
                    ]} 
                />
            </div>

            <ServiceHero

                kicker="Radoss DSP"
                title="Programmatic Advertising"
                subtitle="Africa's Intelligent Platform."
                description="We provide advertisers and agencies with a unified data powerhouse to execute transparent, automated, and hyper-local media buying at massive scale."
            />

            <section className="container" style={{ paddingBottom: '100px' }}>
                <FeatureGrid features={features} />

                <SolutionCTA
                    title="Scale Your Reach Today"
                    description="Join the top brands using Radoss DSP to precision-target emerging African audiences and accelerate ROI."
                    mainCTA={{
                        label: "Access Radoss DSP",
                        href: "https://programmatic.radoss.agency",
                        external: true
                    }}
                />
            </section>
        </>
    );
}
