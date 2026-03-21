/**
 * AI SEO Optimization Service
 * Generates SEO-optimized content, meta tags, and schema markup
 */

import { AISEOOptimizeRequest, AISEOOptimizeResponse } from '@/lib/types/ai';

// The Drinkers base keywords
const BASE_KEYWORDS = {
  general: [
    'The Drinkers',
    'Slovenian rock band',
    'Slovenian music',
    'rock music Slovenia',
    'Ljubljana band',
  ],
  concert: [
    'concert Slovenia',
    'live music Ljubljana',
    'rock concert',
    'music event',
    'tickets Slovenia',
  ],
  tour: [
    'The Drinkers tour',
    'Slovenian tour 2026',
    'concert tour',
    'live shows',
    'tour dates',
  ],
  album: [
    'new album',
    'Slovenian rock album',
    'music release',
    'album 2026',
  ],
  merch: [
    'band merchandise',
    'rock band t-shirt',
    'music merch',
    'band gear',
  ],
};

// Schema types for different page types
const SCHEMA_TEMPLATES = {
  event: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: data.title || 'The Drinkers Concert',
    description: data.description || 'Live concert performance by The Drinkers',
    url: data.url || 'https://thedrinkers.si',
    startDate: data.eventDate || '2026-04-15T21:00:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineAttendance',
    location: {
      '@type': 'MusicVenue',
      name: data.venue || 'Orto Bar',
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.city || 'Ljubljana',
        addressCountry: 'SI',
      },
    },
    image: data.image || 'https://thedrinkers.si/images/og-image.jpg',
    offers: {
      '@type': 'Offer',
      url: data.ticketUrl || 'https://thedrinkers.si/tickets',
      price: data.price || '25.00',
      priceCurrency: 'EUR',
      availability: data.soldOut 
        ? 'https://schema.org/SoldOut' 
        : 'https://schema.org/InStock',
      validFrom: data.onSaleDate || new Date().toISOString(),
    },
    performer: {
      '@type': 'MusicGroup',
      name: 'The Drinkers',
    },
  }),
  music: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: data.title || 'Song Title',
    byArtist: {
      '@type': 'MusicGroup',
      name: 'The Drinkers',
    },
    album: {
      '@type': 'MusicAlbum',
      name: data.album || 'Album Name',
      byArtist: {
        '@type': 'MusicGroup',
        name: 'The Drinkers',
      },
    },
    duration: data.duration || 'PT3M45S',
    image: data.image || 'https://thedrinkers.si/images/album-cover.jpg',
  }),
  merch: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name || 'Merchandise Item',
    description: data.description || 'Official The Drinkers merchandise',
    image: data.image || 'https://thedrinkers.si/images/merch.jpg',
    brand: {
      '@type': 'Brand',
      name: 'The Drinkers',
    },
    offers: {
      '@type': 'Offer',
      price: data.price || '25.00',
      priceCurrency: 'EUR',
      availability: data.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: data.url || 'https://thedrinkers.si/merch',
    },
  }),
  band: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'The Drinkers',
    description: data.description || 'Slovenian rock band from Ljubljana',
    url: 'https://thedrinkers.si',
    sameAs: [
      'https://www.spotify.com/artist/thedrinkers',
      'https://www.youtube.com/@thedrinkers',
      'https://www.instagram.com/thedrinkers',
      'https://www.facebook.com/thedrinkers',
    ],
    genre: ['Rock', 'Slovenian Rock', 'Alternative Rock'],
    members: data.members || [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ljubljana',
      addressCountry: 'SI',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@thedrinkers.si',
      contactType: 'booking',
    },
  }),
};

/**
 * Generate SEO-optimized title
 */
