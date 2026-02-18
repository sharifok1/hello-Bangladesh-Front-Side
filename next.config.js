/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'dev.hellobd.news',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '8000',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '8000',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'media.prothomalo.com',
      pathname: '/**',
    },
  ],
  localPatterns: [
    {
      pathname: '/api/image-proxy',
    },
  ],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
  unoptimized: false,
  dangerouslyAllowSVG: true,
},

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.hellobd.news/api/:path*',
        // destination: 'http://127.0.0.1:8000/api/:path*',
      },
      {
        source: '/storage/:path*',
        destination: 'https://dev.hellobd.news/storage/:path*',
      },
    ];
  },
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,
  // swcMinify: true, // Removed: Next.js 13+ uses SWC minification by default
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);

// Sentry integration removed
