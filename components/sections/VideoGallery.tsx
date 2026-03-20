'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  type: 'official' | 'live' | 'acoustic';
}

// The Drinkers official videos from YouTube
const videos: Video[] = [
  {
    id: 'video-001',
    title: 'Pijemo ga radi',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual ID
    thumbnail: '/images/videos/pijemo-ga-radi.jpg',
    type: 'official',
  },
  {
    id: 'video-002',
    title: 'Deset majhnih jagrov',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/deset-majhnih-jagrov.jpg',
    type: 'official',
  },
  {
    id: 'video-003',
    title: 'Rjava podmornica',
    youtubeId: 'CJrYJEybU-E',
    thumbnail: '/images/videos/rjava-podmornica.jpg',
    type: 'official',
  },
  {
    id: 'video-004',
    title: 'BOSTEN',
    youtubeId: 'oKa8Y_rwhD0',
    thumbnail: '/images/videos/bosten.jpg',
    type: 'official',
  },
  {
    id: 'video-005',
    title: 'Ko Tamo Peva',
    youtubeId: '7HHx9c3YnMQ',
    thumbnail: '/images/videos/ko-tamo-peva.jpg',
    type: 'live',
  },
  {
    id: 'video-006',
    title: 'Alkohol je moj idol',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/alkohol-idol.jpg',
    type: 'official',
  },
];

export function VideoGallery() {
  return (
    <section className="py-20 bg-rock-dark">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            URADNI VIDEI
          </h2>
          <p className="text-xl text-text-gray">
            The Drinkers - Rock'n'roll iz srca Slovenije
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard variant="dark" hover floating={index % 2 === 0}>
                {/* YouTube Embed */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      video.type === 'official' 
                        ? 'bg-crimson text-white' 
                        : 'bg-silver text-rock-black'
                    }`}>
                      {video.type === 'official' ? 'Uradno' : 'V živo'}
                    </span>
                    <span className="text-text-gray text-sm">
                      The Drinkers
                    </span>
                  </div>
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
          <a
            href="https://www.youtube.com/@thedrinkersslovenija"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Oglej si več na YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
