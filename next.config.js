/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'community.cloudflare.steamstatic.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'steamcdn-a.akamaihd.net',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
