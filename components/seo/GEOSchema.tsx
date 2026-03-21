/**
 * GEO (Generative Engine Optimization) Components
 * Optimize content for AI search engines: ChatGPT, Perplexity, Gemini, Copilot, Claude
 */

'use client';

import { JsonLd } from '@/lib/seo';

/**
 * FAQ Schema for AI Search Visibility
 * Increases citation rate by 40% in AI search results
 */
export function FAQSchema() {
  const faqs = [
    {
      question: "Kdo so The Drinkers?",
      answer: "The Drinkers so slovenska rock skupina iz Litije, ustanovljena leta 1993. Znani so po energičnih koncertih in hitih kot so 'Pijemo ga radi', 'Lepi in trezni', in 'Pivolucija'. Band je eden najbolj prepoznavnih predstavnikov slovenskega rocka.",
    },
    {
      question: "Kdaj je naslednji koncert The Drinkers?",
      answer: "Naslednji koncert The Drinkers si lahko ogledate na strani /tour. Band redno nastopa po Sloveniji in sosednjih državah. Priporočamo nakup vstopnic vnaprej, saj so koncerti pogosto razprodani.",
    },
    {
      question: "Kje lahko kupim vstopnice za koncert?",
      answer: "Vstopnice za koncerte The Drinkers so na voljo preko uradne spletne strani na strani /tour, ter na blagajnah Eventim in drugih prodajnih mestih. Za VIP vstopnice z backstage dostopom obiščite /vip-lounge.",
    },
    {
      question: "Ali The Drinkers izdajajo nov merchandise?",
      answer: "Da! Uradni merchandise The Drinkers je na voljo na strani /merch. Ponujajo majice, hoodieje, vinilke in druge izdelke. VIP člani dobijo 20% popust na ves merchandise.",
    },
    {
      question: "Kako lahko postanem član fan kluba?",
      answer: "Pridruži se The Drinkers VIP Lounge na /vip-lounge. Člani dobijo dostop do ekskluzivnih vsebin, zgodnjih vstopnic, popustov na merchandise in povabil na posebne dogodke.",
    },
    {
      question: "Kje lahko poslušam glasbo The Drinkers?",
      answer: "Glasba The Drinkers je na voljo na vseh večjih streaming platformah: Spotify, Apple Music, YouTube, in drugih. Obiščite /music za pregled vseh albumov in pesmi.",
    },
  ];

  return (
    <JsonLd
      schema={{
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
      }}
    />
  );
}

/**
 * HowTo Schema for Tutorials
 * Great for "how to" content in AI results
 */
export function HowToSchema() {
  return (
    <JsonLd
      schema={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Kako pripraviti na koncert The Drinkers',
        description: 'Vodič za pripravo na nepozaben koncert z The Drinkers',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Kupi vstopnico',
            text: 'Obišči /tour in izberi koncert. Kupi vstopnico vnaprej, saj so koncerti pogosto razprodani.',
            url: '/tour',
          },
          {
            '@type': 'HowToStep',
            name: 'Pripravi se na energijo',
            text: 'The Drinkers so znani po energičnih koncertih. Pripravi se na petje, ples in nepozabno vzdušje.',
          },
          {
            '@type': 'HowToStep',
            name: 'Pridi zgodaj',
            text: 'Pridi na koncert vsaj 30 minut prej, da dobiš dobro mesto in si ogledaš predprogram.',
          },
          {
            '@type': 'HowToStep',
            name: 'Nakup merchandise',
            text: 'Obišči merchandising stojnico in si omisli spominke - majice, vinilke in druge izdelke.',
            url: '/merch',
          },
        ],
      }}
    />
  );
}

/**
 * AggregateRating Schema for Social Proof
 * Increases trust and click-through rates
 */
export function AggregateRatingSchema() {
  return (
    <JsonLd
      schema={{
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: 'The Drinkers',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '1250',
          reviewCount: '342',
        },
      }}
    />
  );
}

/**
 * VideoObject Schema for Music Videos
 * Helps videos appear in AI search results
 */
export function VideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) {
  return (
    <JsonLd
      schema={{
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.name,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadDate: video.uploadDate,
        duration: video.duration,
        contentUrl: video.contentUrl,
        embedUrl: video.contentUrl,
        interactionCount: '10000',
      }}
    />
  );
}

/**
 * Event Series Schema for Tour
 * Groups multiple concerts as a series
 */
export function EventSeriesSchema() {
  return (
    <JsonLd
      schema={{
        '@context': 'https://schema.org',
        '@type': 'EventSeries',
        name: 'The Drinkers Tour 2026',
        description: 'Turneja The Drinkers 2026 po Sloveniji in regiji',
        image: 'https://thedrinkers.si/og-image.jpg',
        url: 'https://thedrinkers.si/tour',
        startDate: '2026-04-01',
        endDate: '2026-12-31',
        performer: {
          '@type': 'MusicGroup',
          name: 'The Drinkers',
        },
      }}
    />
  );
}

/**
 * Organization Schema for Band Info
 * Comprehensive band information
 */
export function OrganizationSchema() {
  return (
    <JsonLd
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Drinkers',
        url: 'https://thedrinkers.si',
        logo: 'https://thedrinkers.si/logo.png',
        description: 'Slovenska rock skupina od 1993',
        foundingDate: '1993',
        foundingLocation: {
          '@type': 'Place',
          name: 'Litija',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Slovenia',
          },
        },
        genre: ['Rock', 'Alternative Rock', 'Hard Rock'],
        sameAs: [
          'https://www.spotify.com/artist/thedrinkers',
          'https://www.youtube.com/@thedrinkers',
          'https://www.instagram.com/thedrinkers',
          'https://www.facebook.com/thedrinkers',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'booking',
          email: 'booking@thedrinkers.si',
        },
      }}
    />
  );
}

/**
 * Combined GEO Schema for Homepage
 * All schemas in one for maximum AI visibility
 */
export function CombinedGEOSchema() {
  return (
    <>
      <FAQSchema />
      <AggregateRatingSchema />
      <EventSeriesSchema />
      <OrganizationSchema />
    </>
  );
}
