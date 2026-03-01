// Suppress util._extend deprecation warning from legacy dependencies
process.noDeprecation = true;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'dev.hellobd.news',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'cdn.hellobd.news',
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
  minimumCacheTTL: 3600, // Cache images for 1 hour
  unoptimized: false,
  dangerouslyAllowSVG: true,
  contentDispositionType: 'inline', // Ensure images are displayed inline
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  loader: 'default',
  loaderFile: undefined,
},

  // Performance optimizations
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
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
  
  // Reduce JavaScript bundle size
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
}

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

module.exports = withPWA(nextConfig);
