import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import { ThemeProvider } from "../components/ThemeProvider";
import InteractiveBackground from "../components/InteractiveBackground";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

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
        <html lang="en" suppressHydrationWarning>
            <body className={`${playfair.variable} ${manrope.variable}`}>
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