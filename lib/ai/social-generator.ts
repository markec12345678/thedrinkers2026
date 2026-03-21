/**
 * AI Social Media Content Generator
 * Generates captions, hashtags, and content ideas for The Drinkers
 */

import { AISocialPostRequest, AISocialPostResponse } from '@/lib/types/ai';

// The Drinkers brand voice
const BRAND_VOICE = {
  energetic: {
    tone: 'energetic, enthusiastic, rock and roll',
    emojis: ['🤘', '🍺', '🎸', '🔥', '⚡'],
    phrases: ['Na zdravje!', 'Pijemo ga radi!', 'Življenje je prekratko!', 'Za dobro voljo!'],
  },
  professional: {
    tone: 'professional, polished, respectful',
    emojis: ['🎵', '🎤', '🎶', '✨'],
    phrases: ['Vabimo vas', 'Pridružite se nam', 'Doživite'],
  },
  fun: {
    tone: 'fun, playful, humorous',
    emojis: ['😄', '🍻', '🎉', '🤪', '🎊'],
    phrases: ['Čas je za pivo!', 'Rock and roll nikoli ne umre!', 'Uživajte!'],
  },
  nostalgic: {
    tone: 'nostalgic, sentimental, warm',
    emojis: ['🕰️', '💫', '🌟', '❤️'],
    phrases: ['Spomini na', 'Kjer se je začelo', 'Legendarni časi'],
  },
};

// Platform-specific best practices
const PLATFORM_SPECS = {
  instagram: {
    maxCaptionLength: 2200,
    optimalHashtags: 8,
    emojiFriendly: true,
    lineBreaks: true,
    cta: 'Link in bio',
  },
  twitter: {
    maxCaptionLength: 280,
    optimalHashtags: 2,
    emojiFriendly: true,
    lineBreaks: false,
    cta: null,
  },
  facebook: {
    maxCaptionLength: 63206,
    optimalHashtags: 3,
    emojiFriendly: true,
    lineBreaks: true,
    cta: 'Learn more',
  },
  tiktok: {
    maxCaptionLength: 2200,
    optimalHashtags: 5,
    emojiFriendly: true,
    lineBreaks: true,
    cta: null,
  },
};

// Hashtag collections by category
const HASHTAGS = {
  concert: [
    '#TheDrinkers',
    '#SlovenianRock',
    '#LiveMusic',
    '#ConcertNight',
    '#RockConcert',
    '#Ljubljana',
    '#Maribor',
    '#Slovenia',
    '#RockBand',
    '#LivePerformance',
    '#MusicEvent',
    '#RockShow',
    '#ConcertLife',
    '#GigNight',
  ],
  album: [
    '#TheDrinkers',
    '#NewMusic',
    '#SlovenianMusic',
    '#RockAlbum',
    '#AlbumRelease',
    '#NewMusicFriday',
    '#SloRock',
    '#MusicRelease',
    '#AlbumCover',
    '#MusicProduction',
  ],
  merch: [
    '#TheDrinkers',
    '#BandMerch',
    '#RockMerch',
    '#MusicMerchandise',
    '#BandTShirt',
    '#MerchDrop',
    '#SupportLocalMusic',
    '#RockStyle',
    '#MusicFashion',
  ],
  tour: [
    '#TheDrinkers',
    '#Tour2026',
    '#SlovenianTour',
    '#LiveOnTour',
    '#ConcertTour',
    '#TourLife',
    '#RockTour',
    '#MusicTour',
    '#LiveShows',
    '#TourDates',
  ],
  announcement: [
    '#TheDrinkers',
    '#BigNews',
    '#Announcement',
    '#SlovenianRock',
    '#MusicNews',
    '#StayTuned',
    '#ComingSoon',
    '#RockNews',
  ],
  general: [
    '#TheDrinkers',
    '#SlovenianRock',
    '#RockMusic',
    '#Slovenia',
    '#Music',
    '#Rock',
    '#LiveMusic',
    '#SlovenianMusic',
    '#RockBand',
    '#MusicLovers',
  ],
};

