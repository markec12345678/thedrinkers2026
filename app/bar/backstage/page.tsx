'use client';

import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { GatedContent } from '@/components/ui/GatedContent';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  tier: 'vip' | 'og';
  videoUrl?: string;
}

const backstageVideos: Video[] = [
  // VIP Videos (5)
  {
    id: 'vip-1',
    title: 'Soundcheck Ljubljana 2025',
    description: 'Zaodrni posnetki pred koncertom v Orto Baru',
    thumbnail: '/images/backstage/soundcheck-ljubljana.jpg',
    duration: '12:34',
    tier: 'vip',
  },
  {
    id: 'vip-2',
    title: 'Backstage Maribor - Pekarna',
    description: 'Srečanje s fani po koncertu',
    thumbnail: '/images/backstage/maribor-backstage.jpg',
    duration: '8:45',
    tier: 'vip',
  },
  {
    id: 'vip-3',
    title: 'Turneja 2025 - Behind The Scenes',
    description: 'Kako izgleda življenje na cesti',
    thumbnail: '/images/backstage/tour-bus.jpg',
    duration: '15:20',
    tier: 'vip',
  },
  {
    id: 'vip-4',
    title: 'Snemanje videospota "Pijemo ga radi"',
    description: 'Ekskluzivni posnetki iz snemanja',
    thumbnail: '/images/backstage/video-shoot.jpg',
    duration: '10:15',
    tier: 'vip',
  },
  {
    id: 'vip-5',
    title: 'Intervju za Radio Slovenija',
    description: 'Pogovor o novi turneji in albumu',
    thumbnail: '/images/backstage/radio-interview.jpg',
    duration: '18:30',
    tier: 'vip',
  },
  
  // OG Videos (Unlimited)
  {
    id: 'og-1',
    title: 'Private Acoustic Session',
    description: 'Ekskluzivni akustični nastop samo za OG člane',
    thumbnail: '/images/backstage/acoustic-session.jpg',
    duration: '25:00',
    tier: 'og',
  },
  {
    id: 'og-2',
    title: 'Meet & Greet Ljubljana',
    description: 'Srečanje s fani pred koncertom',
    thumbnail: '/images/backstage/meet-greet.jpg',
    duration: '20:45',
    tier: 'og',
  },
  {
    id: 'og-3',
    title: 'Studio Session - Recording New Album',
    description: 'Zaodrni posnetki iz studia',
    thumbnail: '/images/backstage/studio.jpg',
    duration: '30:00',
    tier: 'og',
  },
];

export default function BackstageVideosPage() {
  const vipVideos = backstageVideos.filter(v => v.tier === 'vip');
  const ogVideos = backstageVideos.filter(v => v.tier === 'og');

  return (
    <Section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            BACKSTAGE VIDEI
          </h1>
          <p className="text-xl text-text-gray">
            Ekskluzivni zaodrni posnetki samo za člane
          </p>
        </motion.div>

        {/* VIP Videos */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">VIP VIDEI</h2>
            <span className="px-3 py-1 bg-crimson rounded-full text-xs font-bold uppercase text-white">
              ⭐ 5 videov
            </span>
          </div>
          
          <GatedContent requiredTier="vip" title="VIP Backstage Videos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vipVideos.map((video) => (
                <GlassCard key={video.id} variant="dark" className="overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-rock-gray mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="bg-crimson/90 text-white px-6 py-3 rounded-full font-bold hover:bg-crimson transition-colors">
                        ▶ PREDVAJAJ
                      </button>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-text-gray mb-4">
                      {video.description}
                    </p>
                    <button className="w-full btn-secondary text-sm">
                      OGLEJ SI
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GatedContent>
        </div>

        {/* OG Videos */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">OG EKSKLUZIVA</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full text-xs font-bold uppercase text-white">
              👑 3 videi
            </span>
          </div>
          
          <GatedContent requiredTier="og" title="OG Exclusive Videos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ogVideos.map((video) => (
                <GlassCard key={video.id} variant="dark" className="overflow-hidden border-amber-500/30">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-rock-gray mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                      {video.duration}
                    </div>
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-500 px-2 py-1 rounded text-xs font-bold text-white">
                      👑 OG
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold hover:from-yellow-600 hover:to-amber-600 transition-colors">
                        ▶ PREDVAJAJ
                      </button>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-text-gray mb-4">
                      {video.description}
                    </p>
                    <button className="w-full btn-secondary text-sm">
                      OGLEJ SI
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GatedContent>
        </div>

        {/* Progress Info */}
        <GlassCard variant="dark" className="text-center py-8">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Tvoj Napredek
          </h3>
          <p className="text-text-gray mb-6">
            Ogledal si 0/8 videov
          </p>
          <div className="w-full max-w-md mx-auto bg-rock-gray rounded-full h-4 mb-4">
            <div className="bg-gradient-to-r from-crimson to-crimson-light h-4 rounded-full" style={{ width: '0%' }} />
          </div>
          <p className="text-sm text-text-gray">
            Oglej si več videov za napredek v članstvu
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}
