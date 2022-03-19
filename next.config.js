/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    ignoreDuringBuilds: true,
    images: {
        domains: ['github.com']
    }
};

module.exports = nextConfig;
