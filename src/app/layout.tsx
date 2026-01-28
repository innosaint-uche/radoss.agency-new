import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import InteractiveBackground from "@/components/InteractiveBackground";
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
    title: "Radoss Agency | Connecting Dots. Crafting Growth.",
    description: "A premium digital agency specializing in performance marketing, digital transformation, and custom software solutions.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
            <body>
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