function generateTitle(
  pageType: string,
  content: string,
  keywords?: string[]
): string {
  const baseTitle = 'The Drinkers';
  const separators = [' | ', ' - ', ' • '];
  const separator = separators[Math.floor(Math.random() * separators.length)];
  
  // Extract first sentence or 60 characters
  const contentPreview = content.substring(0, 60).replace(/\n/g, ' ').trim();
  
  switch (pageType) {
    case 'event':
      return `${contentPreview || 'Concert'}${separator}${baseTitle}${separator}Tickets`;
    case 'tour':
      return `Tour Dates 2026${separator}${baseTitle}${separator}Live in Slovenia`;
    case 'music':
      return `${contentPreview || 'Music'}${separator}${baseTitle}`;
    case 'merch':
      return `Official Merchandise${separator}${baseTitle}${separator}Shop`;
    case 'about':
      return `About The Band${separator}${baseTitle}${separator}Slovenian Rock`;
    case 'home':
    default:
      return `${baseTitle}${separator}Official Website${separator}Slovenian Rock Band`;
  }
}

/**
 * Generate SEO-optimized meta description
 */
function generateMetaDescription(
  pageType: string,
  content: string,
  keywords?: string[]
): string {
  // Ideal length: 150-160 characters
  const maxLength = 155;
  
  // Extract relevant content
  let description = content.substring(0, 200).replace(/\n/g, ' ').trim();
  
  // Add call-to-action based on page type
  const ctas = {
    event: ' Get your tickets now!',
    tour: ' See all tour dates and cities.',
    music: ' Listen now on all platforms.',
    merch: ' Shop official merchandise.',
    about: ' Learn our story.',
    home: ' Your source for music, tours, and more.',
  };
  
  description += ctas[pageType as keyof typeof ctas] || '';
  
  // Trim to max length
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
}

/**
 * Generate keywords based on page type
 */
function generateKeywords(
  pageType: string,
  customKeywords?: string[]
): string[] {
  const baseKeywords = BASE_KEYWORDS.general;
  const typeKeywords = BASE_KEYWORDS[pageType as keyof typeof BASE_KEYWORDS] || [];
  const custom = customKeywords || [];
  
  // Combine and deduplicate
  const allKeywords = [...baseKeywords, ...typeKeywords, ...custom];
  return [...new Set(allKeywords)].slice(0, 15);
}

/**
 * Generate schema.org markup
 */
function generateSchema(
  pageType: string,
  data: any = {}
): Record<string, any> | undefined {
  const template = SCHEMA_TEMPLATES[pageType as keyof typeof SCHEMA_TEMPLATES];
  
  if (!template) {
    return undefined;
  }
  
  return template(data);
}

/**
 * Generate internal linking suggestions
 */
function generateInternalLinks(pageType: string): string[] {
  const baseLinks = [
    { type: 'all', links: ['/', '/about', '/music', '/tour', '/merch', '/contact'] },
    { type: 'event', links: ['/tour', '/tickets', '/merch'] },
    { type: 'tour', links: ['/tickets', '/about', '/music'] },
    { type: 'music', links: ['/tour', '/merch', '/about'] },
    { type: 'merch', links: ['/tour', '/music', '/about'] },
  ];
  
  const matching = baseLinks.find(bl => bl.type === pageType || bl.type === 'all');
  return matching?.links || ['/'];
}

/**
 * Analyze content quality
 */
function analyzeContent(content: string): {
  wordCount: number;
  readability: number;
  keywordDensity: number;
} {
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).length;
  const avgWordsPerSentence = words / sentences || 1;
  
  // Simple readability score (lower is better)
  const readability = Math.min(100, avgWordsPerSentence * 5);
  
  // Keyword density (simplified)
  const keywordDensity = Math.min(100, (words / 100) * 2);
  
  return {
    wordCount: words,
    readability: Math.round(readability),
    keywordDensity: Math.round(keywordDensity),
  };
}

/**
 * Calculate SEO score
 */
