import { JsonLd, MusicGroup, Event, Product, AggregateOffer } from '@/lib/seo';
import { SITE_CONFIG, bandMembers, tourDates, merchItems, albums } from '@/lib/constants';

interface SchemaProps {
  type?: 'webSite' | 'musicGroup' | 'event' | 'product';
  data?: any;
}

export function SchemaOrg({ type = 'webSite', data }: SchemaProps) {
  if (type === 'musicGroup') {
    return (
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'MusicGroup',
          name: 'The Drinkers',
          description: SITE_CONFIG.description,
          url: SITE_CONFIG.url,
          sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
          image: {
            '@type': 'ImageObject',
            url: `${SITE_CONFIG.url}/og-image.jpg`,
            width: 1200,
            height: 630,
          },
          genre: ['Rock', 'Alternative Rock', 'Hard Rock'],
          members: bandMembers.map((member) => ({
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
          })),
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ljubljana',
            addressCountry: 'Slovenia',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: SITE_CONFIG.contact.email,
            telephone: SITE_CONFIG.contact.phone,
            contactType: 'booking',
          },
        }}
      />
    );
  }

  if (type === 'event' && data) {
    return (
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: `The Drinkers - ${data.venue}`,
          description: `Koncert skupine The Drinkers v ${data.venue}, ${data.city}`,
          url: `${SITE_CONFIG.url}/tour`,
          startDate: data.date,
          endDate: data.date,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'MusicVenue',
            name: data.venue,
            address: {
              '@type': 'PostalAddress',
              streetAddress: data.address || '',
              addressLocality: data.city,
              addressCountry: 'SI',
            },
          },
          image: {
            '@type': 'ImageObject',
            url: `${SITE_CONFIG.url}/og-image.jpg`,
            width: 1200,
            height: 630,
          },
          offers: {
            '@type': 'Offer',
            url: data.ticketUrl || `${SITE_CONFIG.url}/tour`,
            price: data.price?.replace('€', '') || '0',
            priceCurrency: 'EUR',
            availability: data.soldOut
              ? 'https://schema.org/SoldOut'
              : 'https://schema.org/InStock',
            validFrom: new Date().toISOString(),
          },
          performer: {
            '@type': 'MusicGroup',
            name: 'The Drinkers',
          },
        }}
      />
    );
  }

  if (type === 'product' && data) {
    return (
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: `${data.name} - Uradni merchandise skupine The Drinkers`,
          image: `${SITE_CONFIG.url}${data.image}`,
          brand: {
            '@type': 'Brand',
            name: 'The Drinkers',
          },
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'EUR',
            availability: data.inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `${SITE_CONFIG.url}/merch`,
          },
        }}
      />
    );
  }

  // Default WebSite schema
  return (
    <JsonLd
      schema={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Drinkers',
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        inLanguage: 'sl-SI',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

// Component for listing all tour dates with schema
export function TourSchemaList() {
  return (
    <>
      {tourDates.map((tourDate) => (
        <SchemaOrg key={tourDate.id} type="event" data={tourDate} />
      ))}
    </>
  );
}

// Component for listing all products with schema
export function ProductSchemaList() {
  return (
    <>
      {merchItems.map((product) => (
        <SchemaOrg key={product.id} type="product" data={product} />
      ))}
    </>
  );
}

// Component for music albums
export function MusicAlbumSchema() {
  return albums.map((album) => (
    <JsonLd
      key={album.id}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'MusicAlbum',
        name: album.title,
        byArtist: {
          '@type': 'MusicGroup',
          name: 'The Drinkers',
        },
        datePublished: album.year.toString(),
        image: `${SITE_CONFIG.url}${album.artwork}`,
        track: album.tracks.map((track, index) => ({
          '@type': 'MusicRecording',
          name: track.title,
          trackNumber: index + 1,
          duration: `PT${track.duration.replace(':', 'M')}S`,
        })),
      }}
    />
  ));
}
