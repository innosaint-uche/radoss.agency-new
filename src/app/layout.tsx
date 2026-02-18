import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import InteractiveBackground from "@/components/InteractiveBackground";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

// H1, H2, H3 headings and Logo
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

// Body text
const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});


export const metadata: Metadata = {
    metadataBase: new URL("https://radoss.agency"),
    title: {
        default: "Radoss Agency | Business, Marketing & Digital Transformation Partner",
        template: "%s | Radoss Agency",
    },
    description: "Radoss Agency helps ambitious brands connect business strategy, marketing execution, and technology systems to unlock measurable growth across Nigeria and global markets.",
    keywords: [
        "integrated marketing agency Nigeria",
        "business transformation consulting Lagos",
        "digital performance marketing agency",
        "MarTech strategy and implementation",
        "brand and traditional marketing services",
        "Radoss Agency",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Radoss Agency | Business, Marketing & Digital Transformation Partner",
        description: "Connect business goals, marketing execution, and technology systems with one strategic growth partner.",
        url: "https://radoss.agency",
        siteName: "Radoss Agency",
        locale: "en_NG",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Radoss Agency | Business, Marketing & Digital Transformation Partner",
        description: "Integrated business, marketing, and technology services for measurable growth.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
};


export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const knowledgeGraphSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://radoss.agency/#organization",
                "name": "Radoss Agency",
                "url": "https://radoss.agency",
                "logo": "https://radoss.agency/favicon.png",
                "description": "Radoss Agency connects business strategy, marketing execution, and technology systems to unlock measurable growth.",
                "email": "hello@radoss.agency",
                "telephone": "+2347033827657",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Lagos",
                    "addressCountry": "NG"
                },
                "founder": {
                    "@id": "https://radoss.agency/#uchenna-innocent"
                },
                "member": [
                    { "@id": "https://radoss.agency/#uchenna-innocent" },
                    { "@id": "https://radoss.agency/#timi-uk" },
                    { "@id": "https://radoss.agency/#ebere-agbaje" }
                ],
                "knowsAbout": [
                    "Business and digital transformation",
                    "Performance marketing",
                    "Brand strategy",
                    "Marketing technology",
                    "WhatsApp Business API",
                    "Meta advertising strategy"
                ]
            },
            {
                "@type": "Person",
                "@id": "https://radoss.agency/#uchenna-innocent",
                "name": "Uchenna Innocent",
                "jobTitle": "Chief Digital Architect & Founder",
                "worksFor": { "@id": "https://radoss.agency/#organization" },
                "sameAs": [
                    "https://www.linkedin.com/in/uchenna-innocent/",
                    "https://uchennainnocent.com"
                ],
                "image": "https://res.cloudinary.com/innosaint/image/upload/v1759535536/Uchenna-Innocent_headshot_nzenth.jpg"
            },
            {
                "@type": "Person",
                "@id": "https://radoss.agency/#timi-uk",
                "name": "Timi Uk",
                "jobTitle": "Chief Operating Officer & Co-Founder",
                "worksFor": { "@id": "https://radoss.agency/#organization" }
            },
            {
                "@type": "Person",
                "@id": "https://radoss.agency/#ebere-agbaje",
                "name": "Ebere Agbaje",
                "jobTitle": "Business Operations Lead",
                "worksFor": { "@id": "https://radoss.agency/#organization" },
                "sameAs": [
                    "https://www.linkedin.com/in/ebere-peace-agbaje/"
                ],
                "image": "https://media.licdn.com/dms/image/v2/D4D03AQHarcZat2nPZw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719027089306?e=2147483647&v=beta&t=qEoLB81CVNV6nJK594wiSEHdc8D2ROPySo4U4kI5rg4"
            },
            {
                "@type": "WebSite",
                "@id": "https://radoss.agency/#website",
                "url": "https://radoss.agency",
                "name": "Radoss Agency",
                "publisher": { "@id": "https://radoss.agency/#organization" },
                "inLanguage": "en-NG"
            }
        ]
    };

    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
            <body suppressHydrationWarning>
                <SchemaMarkup data={knowledgeGraphSchema} />
                <ThemeProvider>
                    <SmoothScroll>
                        <InteractiveBackground />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
