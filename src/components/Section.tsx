import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

export function Section({ children, className = '', id, style }: SectionProps) {
    return (
        <section
            id={id}
            className={`container ${className}`}
            style={{
                paddingTop: '6rem',
                paddingBottom: '6rem',
                ...style
            }}
        >
            {children}
        </section>
    );
}
