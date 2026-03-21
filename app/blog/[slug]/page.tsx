import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { generateBlogPostingSchema } from '@/lib/blog-schema';
import { JsonLd } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

interface BlogPostPageProps {
  params: { slug: string };
}

// Mock post data (v production fetch from CMS)
const getPostBySlug = (slug: string) => {
  return {
    id: slug,
    title: 'The Drinkers Napovedujejo Turnejo 2026',
    description: 'Po dveh letih premora se The Drinkers vračajo z veliko turnejo po Sloveniji in regiji.',
    content: `
      <p class="lead">Po dveh letih premora zaradi pandemije se The Drinkers z velikim pokom vračajo na odre!</p>
      
      <h2>Velika Turneja 2026</h2>
      <p>Turneja "Pivolucija 2026" bo obiskala 15 mest po Sloveniji, Hrvaški, Avstriji in Italiji. Vstopnice bodo na voljo že naslednji teden.</p>
      
      <blockquote>
        "Komaj čakamo, da se srečamo z našimi fani in skupaj proslavimo vrnitev rock'n'rolla!" - pravi frontman.
      </blockquote>
      
      <h2>Datumi Turneje</h2>
      <ul>
        <li><strong>15.4.2026</strong> - Ljubljana, Orto Bar</li>
        <li><strong>16.4.2026</strong> - Maribor, Stock</li>
        <li><strong>22.4.2026</strong> - Koper, Paloma</li>
        <li><strong>23.4.2026</strong> - Zagreb, Močvara</li>
        <li><strong>29.4.2026</strong> - Gradec, Postgarage</li>
        <li><strong>30.4.2026</strong> - Trst, La Citta</li>
      </ul>
      
      <h2>VIP Vstopnice</h2>
      <p>Za vse prave fane smo pripravili VIP pakete, ki vključujejo:</p>
      <ul>
        <li>Vstopnico za koncert</li>
        <li>Dostop do backstagea</li>
        <li>Srečanje z bandom</li>
        <li>Ekskluzivni merchandise</li>
        <li>Podpisano ploščo</li>
      </ul>
      
      <p>Več informacij in vstopnice bodo na voljo na <Link href="/tour">thedrinkers.si/tour</Link>.</p>
    `,
    publishedAt: '2026-03-21',
    updatedAt: '2026-03-21',
    author: 'Band Manager',
    authorImage: '/images/team/manager.jpg',
    image: '/images/blog/tour-2026.jpg',
    tags: ['turneja', 'koncerti', '2026', 'vstopnice'],
    category: 'news',
    readTime: '3 min',
  };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  return {
    title: `${post.title} | The Drinkers`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  const schema = generateBlogPostingSchema(post);

  return (
    <>
      <JsonLd schema={schema} />
      
      {/* Hero Image */}
      <section className="relative h-[60vh]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rock-black via-rock-black/50 to-transparent" />
      </section>

      {/* Content */}
      <Section background="darker">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-crimson hover:text-crimson-light mb-8">
            <ArrowLeft className="w-4 h-4" />
            Nazaj na Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            {/* Category Badge */}
            <span className="px-3 py-1 bg-crimson/20 text-crimson text-sm font-bold rounded-full uppercase">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-text-gray mb-8">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-gray">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-crimson" />
                {post.publishedAt}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-crimson" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-crimson" />
                {post.author}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-crimson/10 text-crimson text-sm rounded-full flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <article 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <GlassCard variant="dark" className="mt-12 p-6">
            <div className="flex items-start gap-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {post.author}
                </h3>
                <p className="text-text-gray">
                  Band manager in glavni pisec vsebin za The Drinkers. Spremlja vse novice in dogodke iz sveta banda.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-text-gray">Deli:</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
              Twitter
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              WhatsApp
            </button>
          </div>
        </div>
      </Section>

      {/* Related Posts */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Sorodne Objava
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add related posts here */}
          </div>
        </div>
      </Section>
    </>
  );
}
