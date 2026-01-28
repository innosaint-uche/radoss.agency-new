"use client";
import React from 'react';
import Link from 'next/link';
import { Reveal } from './Reveal';

interface SolutionCTAProps {
    title?: string;
    description?: string;
    mainCTA?: {
        label: string;
        href: string;
        external?: boolean;
    };
}

export const SolutionCTA = ({
    title = "Ready to Transform Your Business?",
    description = "Let's discuss how our bespoke digital solutions can drive your growth.",
    mainCTA
}: SolutionCTAProps) => {
    return (
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
            <Reveal>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
                    {description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    {mainCTA && (
                        <>
                            {mainCTA.external ? (
                                <a
                                    href={mainCTA.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ padding: '1rem 3rem' }}
                                >
                                    {mainCTA.label}
                                </a>
                            ) : (
                                <Link
                                    href={mainCTA.href}
                                    className="btn btn-primary"
                                    style={{ padding: '1rem 3rem' }}
                                >
                                    {mainCTA.label}
                                </Link>
                            )}
                            <span style={{ color: 'var(--text-tertiary)', fontWeight: '300' }}>|</span>
                        </>
                    )}
                    <Link
                        href="/contact"
                        className="btn"
                        style={{ padding: '1rem 2.5rem', border: '1px solid var(--border-subtle)' }}
                    >
                        Talk to Us
                    </Link>
                </div>
            </Reveal>
        </div>
    );
};
