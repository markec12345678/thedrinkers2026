/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'standalone', // Disabled for deployment

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' }, // Spotify
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn.thedrinkers.si' },
      { protocol: 'https', hostname: 'image.pollinations.ai' }, // AI images
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Security and performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache images for 1 month
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
    ];
  },
  
  // Preconnect to external domains
  async rewrites() {
    return [
      {
        source: '/fonts/:path*',
        destination: 'https://fonts.gstatic.com/:path*',
      },
    ];
  },
  
  experimental: {
    // Cache strategija za 2026
    staleTimes: {
      dynamic: 30,      // 30s za dinamične vsebine (koncerti, newsletter)
      static: 3600,     // 1h za statične vsebine (about, gallery)
    },

    // Server Actions configuration
    serverActions: {
      bodySizeLimit: '2mb',
    },
    
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@next/third-parties',
    ],
    
    // Reduce bundle size
    optimizeCss: true,
  },
  
  // Minify for production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
