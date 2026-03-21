/**
 * Blog & News Schema Generator
 * Schema.org markup for blog posts and news articles
 */

import { SITE_CONFIG } from '@/lib/constants';

/**
 * BlogPosting Schema
 */
export function generateBlogPostingSchema(blogPost: {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_CONFIG.url}/blog/${blogPost.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${blogPost.id}`,
    },
    headline: blogPost.title,
    description: blogPost.description,
    image: blogPost.image,
    datePublished: blogPost.publishedAt,
    dateModified: blogPost.updatedAt || blogPost.publishedAt,
    author: {
      '@type': 'Person',
      name: blogPost.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    keywords: blogPost.tags.join(', '),
    articleBody: blogPost.content,
    wordCount: blogPost.content.split(' ').length,
  };
}

/**
 * NewsArticle Schema (for press releases)
 */
export function generateNewsArticleSchema(news: {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  image: string;
  category: 'press-release' | 'news' | 'announcement';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${SITE_CONFIG.url}/news/${news.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/news/${news.id}`,
    },
    headline: news.title,
    description: news.description,
    image: {
      '@type': 'ImageObject',
      url: news.image,
      width: 1200,
      height: 630,
    },
    datePublished: news.publishedAt,
    dateModified: news.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    articleSection: news.category,
    articleBody: news.content,
  };
}

/**
 * PressRelease Schema
 */
export function generatePressReleaseSchema(pressRelease: {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${SITE_CONFIG.url}/press/${pressRelease.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/press/${pressRelease.id}`,
    },
    headline: pressRelease.title,
    description: pressRelease.description,
    image: pressRelease.image,
    datePublished: pressRelease.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      contactPoint: {
        '@type': 'ContactPoint',
        email: pressRelease.contactEmail,
        telephone: pressRelease.contactPhone,
        contactType: 'press',
      },
    },
    publisher: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
    },
    articleSection: 'Press Release',
  };
}

/**
 * Blog Schema for Blog Listing Page
 */
export function generateBlogSchema(posts: Array<{
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_CONFIG.url}/blog`,
    name: `${SITE_CONFIG.name} Blog`,
    description: `Latest news and updates from ${SITE_CONFIG.name}`,
    url: `${SITE_CONFIG.url}/blog`,
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      '@id': `${SITE_CONFIG.url}/blog/${post.id}`,
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };
}
