import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    outputFileTracingRoot: appDir,
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'brackenads.com'
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com'
            },
            {
                protocol: 'https',
                hostname: 'placehold.co'
            },
            {
                protocol: 'https',
                hostname: 'cdn.worldvectorlogo.com'
            },
            {
                protocol: 'https',
                hostname: 'beyondlimits.global'
            },
            {
                protocol: 'https',
                hostname: 'miva-university.s3.eu-west-2.amazonaws.com'
            }
        ],
    },
    async redirects() {
        return [
            { source: '/ai-partners', destination: '/ai/ai-partners', permanent: true },
            { source: '/forward-deployed-engineers', destination: '/ai/ai-partners', permanent: true },
            { source: '/60-day-ai', destination: '/ai/ai-partners', permanent: true },
            { source: '/ai-consulting', destination: '/ai/ai-partners', permanent: true },
            { source: '/ai-transformation', destination: '/ai/ai-partners', permanent: true },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
