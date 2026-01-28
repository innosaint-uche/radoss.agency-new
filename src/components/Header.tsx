"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

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
                    Radoss<span className={styles.logoDot}>.</span>
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
