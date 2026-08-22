import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    if (!items || items.length === 0) return null;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://radoss.agency${item.url}`
        }))
    };

    return (
        <nav aria-label="Breadcrumb" className={styles.breadcrumbsContainer}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <ol className={styles.breadcrumbList}>
                <li className={styles.breadcrumbItem}>
                    <Link href="/">Home</Link>
                </li>
                {items.map((item, index) => (
                    <React.Fragment key={item.url}>
                        <li className={styles.separator} aria-hidden="true">/</li>
                        <li className={styles.breadcrumbItem} aria-current={index === items.length - 1 ? "page" : undefined}>
                            {index === items.length - 1 ? (
                                <span className={styles.current}>{item.name}</span>
                            ) : (
                                <Link href={item.url}>{item.name}</Link>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
}
