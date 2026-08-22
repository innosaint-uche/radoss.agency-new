import React from 'react';

interface ServiceSchemaProps {
    name: string;
    description: string;
    url: string;
    serviceType?: string;
    provider?: string;
    areaServed?: string;
}

export default function ServiceSchema({
    name,
    description,
    url,
    serviceType = "Digital Marketing & Business Transformation",
    provider = "Radoss Agency",
    areaServed = "NG"
}: ServiceSchemaProps) {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "url": `https://radoss.agency${url}`,
        "serviceType": serviceType,
        "provider": {
            "@type": "Organization",
            "name": provider,
            "@id": "https://radoss.agency/#organization"
        },
        "areaServed": {
            "@type": "Country",
            "name": areaServed
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
