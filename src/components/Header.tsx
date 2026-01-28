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
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Radoss<span className={styles.logoDot}>.</span>
                </Link>
                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.navLink}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className={styles.divider}>|</div>
                    <ThemeToggle />
                </nav>
                <button
                    className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>
        </header>
    );
}

