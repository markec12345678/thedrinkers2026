/**
 * Schema.org JSON-LD Generator
 * Helps search engines understand content and enables rich results
 */

import { SITE_CONFIG } from '@/lib/constants';
import { TourDate } from '@/lib/types';

/**
 * MusicGroup Schema (for homepage/about)
 */
export function generateMusicGroupSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    sameAs: [
      SITE_CONFIG.social.spotify,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.tiktok,
    ].filter(Boolean),
    foundingDate: SITE_CONFIG.inception.toString(),
    foundingLocation: SITE_CONFIG.origin,
    genre: SITE_CONFIG.genre,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.contact.email,
      telephone: SITE_CONFIG.contact.phone,
      contactType: 'booking',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ljubljana',
      addressCountry: 'SI',
    },
  };
}

/**
 * Event Schema (for tour pages)
 */
export function generateEventSchema(event: TourDate) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${SITE_CONFIG.name} - Live in ${event.city}`,
    description: `Join ${SITE_CONFIG.name} live at ${event.venue} in ${event.city}`,
    url: `${SITE_CONFIG.url}/tour/${event.id}`,
    startDate: event.date,
    eventStatus: event.soldOut 
      ? 'https://schema.org/SoldOut' 
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineAttendance',
    location: {
      '@type': 'MusicVenue',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address || '',
        addressLocality: event.city,
        addressCountry: event.country,
      },
    },
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    offers: event.ticketUrl ? {
      '@type': 'Offer',
      url: event.ticketUrl,
      price: event.price || '0',
      priceCurrency: 'EUR',
      availability: event.soldOut 
        ? 'https://schema.org/SoldOut' 
        : 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    } : undefined,
    performer: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
    },
  };
}

/**
 * WebSite Schema (for homepage)
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    inLanguage: 'sl',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    } as any,
  };
}

/**
 * BreadcrumbList Schema (for navigation)
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage Schema (for FAQ sections)
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Product Schema (for merch)
 */
export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `${SITE_CONFIG.url}/merch#${product.id}`,
    },
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
  };
}

/**
 * MusicRecording Schema (for songs)
 */
export function generateMusicRecordingSchema(song: {
  id: string;
  title: string;
  duration: string;
  album?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: song.title,
    duration: `PT${song.duration.replace(':', 'M').replace(':', 'S')}`,
    byArtist: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
    },
    ...(song.album && {
      album: {
        '@type': 'MusicAlbum',
        name: song.album,
        byArtist: {
          '@type': 'MusicGroup',
          name: SITE_CONFIG.name,
        },
      },
    }),
  };
}

/**
 * Combined Schema Generator (for homepage)
 */
export function generateCombinedSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateMusicGroupSchema(),
      generateWebSiteSchema(),
    ],
  };
}
