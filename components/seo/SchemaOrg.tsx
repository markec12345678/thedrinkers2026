import { JsonLd } from '@/lib/seo';
import { generateCombinedSchema, generateEventSchema, generateProductSchema, generateMusicGroupSchema } from '@/lib/schema';
import { SITE_CONFIG, bandMembers, tourDates, merchItems, albums } from '@/lib/constants';

interface SchemaProps {
  type?: 'webSite' | 'musicGroup' | 'event' | 'product';
  data?: any;
}

export function SchemaOrg({ type = 'webSite', data }: SchemaProps) {
  // Use new schema generator for musicGroup
  if (type === 'musicGroup') {
    const schema = generateMusicGroupSchema();
    return <JsonLd schema={schema} />;
  }

  if (type === 'event' && data) {
    const schema = generateEventSchema(data);
    return <JsonLd schema={schema} />;
  }

  if (type === 'product' && data) {
    const schema = generateProductSchema(data);
    return <JsonLd schema={schema} />;
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