// Caption templates by type
const CAPTION_TEMPLATES = {
  concert: {
    energetic: [
      "🤘 PRIPRAVLJENI NA NORO NOČ? 🤘\n\n{band} prihaja v {venue}! {date}\n\nPričakuje vas:\n🔥 Najboljši slovenski rock\n🍺 Mrzlo pivo\n⚡ Energija do jutra\n\nVstopnice že v prodaji! {cta}\n\n{hashtags}",
      "🍺 PIVSKA REVOLUCIJA SE ZAČNE! 🍺\n\n{band} vas vabi na koncert leta!\n📍 {venue}\n📅 {date}\n\nNe zamudi tega rock spektakla!\n\n{hashtags}",
    ],
    professional: [
      "Vabimo vas na koncert The Drinkers.\n\n📍 Lokacija: {venue}\n📅 Datum: {date}\n⏰ Vrata: 21:00\n\nVstopnice so na voljo na {cta}\n\n{hashtags}",
    ],
    fun: [
      "😄 KDO GRE NA PIVO? 🍻\n\nŠala... kdo gre na KONCERT?! 🎸\n\n{band} igrajo v {venue}!\n{date}\n\nBoš zraven? Seveda boš! 🤘\n\n{hashtags}",
    ],
    nostalgic: [
      "💫 Spominjate se prvih koncertov? 💫\n\nTisti občutek, ko je zaigrala prva kitara...\n\n{band} vas popelje nazaj v čas pravega rock'n'rolla!\n\n📍 {venue}\n📅 {date}\n\n{hashtags}",
    ],
  },
  album: {
    energetic: [
      "🔥 NOV ALBUM JE TU! 🔥\n\n'{album}' - zdaj na vseh streaming platformah!\n\nPoslušaj zdaj! {cta}\n\n{hashtags}",
    ],
    professional: [
      "Z veseljem predstavljamo naš najnovejši album '{album}'.\n\nNa voljo na:\n🎵 Spotify\n🎵 Apple Music\n🎵 YouTube\n\n{hashtags}",
    ],
  },
  merch: {
    energetic: [
      "👕 NOVA MERCH KOLEKCIJA! 👕\n\nPokaži svojo zvestobo!\n\n🔥 Omejena serija\n🔥 Ekskluzivni dizajni\n🔥 Samo za fane!\n\nNaroči zdaj! {cta}\n\n{hashtags}",
    ],
  },
  tour: {
    energetic: [
      "🎫 TURNIJA 2026 JE RAZKRITA! 🎫\n\n{band} prihaja v vaša mesta!\n\n📍 {cities}\n\nKje se vidimo?\n\n{hashtags}",
    ],
  },
  announcement: {
    energetic: [
      "📢 VELIKE NOVICE! 📢\n\n{content}\n\nOstanite z nami!\n\n{hashtags}",
    ],
  },
};

/**
 * Generate hashtags for post
 */
function generateHashtags(
  type: string,
  platform: string,
  customKeywords?: string[]
): string[] {
  const baseHashtags = HASHTAGS[type as keyof typeof HASHTAGS] || HASHTAGS.general;
  const specs = PLATFORM_SPECS[platform as keyof typeof PLATFORM_SPECS];
  
  // Add custom keywords as hashtags
  const customHashtags = customKeywords?.map(k => `#${k.replace(/\s/g, '')}`) || [];
  
  // Combine and limit
  const allHashtags = [...customHashtags, ...baseHashtags];
  return allHashtags.slice(0, specs.optimalHashtags);
}

/**
 * Generate caption based on type, tone, and platform
 */
