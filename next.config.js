/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // For PM2 deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' }, // Spotify
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn.thedrinkers.si' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
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
  },
};

module.exports = nextConfig;
