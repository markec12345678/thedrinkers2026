import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { generateBlogPostingSchema } from "@/lib/blog-schema";
import Link from "next/link";
import { JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog | The Drinkers",
  description: "Novice, zgodbe in posodobitve iz sveta The Drinkers",
};

// Mock blog posts (v production bi prišli iz CMS/DB)
const blogPosts = [
  {
    id: "tour-2026-announcement",
    title: "The Drinkers Napovedujejo Turnejo 2026",
    excerpt:
      "Po dveh letih premora se The Drinkers vračajo z veliko turnejo po Sloveniji in regiji.",
    content: "Full content...",
    publishedAt: "2026-03-21",
    updatedAt: "2026-03-21",
    author: "Band Manager",
    image: "/images/tour/tour-2026-poster.jpg",
    tags: ["turneja", "koncerti", "2026"],
    category: "news",
    readTime: "3 min",
  },
  {
    id: "new-album-recording",
    title: "Snemanje Novega Albuma: Zakulisje",
    excerpt:
      "Poglejte, kako poteka snemanje našega najnovejšega albuma v studiu.",
    content: "Full content...",
    publishedAt: "2026-03-15",
    author: "Producer",
    image: "/images/band/band-studio-portrait.jpg",
    tags: ["album", "snemanje", "studio"],
    category: "behind-scenes",
    readTime: "5 min",
  },
  {
    id: "vip-lounge-launch",
    title: "Predstavljamo VIP Lounge: Ekskluzivni Fan Club",
    excerpt:
      "Postani član VIP Lounge in dobii dostop do ekskluzivnih vsebin, vstopnic in popustov.",
    content: "Full content...",
    publishedAt: "2026-03-10",
    author: "Community Manager",
    image: "/images/gallery/backstage-001.jpg",
    tags: ["VIP", "fan club", "eksclusive"],
    category: "announcement",
    readTime: "4 min",
  },
  {
    id: "merch-new-collection",
    title: "Nova Merchandise Kolekcija 2026",
    excerpt:
      "Odkrij najnovejšo kolekcijo The Drinkers mercha - omejene edicije in ekskluzivni dizajni.",
    content: "Full content...",
    publishedAt: "2026-03-05",
    author: "Merch Team",
    image: "/images/merch/pijemo-ga-radi-tshirt.jpg",
    tags: ["merch", "moda", "kolekcija"],
    category: "merch",
    readTime: "3 min",
  },
];

const categories = [
  { id: "all", name: "Vse", icon: "📰" },
  { id: "news", name: "Novice", icon: "📢" },
  { id: "behind-scenes", name: "Zakulisje", icon: "🎬" },
  { id: "announcement", name: "Napovedi", icon: "🎉" },
  { id: "merch", name: "Merch", icon: "👕" },
];

export default function BlogPage() {
  const blogSchema = generateBlogPostingSchema({
    id: "blog-main",
    title: "Blog | The Drinkers",
    description: "Novice, zgodbe in posodobitve iz sveta The Drinkers",
    content: "Blog page with all news and updates",
    publishedAt: "2026-03-21",
    author: "The Drinkers",
    image: "/images/og-image.jpg",
    tags: ["blog", "news", "updates"],
  });

  return (
    <>
      <JsonLd schema={blogSchema} />
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-black">
        <div className="absolute inset-0">
          <img
            src="/images/gallery/promo-002.jpg"
            alt="Blog"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-black" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            BLOG
          </h1>
          <p className="text-xl text-text-gray">
            Novice, zgodbe in posodobitve
          </p>
        </div>
      </section>

      {/* Categories */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="px-6 py-3 bg-rock-gray/50 hover:bg-crimson/20 border border-crimson/30 rounded-lg text-white transition-all flex items-center gap-2"
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <GlassCard
                key={post.id}
                variant="dark"
                hover
                floating={index % 2 === 0}
                className="h-full"
              >
                {/* Image */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-rock-gray">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 bg-crimson text-white text-xs font-bold rounded uppercase">
                    {categories.find((c) => c.id === post.category)?.name ||
                      post.category}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-4 text-xs text-text-gray mb-3">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {post.title}
                  </h3>

                  <p className="text-text-gray mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-crimson/10 text-crimson text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="btn-secondary w-full inline-block text-center"
                  >
                    Preberi Več →
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center">
            <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ne Zamudi Nobene Novice
              </h2>
              <p className="text-text-gray mb-6">
                Prijavi se na newsletter in bodi na tekočem z vsemi novostmi
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Tvoj email"
                  className="input-field flex-1"
                  required
                />
                <button type="submit" className="btn-primary">
                  Prijavi Se
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
