import React from 'react';

interface SchemaMarkupProps {
    data: Record<string, any>;
}

export default function SchemaMarkup({ data }: SchemaMarkupProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
