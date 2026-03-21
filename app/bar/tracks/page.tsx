'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { GatedContent } from '@/components/ui/GatedContent';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface Track {
  id: string;
  title: string;
  description: string;
  duration: string;
  tier: 'vip' | 'og';
  audioUrl?: string;
  lyrics?: string;
  recorded: string;
}

const unreleasedTracks: Track[] = [
  // VIP Tracks (2)
  {
    id: 'vip-1',
    title: 'Noč v Litiji (Demo)',
    description: 'Zgodnja demo verzija iz leta 2024',
    duration: '3:45',
    tier: 'vip',
    recorded: 'Studio 14, Ljubljana 2024',
    lyrics: 'Refren:\nNoč v Litiji, polne so mize...\n',
  },
  {
    id: 'vip-2',
    title: 'Zadnji Krog (Acoustic)',
    description: 'Akustična verzija nove skladbe',
    duration: '4:20',
    tier: 'vip',
    recorded: 'Home Studio 2025',
    lyrics: 'Kitica 1:\nZadnji krog, zadnji ples...\n',
  },
  
  // OG Tracks (Unlimited)
  {
    id: 'og-1',
    title: 'Pivska (Unreleased)',
    description: 'Nikoli izdana pivska himna',
    duration: '3:15',
    tier: 'og',
    recorded: 'Orto Bar Live 2025',
    lyrics: 'Refren:\nPivska teče, noč je mlada...\n',
  },
  {
    id: 'og-2',
    title: 'Balkan Express (Studio Outtake)',
    description: 'Izloček iz snemanja albuma',
    duration: '4:50',
    tier: 'og',
    recorded: 'Studio 14, 2024',
    lyrics: 'Kitica 1:\nBalkan Express, vozi me domov...\n',
  },
  {
    id: 'og-3',
    title: 'Slovenec (Live Rehearsal)',
    description: 'Vaja pred koncertom',
    duration: '3:30',
    tier: 'og',
    recorded: 'Rehearsal Space 2025',
    lyrics: 'Refren:\nJaz sem Slovenec, ponosen sem...\n',
  },
  {
    id: 'og-4',
    title: 'Rjava Podmornica (Remix)',
    description: 'Electronic remix klasika',
    duration: '4:00',
    tier: 'og',
    recorded: 'DJ Studio 2025',
    lyrics: 'Instrumental\n',
  },
  {
    id: 'og-5',
    title: 'Za Vse Fane (Thank You)',
    description: 'Posebna zahvala vsem fanom',
    duration: '2:50',
    tier: 'og',
    recorded: 'Backstage 2025',
    lyrics: 'Zahvala:\nZa vse fane, ki ste z nami...\n',
  },
];

export default function UnreleasedTracksPage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [showLyrics, setShowLyrics] = useState<string | null>(null);

  const vipTracks = unreleasedTracks.filter(t => t.tier === 'vip');
  const ogTracks = unreleasedTracks.filter(t => t.tier === 'og');

  return (
    <Section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            NEOBJAVLJENE SKLADBE
          </h1>
          <p className="text-xl text-text-gray">
            Ekskluzivni posnetki samo za člane
          </p>
        </motion.div>

        {/* Now Playing */}
        {currentTrack && (
          <GlassCard variant="dark" className="mb-12 p-6">
            <div className="flex items-center gap-6">
              <div className="text-5xl">💿</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {unreleasedTracks.find(t => t.id === currentTrack)?.title}
                </h3>
                <p className="text-text-gray">
                  {unreleasedTracks.find(t => t.id === currentTrack)?.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setCurrentTrack(null)} variant="secondary">
                  ⏹ STOP
                </Button>
                <Button onClick={() => setShowLyrics(currentTrack)}>
                  📝 BESEDILO
                </Button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* VIP Tracks */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">VIP SKLADBE</h2>
            <span className="px-3 py-1 bg-crimson rounded-full text-xs font-bold uppercase text-white">
              ⭐ {vipTracks.length} skladb
            </span>
          </div>
          
          <GatedContent requiredTier="vip" title="VIP Unreleased Tracks">
            <div className="space-y-4">
              {vipTracks.map((track) => (
                <GlassCard key={track.id} variant="dark" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">💿</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {track.title}
                        </h3>
                        <p className="text-sm text-text-gray mb-1">
                          {track.description}
                        </p>
                        <div className="flex gap-4 text-xs text-text-gray">
                          <span>⏱ {track.duration}</span>
                          <span>📍 {track.recorded}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setCurrentTrack(track.id)}
                        size="sm"
                      >
                        {currentTrack === track.id ? '⏸ PAUZA' : '▶ PREDVAJAJ'}
                      </Button>
                      <Button
                        onClick={() => setShowLyrics(track.id)}
                        size="sm"
                        variant="secondary"
                      >
                        📝
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GatedContent>
        </div>

        {/* OG Tracks */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">OG EKSKLUZIVA</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full text-xs font-bold uppercase text-white">
              👑 {ogTracks.length} skladb
            </span>
          </div>
          
          <GatedContent requiredTier="og" title="OG Exclusive Tracks">
            <div className="space-y-4">
              {ogTracks.map((track) => (
                <GlassCard key={track.id} variant="dark" className="p-6 border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">💿</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-gradient-to-r from-yellow-500 to-amber-500 px-2 py-0.5 rounded text-white font-bold">
                            👑 OG
                          </span>
                          <h3 className="text-xl font-bold text-white">
                            {track.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-gray mb-1">
                          {track.description}
                        </p>
                        <div className="flex gap-4 text-xs text-text-gray">
                          <span>⏱ {track.duration}</span>
                          <span>📍 {track.recorded}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setCurrentTrack(track.id)}
                        size="sm"
                      >
                        {currentTrack === track.id ? '⏸ PAUZA' : '▶ PREDVAJAJ'}
                      </Button>
                      <Button
                        onClick={() => setShowLyrics(track.id)}
                        size="sm"
                        variant="secondary"
                      >
                        📝
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GatedContent>
        </div>

        {/* Lyrics Modal */}
        {showLyrics && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <GlassCard variant="dark" className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Besedilo: {unreleasedTracks.find(t => t.id === showLyrics)?.title}
                </h3>
                <Button onClick={() => setShowLyrics(null)} size="sm" variant="secondary">
                  ✖ ZAPRI
                </Button>
              </div>
              <div className="text-text-gray whitespace-pre-line font-mono">
                {unreleasedTracks.find(t => t.id === showLyrics)?.lyrics || 'Besedilo ni na voljo'}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Stats */}
        <GlassCard variant="dark" className="text-center py-8">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Tvoja Statistika
          </h3>
          <p className="text-text-gray mb-6">
            Preslušal si 0/{unreleasedTracks.length} skladb
          </p>
          <div className="w-full max-w-md mx-auto bg-rock-gray rounded-full h-4 mb-4">
            <div className="bg-gradient-to-r from-crimson to-crimson-light h-4 rounded-full" style={{ width: '0%' }} />
          </div>
          <p className="text-sm text-text-gray">
            Poslušaj več skladb za napredek v članstvu
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}
