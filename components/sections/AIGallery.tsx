'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface AIGeneratedImage {
  id: string;
  name: string;
  category: 'album' | 'band' | 'social' | 'merch' | 'poster';
  placeholder: string;
  prompt: string;
  aspect: string;
}

const aiImages: AIGeneratedImage[] = [
  // Albums
  {
    id: 'ai-album-001',
    name: 'Lepi in trezni',
    category: 'album',
    placeholder: '/images/placeholders/album-cover-1.jpg',
    prompt: 'Minimalist crimson red and black album cover',
    aspect: 'aspect-square'
  },
  {
    id: 'ai-album-002',
    name: 'Žeja',
    category: 'album',
    placeholder: '/images/placeholders/album-cover-2.jpg',
    prompt: 'Vintage wine glass album artwork',
    aspect: 'aspect-square'
  },
  {
    id: 'ai-album-003',
    name: 'Pivolucija',
    category: 'album',
    placeholder: '/images/placeholders/album-cover-3.jpg',
    prompt: 'Revolution-themed beer album cover',
    aspect: 'aspect-square'
  },
  
  // Band Photos
  {
    id: 'ai-band-001',
    name: 'Band Promo 2026',
    category: 'band',
    placeholder: '/images/placeholders/band-photo-1.jpg',
    prompt: 'Professional rock band stage photo',
    aspect: 'aspect-video'
  },
  {
    id: 'ai-band-002',
    name: 'Live Performance',
    category: 'band',
    placeholder: '/images/placeholders/band-photo-2.jpg',
    prompt: 'Energetic concert performance',
    aspect: 'aspect-video'
  },
  
  // Social Media
  {
    id: 'ai-social-001',
    name: 'Instagram Concert Post',
    category: 'social',
    placeholder: '/images/placeholders/social-1.jpg',
    prompt: 'Instagram square concert announcement',
    aspect: 'aspect-square'
  },
  {
    id: 'ai-social-002',
    name: 'Twitter Header',
    category: 'social',
    placeholder: '/images/placeholders/social-2.jpg',
    prompt: 'Twitter header with crimson gradient',
    aspect: 'aspect-[3/1]'
  },
  
  // Merchandise
  {
    id: 'ai-merch-001',
    name: 'T-Shirt Mockup',
    category: 'merch',
    placeholder: '/images/placeholders/merch-1.jpg',
    prompt: 'Black t-shirt with crimson logo',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'ai-merch-002',
    name: 'Beer Mug Design',
    category: 'merch',
    placeholder: '/images/placeholders/merch-2.jpg',
    prompt: 'Custom beer mug with band logo',
    aspect: 'aspect-square'
  },
  
  // Posters
  {
    id: 'ai-poster-001',
    name: 'Tour 2026 Poster',
    category: 'poster',
    placeholder: '/images/placeholders/poster-1.jpg',
    prompt: 'Tour poster with all dates',
    aspect: 'aspect-[2/3]'
  }
];

export function AIGallery() {
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
            AI GENERIRANE SLIKE
          </h2>
          <p className="text-xl text-text-gray">
            Profesionalne slike ustvarjene z umetno inteligenco
          </p>
          <p className="text-sm text-text-gray mt-2">
            Powered by FLUX, Seedream, Gemini & Grok
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
                {/* Image Placeholder */}
                <div className={`relative ${image.aspect} mb-4 rounded-lg overflow-hidden bg-rock-gray`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-6xl mb-4">🤖</div>
                      <p className="text-sm text-text-gray">
                        AI Image
                      </p>
                      <p className="text-xs text-text-gray mt-2">
                        {image.name}
                      </p>
                    </div>
                  </div>
                  
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
                  <p className="text-sm text-text-gray mb-3">
                    {image.prompt}
                  </p>
                  
                  {/* Generate Button */}
                  <button 
                    className="btn-secondary w-full text-sm py-2"
                    onClick={() => window.open('https://inference.sh', '_blank')}
                  >
                    🤖 Generiraj z AI
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Želiš prave AI generirane slike?
            </h3>
            <p className="text-text-gray mb-6">
              Uporabi inference.sh CLI za generiranje profesionalnih slik
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://inference.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                inference.sh
              </a>
              <a
                href="https://github.com/markec12345678/thedrinkers2026/blob/main/scripts/generate-images.js"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                📜 Generate Script
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