function generateCaption(
  type: string,
  tone: string,
  platform: string,
  content?: AISocialPostRequest['content']
): string {
  const toneData = BRAND_VOICE[tone as keyof typeof BRAND_VOICE] || BRAND_VOICE.energetic;
  const specs = PLATFORM_SPECS[platform as keyof typeof PLATFORM_SPECS];
  
  // Get template
  const templates = CAPTION_TEMPLATES[type as keyof typeof CAPTION_TEMPLATES];
  const templateList = templates ? (templates as any)[tone] || (templates as any).energetic : CAPTION_TEMPLATES.announcement.energetic;
  const template = templateList[Math.floor(Math.random() * templateList.length)];
  
  // Fill in placeholders
  let caption = template
    .replace('{band}', 'The Drinkers')
    .replace('{venue}', content?.venue || 'Orto Bar, Ljubljana')
    .replace('{date}', content?.eventDate || '15.4.2026')
    .replace('{album}', content?.title || 'Pijemo ga radi')
    .replace('{cities}', 'Ljubljana • Maribor • Koper • Zagreb')
    .replace('{content}', content?.description || 'Več kmalu...')
    .replace('{cta}', specs.cta || 'Link in bio')
    .replace('{hashtags}', generateHashtags(type, platform).join(' '));
  
  // Platform-specific formatting
  if (!specs.lineBreaks) {
    caption = caption.replace(/\n/g, ' ');
  }
  
  // Trim to max length
  if (caption.length > specs.maxCaptionLength) {
    caption = caption.substring(0, specs.maxCaptionLength - 3) + '...';
  }
  
  return caption;
}

/**
 * Generate image prompt for social post
 */
function generateImagePrompt(type: string, tone: string): string {
  const basePrompts = {
    concert: 'Professional concert announcement poster for The Drinkers Slovenian rock band, crimson red and black color scheme, energetic stage lighting, beer mug and guitar graphics, bold typography',
    album: 'Album cover artwork for The Drinkers, minimalist design, crimson red vinyl aesthetic, modern rock style, high contrast',
    merch: 'Professional product mockup of The Drinkers merchandise, black t-shirt with crimson logo, studio lighting, e-commerce ready',
    tour: 'Tour poster for The Drinkers 2026 Slovenian tour, all cities listed, vintage rock poster aesthetic, screen print style',
    announcement: 'Social media announcement graphic for The Drinkers, crimson red gradient background, modern design, space for text',
  };
  
  return basePrompts[type as keyof typeof basePrompts] || basePrompts.announcement;
}

/**
 * Main function to generate social media post
 */
export async function generateSocialPost(
  request: AISocialPostRequest
): Promise<AISocialPostResponse> {
  try {
    const { type, platform, tone = 'energetic', content } = request;
    
    // Generate caption
    const caption = generateCaption(type, tone, platform, content);
    
    // Generate hashtags
    const hashtags = generateHashtags(type, platform);
    
    // Generate image prompt
    const imagePrompt = generateImagePrompt(type, tone);
    
    // Generate alternatives
    const alternatives = [];
    const alternativeTones = ['fun', 'professional', 'nostalgic'].filter(t => t !== tone);
    
    for (const altTone of alternativeTones) {
      alternatives.push({
        caption: generateCaption(type, altTone, platform, content),
        hashtags: generateHashtags(type, platform),
      });
    }
    
    return {
      success: true,
      post: {
        caption,
        hashtags,
        imagePrompt,
        platform,
        type,
      },
      alternatives,
    };
  } catch (error) {
    return {
      success: false,
      post: {
        caption: '',
        hashtags: [],
        platform: request.platform,
        type: request.type,
      },
      error: error instanceof Error ? error.message : 'Failed to generate social post',
    };
  }
}

/**
 * Generate multiple post variations
 */
export async function generateMultiplePosts(
  types: Array<{ type: AISocialPostRequest['type']; platform: string }>
): Promise<AISocialPostResponse[]> {
  const results: AISocialPostResponse[] = [];
  
  for (const { type, platform } of types) {
    const result = await generateSocialPost({ type, platform });
    results.push(result);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  return results;
}
