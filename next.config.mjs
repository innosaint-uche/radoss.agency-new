/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
            }
        ],
    },
};

export default nextConfig;
