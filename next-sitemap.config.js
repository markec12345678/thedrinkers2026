/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://thedrinkers.si",
  generateRobotsTxt: true,
  exclude: ["/api/*", "/admin/*", "/vip-lounge/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/vip-lounge/"],
      },
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  changefreq: "daily",
  priority: 0.7,
  autoLastmod: true,
};
