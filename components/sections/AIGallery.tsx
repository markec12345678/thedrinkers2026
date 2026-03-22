'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Download, ExternalLink } from 'lucide-react';

interface AIGeneratedImage {
  id: string;
  name: string;
  category: 'album' | 'band' | 'social' | 'merch' | 'poster';
  imageUrl: string;
  prompt: string;
  aspect: string;
}

// Pre-generated AI images (stored in /public/images/ai/)
const aiImages: AIGeneratedImage[] = [
  // Albums
  {
    id: 'ai-album-001',
    name: 'Lepi in trezni',
    category: 'album',
    imageUrl: '/images/ai/albums/lepi-in-trezni.jpg',
    prompt: 'Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, crimson red and black color scheme, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality',
    aspect: '1:1'
  },
  {
    id: 'ai-album-002',
    name: 'Žeja',
    category: 'album',
    imageUrl: '/images/ai/albums/zeja.jpg',
    prompt: 'Vintage rock album artwork "Žeja" (Thirst), crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, professional music photography, dramatic lighting, square format',
    aspect: '1:1'
  },
  {
    id: 'ai-album-003',
    name: 'Pivolucija',
    category: 'album',
    imageUrl: '/images/ai/albums/pivolucija.jpg',
    prompt: 'Revolution-themed album cover "Pivolucija", beer revolution concept, crimson red and silver colors, The Drinkers Slovenian rock band, bold typography, high quality album artwork, 4K resolution',
    aspect: '1:1'
  },

  // Band Photos
  {
    id: 'ai-band-001',
    name: 'Band Promo 2026',
    category: 'band',
    imageUrl: '/images/ai/band/promo-2026.jpg',
    prompt: 'Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments (guitars, bass, drums, microphone), dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography, 16:9 aspect ratio',
    aspect: '16:9'
  },
  {
    id: 'ai-band-002',
    name: 'Live Performance',
    category: 'band',
    imageUrl: '/images/ai/band/live-performance.jpg',
    prompt: 'The Drinkers live in concert, crowd surfing fan, energetic rock show, crimson stage lights, beer mugs in air, Slovenian flag colors, professional concert photography, dynamic action shot, 16:9',
    aspect: '16:9'
  },

  // Social Media
  {
    id: 'ai-social-001',
    name: 'Instagram Concert Post',
    category: 'social',
    imageUrl: '/images/ai/social/instagram-post.jpg',
    prompt: 'Instagram square post for The Drinkers rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic, bold text space, 1:1 aspect ratio',
    aspect: '1:1'
  },
  {
    id: 'ai-social-002',
    name: 'Twitter Header',
    category: 'social',
    imageUrl: '/images/ai/social/twitter-header.jpg',
    prompt: 'Twitter header banner for The Drinkers rock band, crimson red gradient background, musical notes and beer icons, professional social media design, 1500x500px layout, 3:1 aspect ratio',
    aspect: '3:1'
  },

  // Merchandise
  {
    id: 'ai-merch-001',
    name: 'T-Shirt Mockup',
    category: 'merch',
    imageUrl: '/images/ai/merch/tshirt-pijemo.jpg',
    prompt: 'Black t-shirt mockup with "Pijemo ga radi" The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready, 4:5 aspect ratio',
    aspect: '4:5'
  },
  {
    id: 'ai-merch-002',
    name: 'Beer Mug Design',
    category: 'merch',
    imageUrl: '/images/ai/merch/beer-mug.jpg',
    prompt: 'Custom beer mug with The Drinkers logo engraved, crimson red design, professional product photography, transparent background, studio lighting, merchandise mockup, 1:1',
    aspect: '1:1'
  },

  // Posters
  {
    id: 'ai-poster-001',
    name: 'Tour 2026 Poster',
    category: 'poster',
    imageUrl: '/images/ai/posters/tour-2026.jpg',
    prompt: 'Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities (Ljubljana, Maribor, Koper, Zagreb), crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style, 2:3 aspect ratio',
    aspect: '2:3'
  }
];

export function AIGallery() {
  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <section className="py-20 bg-rock-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            VISUALI
          </h2>
          <p className="text-xl text-text-gray">
            Uradni vizualni materiali The Drinkers
          </p>
          <p className="text-sm text-text-gray mt-2">
            Professional photography & artwork
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard
                variant="dark"
                hover
                floating={index % 2 === 0}
                className="h-full"
              >
                {/* Image */}
                <div className={`relative ${
                  image.aspect === '1:1' ? 'aspect-square' :
                  image.aspect === '16:9' ? 'aspect-video' :
                  image.aspect === '3:1' ? 'aspect-[3/1]' :
                  image.aspect === '4:5' ? 'aspect-[4/5]' :
                  'aspect-[2/3]'
                } mb-4 rounded-lg overflow-hidden bg-rock-gray`}>
                  <img
                    src={image.imageUrl}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image not found - use SVG placeholder
                      (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                      (e.target as HTMLImageElement).style.objectFit = 'contain';
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-crimson text-white text-xs font-bold rounded uppercase">
                      {image.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {image.name}
                  </h3>
                  <p className="text-sm text-text-gray mb-3 line-clamp-2">
                    {image.prompt}
                  </p>

                  {/* Download Button */}
                  <button
                    className="btn-secondary w-full text-sm py-2 flex items-center justify-center gap-2"
                    onClick={() => handleDownload(image.imageUrl, `${image.name}.jpg`)}
                  >
                    <Download className="w-4 h-4" />
                    Prenesi
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-6">
            <p className="text-sm text-text-gray">
              📸 Professional visuals for The Drinkers band
            </p>
            <p className="text-xs text-text-gray mt-2">
              For press, media, and fan use
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
