// SEO utilities and Schema.org types

export interface JsonLdProps {
  schema: Record<string, any>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Schema types
export interface MusicGroup {
  '@context': 'https://schema.org';
  '@type': 'MusicGroup';
  name: string;
  description: string;
  url: string;
  sameAs: string[];
  image: {
    '@type': 'ImageObject';
    url: string;
    width: number;
    height: number;
  };
  genre: string[];
  members: Array<{
    '@type': 'Person';
    name: string;
    jobTitle: string;
  }>;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    email: string;
    telephone?: string;
    contactType: string;
  };
}

export interface Event {
  '@context': 'https://schema.org';
  '@type': 'Event';
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    '@type': 'MusicVenue';
    name: string;
    address: {
      '@type': 'PostalAddress';
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  image: {
    '@type': 'ImageObject';
    url: string;
    width: number;
    height: number;
  };
  offers: {
    '@type': 'Offer';
    url: string;
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom: string;
  };
  performer: {
    '@type': 'MusicGroup';
    name: string;
  };
}

export interface Product {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

export interface MusicAlbum {
  '@context': 'https://schema.org';
  '@type': 'MusicAlbum';
  name: string;
  byArtist: {
    '@type': 'MusicGroup';
    name: string;
  };
  datePublished: string;
  image: string;
  track: Array<{
    '@type': 'MusicRecording';
    name: string;
    trackNumber: number;
    duration: string;
  }>;
}

export interface WebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface AggregateOffer {
  '@context': 'https://schema.org';
  '@type': 'AggregateOffer';
  lowPrice: number;
  highPrice: number;
  priceCurrency: string;
  offerCount: number;
}

// Helper functions
export function getEventAvailability(soldOut?: boolean): string {
  return soldOut
    ? 'https://schema.org/SoldOut'
    : 'https://schema.org/InStock';
}

export function getProductAvailability(inStock: boolean): string {
  return inStock
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';
}

export function formatDuration(duration: string): string {
  // Convert "3:45" to "PT3M45S"
  const [minutes, seconds] = duration.split(':');
  return `PT${minutes}M${seconds}S`;
}
