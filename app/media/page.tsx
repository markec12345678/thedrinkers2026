import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Play } from 'lucide-react';
import { videos } from '@/lib/constants';

// Inline function to avoid import issues
function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

export const metadata: Metadata = {
  title: 'Videi | The Drinkers',
  description: 'Uradni videospoti The Drinkers - Pijemo ga radi, Deset majhnih jagrov, Mafalda in drugi',
};

// Use real videos from lib/constants
const musicVideos = videos.map(video => ({
  ...video,
  embedUrl: getYouTubeEmbedUrl(video.youtubeId),
  watchUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
}));

export default function MediaPage() {
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
            URADNI VIDEOPOSNETKI
          </h1>
          <p className="text-xl text-text-gray">Vsi uradni videospoti The Drinkers</p>
        </div>
      </section>

      {/* Video Section */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            🎬 Glasbena Videospota
          </h2>
          <p className="text-xl text-text-gray text-center mb-12 max-w-3xl mx-auto">
            Uradni videospoti z albumov Lepi in trezni, Žeja, Pivolucija, Prohibicija, Hajdi in Recidiv
          </p>

          {/* Featured Video - Pijemo ga radi (837K views) */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-crimson mb-2">
                🎵 Pijemo ga radi
              </h3>
              <p className="text-text-gray">Lepi in trezni (1995) • 837K+ ogledov</p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-crimson/20">
              <iframe
                src={musicVideos.find(v => v.title === 'Pijemo ga radi')?.embedUrl || ''}
                title="Pijemo ga radi"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicVideos.map((video) => (
              <GlassCard key={video.id} variant="dark" hover className="h-full">
                {/* Video Thumbnail with YouTube Embed Preview */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-rock-gray">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 px-3 py-1 bg-crimson text-white text-xs font-bold rounded uppercase">
                    {video.type}
                  </div>
                  {/* Play Button Overlay */}
                  <a
                    href={video.watchUrl}
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
                  <a
                    href={video.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-crimson hover:underline flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    Odpri na YouTube
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* View All on YouTube */}
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@TheDrinkersSlovenija"
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
