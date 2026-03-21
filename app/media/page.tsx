import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Play, Clock, Calendar, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Podcast & Videi | The Drinkers',
  description: 'Uradni podcast, videi in intervjuji z The Drinkers',
};

const podcastEpisodes = [
  {
    id: 'ep-001',
    title: 'Epizoda 1: Povratek na Oder',
    description: 'Pogovor o prihajajoči turneji in novem albumu.',
    duration: '45:32',
    publishedAt: '2026-03-21',
    audioUrl: '/podcast/ep-001.mp3',
    image: '/images/podcast/ep-001.jpg',
    guests: ['Frontman', 'Guitarist'],
  },
  {
    id: 'ep-002',
    title: 'Epizoda 2: Zakulisje Snemanja',
    description: 'Kako poteka snemanje novega albuma v studiu.',
    duration: '52:18',
    publishedAt: '2026-03-15',
    audioUrl: '/podcast/ep-002.mp3',
    image: '/images/podcast/ep-002.jpg',
    guests: ['Producer', 'Bassist'],
  },
  {
    id: 'ep-003',
    title: 'Epizoda 3: 30 Let Banda',
    description: 'Spomini na začetke in največje trenutke.',
    duration: '68:45',
    publishedAt: '2026-03-01',
    audioUrl: '/podcast/ep-003.mp3',
    image: '/images/podcast/ep-003.jpg',
    guests: ['Vsi člani banda'],
  },
];

const videos = [
  {
    id: 'vid-001',
    title: 'Uradni Videospot: Pivolucija',
    description: 'Uradni videospot za naslovno pesem novega albuma.',
    duration: '4:12',
    publishedAt: '2026-03-20',
    videoUrl: 'https://youtube.com/watch?v=xxx',
    thumbnail: '/images/videos/pivolucija.jpg',
    views: '125K',
    type: 'Music Video',
  },
  {
    id: 'vid-002',
    title: 'Behind The Scenes: Snemanje Albuma',
    description: 'Ekskluziven pogled v studio med snemanjem.',
    duration: '12:34',
    publishedAt: '2026-03-15',
    videoUrl: 'https://youtube.com/watch?v=yyy',
    thumbnail: '/images/videos/bts.jpg',
    views: '45K',
    type: 'Documentary',
  },
  {
    id: 'vid-003',
    title: 'Live at Orto Bar 2025',
    description: 'Celoten koncert iz Orto Bara.',
    duration: '1:32:45',
    publishedAt: '2026-01-01',
    videoUrl: 'https://youtube.com/watch?v=zzz',
    thumbnail: '/images/videos/orto-live.jpg',
    views: '89K',
    type: 'Live Performance',
  },
  {
    id: 'vid-004',
    title: 'Intervju: Na Kavču z The Drinkers',
    description: 'Osebni pogovor o glasbi, življenju in načrtih.',
    duration: '28:15',
    publishedAt: '2026-02-15',
    videoUrl: 'https://youtube.com/watch?v=aaa',
    thumbnail: '/images/videos/interview.jpg',
    views: '32K',
    type: 'Interview',
  },
];

export default function PodcastVideoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-black">
        <div className="absolute inset-0">
          <img
            src="/images/podcast-hero.jpg"
            alt="Podcast & Videos"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-black" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            PODCAST & VIDEO
          </h1>
          <p className="text-xl text-text-gray">Ekskluzivne vsebine iz zákulisja</p>
        </div>
      </section>

      {/* Podcast Section */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            🎙️ The Drinkers Podcast
          </h2>
          <p className="text-xl text-text-gray text-center mb-12 max-w-3xl mx-auto">
            Uradni podcast The Drinkers, kjer vam približamo zakulisje glasbene scene, 
            snemanja albumov in turnej. Vsak teden nova epizoda!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {podcastEpisodes.map((episode) => (
              <GlassCard key={episode.id} variant="dark" hover className="h-full">
                {/* Episode Image */}
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-rock-gray">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <button className="w-16 h-16 bg-crimson rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                </div>

                {/* Episode Info */}
                <div>
                  <div className="flex items-center gap-3 text-xs text-text-gray mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {episode.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {episode.title}
                  </h3>

                  <p className="text-text-gray mb-4 line-clamp-2">
                    {episode.description}
                  </p>

                  {/* Guests */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {episode.guests.map((guest) => (
                      <span
                        key={guest}
                        className="px-2 py-1 bg-crimson/10 text-crimson text-xs rounded"
                      >
                        {guest}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Predvajaj
                    </button>
                    <a
                      href={episode.audioUrl}
                      download
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="text-center">
            <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Naroči se na Podcast
              </h3>
              <p className="text-text-gray mb-6">
                Bodi obveščen o novih epizodah in ekskluzivnih vsebinah
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://open.spotify.com/show/thedrinkers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  🎵 Spotify
                </a>
                <a
                  href="https://podcasts.apple.com/podcast/thedrinkers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  🍎 Apple Podcasts
                </a>
                <a
                  href="https://youtube.com/thedrinkers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  📺 YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Video Section */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            📺 Uradni Videi
          </h2>
          <p className="text-xl text-text-gray text-center mb-12 max-w-3xl mx-auto">
            Uradni videospoti, live posnetki, dokumentarci in intervjuji z The Drinkers
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <GlassCard key={video.id} variant="dark" hover className="h-full">
                {/* Video Thumbnail */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-rock-gray">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 px-3 py-1 bg-crimson text-white text-xs font-bold rounded uppercase">
                    {video.type}
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                    {video.duration}
                  </div>
                  {/* Play Button Overlay */}
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <button className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </button>
                  </a>
                </div>

                {/* Video Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-text-gray mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-text-gray">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {video.publishedAt}
                    </span>
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      {video.views} ogledov
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* View All Videos */}
          <div className="text-center mt-12">
            <a
              href="https://youtube.com/thedrinkers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              📺 Odpri YouTube Kanal
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
