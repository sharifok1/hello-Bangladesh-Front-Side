// Suppress util._extend deprecation warning from legacy dependencies
process.noDeprecation = true;

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
  minimumCacheTTL: 3600, // Cache images for 1 hour
  unoptimized: false,
  dangerouslyAllowSVG: true,
  // Increase timeout for slow-loading images
  loader: 'default',
  loaderFile: undefined,
},

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
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
}

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

module.exports = withPWA(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "ibos-limited-3d",
  project: "hellobd",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
