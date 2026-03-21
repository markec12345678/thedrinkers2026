'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Download, ExternalLink, Loader2 } from 'lucide-react';

interface AIGeneratedImage {
  id: string;
  name: string;
  category: 'album' | 'band' | 'social' | 'merch' | 'poster';
  placeholder?: string;
  prompt: string;
  aspect: string;
  generatedUrl?: string;
}

const aiImages: AIGeneratedImage[] = [
  // Albums
  {
    id: 'ai-album-001',
    name: 'Lepi in trezni',
    category: 'album',
    prompt: 'Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, crimson red and black color scheme, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality',
    aspect: '1:1'
  },
  {
    id: 'ai-album-002',
    name: 'Žeja',
    category: 'album',
    prompt: 'Vintage rock album artwork "Žeja" (Thirst), crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, professional music photography, dramatic lighting, square format',
    aspect: '1:1'
  },
  {
    id: 'ai-album-003',
    name: 'Pivolucija',
    category: 'album',
    prompt: 'Revolution-themed album cover "Pivolucija", beer revolution concept, crimson red and silver colors, The Drinkers Slovenian rock band, bold typography, high quality album artwork, 4K resolution',
    aspect: '1:1'
  },

  // Band Photos
  {
    id: 'ai-band-001',
    name: 'Band Promo 2026',
    category: 'band',
    prompt: 'Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments (guitars, bass, drums, microphone), dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography, 16:9 aspect ratio',
    aspect: '16:9'
  },
  {
    id: 'ai-band-002',
    name: 'Live Performance',
    category: 'band',
    prompt: 'The Drinkers live in concert, crowd surfing fan, energetic rock show, crimson stage lights, beer mugs in air, Slovenian flag colors, professional concert photography, dynamic action shot, 16:9',
    aspect: '16:9'
  },

  // Social Media
  {
    id: 'ai-social-001',
    name: 'Instagram Concert Post',
    category: 'social',
    prompt: 'Instagram square post for The Drinkers rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic, bold text space, 1:1 aspect ratio',
    aspect: '1:1'
  },
  {
    id: 'ai-social-002',
    name: 'Twitter Header',
    category: 'social',
    prompt: 'Twitter header banner for The Drinkers rock band, crimson red gradient background, musical notes and beer icons, professional social media design, 1500x500px layout, 3:1 aspect ratio',
    aspect: '3:1'
  },

  // Merchandise
  {
    id: 'ai-merch-001',
    name: 'T-Shirt Mockup',
    category: 'merch',
    prompt: 'Black t-shirt mockup with "Pijemo ga radi" The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready, 4:5 aspect ratio',
    aspect: '4:5'
  },
  {
    id: 'ai-merch-002',
    name: 'Beer Mug Design',
    category: 'merch',
    prompt: 'Custom beer mug with The Drinkers logo engraved, crimson red design, professional product photography, transparent background, studio lighting, merchandise mockup, 1:1',
    aspect: '1:1'
  },

  // Posters
  {
    id: 'ai-poster-001',
    name: 'Tour 2026 Poster',
    category: 'poster',
    prompt: 'Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities (Ljubljana, Maribor, Koper, Zagreb), crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style, 2:3 aspect ratio',
    aspect: '2:3'
  }
];

export function AIGallery() {
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const handleGenerate = async (image: AIGeneratedImage) => {
    setGeneratingId(image.id);
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: image.prompt,
          category: image.category,
          aspect: image.aspect,
          model: 'pollinations-free',
        }),
      });

      const result = await response.json();

      if (result.success && result.imageUrl) {
        setGeneratedImages(prev => ({
          ...prev,
          [image.id]: result.imageUrl,
        }));
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setGeneratingId(null);
    }
  };

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-crimson animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              AI GENERIRANE SLIKE
            </h2>
            <Sparkles className="w-8 h-8 text-crimson animate-pulse" />
          </div>
          <p className="text-xl text-text-gray mb-2">
            Profesionalne slike ustvarjene z umetno inteligenco
          </p>
          <p className="text-sm text-text-gray">
            Powered by FLUX, Seedream, Gemini & Pollinations.ai (FREE)
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiImages.map((image, index) => {
            const generatedUrl = generatedImages[image.id];
            const isGenerating = generatingId === image.id;

            return (
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
                    {generatedUrl ? (
                      <img
                        src={generatedUrl}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
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
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-crimson text-white text-xs font-bold rounded uppercase">
                        {image.category}
                      </span>
                    </div>

                    {/* Loading Overlay */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin text-crimson mx-auto mb-2" />
                          <p className="text-sm text-white">Generating...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {image.name}
                    </h3>
                    <p className="text-sm text-text-gray mb-3 line-clamp-2">
                      {image.prompt}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {!generatedUrl ? (
                        <button
                          className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2"
                          onClick={() => handleGenerate(image)}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              Generate
                            </>
                          )}
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-2"
                            onClick={() => handleDownload(generatedUrl, `${image.name}.jpg`)}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button
                            className="btn-secondary text-sm py-2 px-3"
                            onClick={() => handleGenerate(image)}
                            title="Regenerate"
                          >
                            <Loader2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
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
              Želiš ustvariti svoje AI slike?
            </h3>
            <p className="text-text-gray mb-6">
              Uporabi naš AI Image Generator za ustvarjanje unikatnih vizualov
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/ai-generator"
                className="btn-primary flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                AI Image Generator
              </a>
              <a
                href="https://github.com/markec12345678/thedrinkers2026/blob/main/scripts/generate-images-free.js"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                📜 Free Generate Script
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
