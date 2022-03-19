const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYSE === 'true'
});

const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        domains: ['github.com']
    },
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development'
    }
};

module.exports = withPWA(withBundleAnalyzer(nextConfig));
