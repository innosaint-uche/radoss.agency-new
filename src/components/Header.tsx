"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle'; // Toggle Button

const navItems = [
    { label: 'Expertise', href: '/expertise' },
    { label: 'Work', href: '/work' },
    { label: 'Agency', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/radoss-logo.jpg"
                        alt="Radoss Agency - Connecting Dots. Crafting Growth."
                        width={120}
                        height={40}
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                </Link>
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.navLink}>
                            {item.label}
                        </Link>
                    ))}
                    <div className={styles.divider}>|</div>
                    <ThemeToggle />
                </nav>
                <div className={styles.menuBtn}>=</div>
            </div>
        </header>
    );
}