function calculateSEO(optimized: {
  title: string;
  metaDescription: string;
  keywords: string[];
  schema?: Record<string, any>;
}): {
  overall: number;
  keywordUsage: number;
  readability: number;
  metaTags: number;
  structuredData: number;
} {
  let score = 0;
  let factors = 0;
  
  // Title score (0-25)
  const titleLength = optimized.title.length;
  const titleScore = titleLength >= 50 && titleLength <= 60 ? 25 : 
                     titleLength >= 40 && titleLength <= 70 ? 15 : 5;
  score += titleScore;
  factors += 25;
  
  // Meta description score (0-25)
  const descLength = optimized.metaDescription.length;
  const descScore = descLength >= 140 && descLength <= 160 ? 25 :
                    descLength >= 120 && descLength <= 170 ? 15 : 5;
  score += descScore;
  factors += 25;
  
  // Keywords score (0-25)
  const keywordScore = optimized.keywords.length >= 5 ? 25 :
                       optimized.keywords.length >= 3 ? 15 : 5;
  score += keywordScore;
  factors += 25;
  
  // Structured data score (0-25)
  const schemaScore = optimized.schema ? 25 : 0;
  score += schemaScore;
  factors += 25;
  
  return {
    overall: Math.round((score / factors) * 100),
    keywordUsage: keywordScore,
    readability: 80, // Simplified
    metaTags: titleScore + descScore,
    structuredData: schemaScore,
  };
}

/**
 * Generate SEO optimization suggestions
 */
function generateSuggestions(
  pageType: string,
  content: string,
  score: number
): string[] {
  const suggestions: string[] = [];
  
  if (content.length < 300) {
    suggestions.push('Add more content (aim for 300+ words)');
  }
  
  if (pageType === 'event') {
    suggestions.push('Include event date and venue information');
    suggestions.push('Add ticket pricing and availability');
  }
  
  if (pageType === 'tour') {
    suggestions.push('List all tour dates with links to tickets');
    suggestions.push('Add venue addresses and maps');
  }
  
  if (score < 70) {
    suggestions.push('Improve meta description length (140-160 characters)');
    suggestions.push('Add more relevant keywords');
  }
  
  suggestions.push('Add internal links to related pages');
  suggestions.push('Include high-quality images with alt text');
  suggestions.push('Ensure mobile-friendly design');
  suggestions.push('Optimize page load speed');
  
  return suggestions.slice(0, 7);
}

/**
 * Main function to optimize content for SEO
 */
export async function optimizeForSEO(
  request: AISEOOptimizeRequest
): Promise<AISEOOptimizeResponse> {
  try {
    const { page, content, targetKeywords, pageType } = request;
    
    // Generate optimized elements
    const title = generateTitle(pageType, content, targetKeywords);
    const metaDescription = generateMetaDescription(pageType, content, targetKeywords);
    const keywords = generateKeywords(pageType, targetKeywords);
    
    // Generate schema markup
    const schema = generateSchema(pageType, {
      title: content.split('\n')[0]?.substring(0, 100),
      description: content.substring(0, 200),
      url: `https://thedrinkers.si${page}`,
    });
    
    // Generate internal links
    const internalLinks = generateInternalLinks(pageType);
    
    // Analyze content
    const analysis = analyzeContent(content);
    
    // Create optimized object
    const optimized = {
      title,
      metaDescription,
      keywords,
      ogTitle: title,
      ogDescription: metaDescription,
      twitterTitle: title,
      twitterDescription: metaDescription,
      schema: schema || undefined,
      internalLinks,
      headings: {
        h1: content.split('\n')[0]?.substring(0, 60) || `The Drinkers - ${pageType}`,
        h2s: content.split('\n').filter(line => line.length > 20).slice(0, 3),
      },
    };
    
    // Calculate score
    const score = calculateSEO(optimized);
    
    // Generate suggestions
    const suggestions = generateSuggestions(pageType, content, score.overall);
    
    return {
      success: true,
      optimized,
      score,
      suggestions,
    };
  } catch (error) {
    return {
      success: false,
      optimized: {
        title: '',
        metaDescription: '',
        keywords: [],
      },
      score: {
        overall: 0,
        keywordUsage: 0,
        readability: 0,
        metaTags: 0,
        structuredData: 0,
      },
      suggestions: [],
      error: error instanceof Error ? error.message : 'Failed to optimize for SEO',
    };
  }
}
