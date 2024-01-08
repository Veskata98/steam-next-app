/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'community.cloudflare.steamstatic.com',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
