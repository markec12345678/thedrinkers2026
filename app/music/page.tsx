import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SpotifyEmbed } from '@/components/ui/SpotifyEmbed';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { albums } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Glasba',
  description: 'Poslušaj vse albume in videe skupine The Drinkers.',
};

export default function MusicPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/music-hero.jpg"
            alt="Music"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">GLASBA</h1>
          <p className="text-xl text-text-gray">Naši albumi in videi</p>
        </div>
      </section>

      {/* Albums */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-crimson text-center mb-12">DISKOGRAFIJA</h2>
          
          <div className="space-y-16">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                {/* Album Cover */}
                <div className="order-2 lg:order-1">
                  <img
                    src={album.artwork}
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-lg shadow-2xl"
                  />
                </div>

                {/* Album Info */}
                <div className="order-1 lg:order-2 space-y-6">
                  <div>
                    <h3 className="text-4xl font-bold text-crimson mb-2">{album.title}</h3>
                    <p className="text-text-gray text-xl">{album.year}</p>
                  </div>

                  {/* Track List */}
                  <div className="space-y-2">
                    {album.tracks.map((track, index) => (
                      <div
                        key={track.id}
                        className="flex items-center py-3 border-b border-white/10 hover:bg-crimson/10 transition-all duration-300"
                      >
                        <span className="text-crimson font-bold w-8">{index + 1}</span>
                        <span className="flex-1 font-bold">{track.title}</span>
                        <span className="text-text-gray text-sm">{track.duration}</span>
                      </div>
                    ))}
                  </div>

                  {/* Streaming */}
                  <div className="flex gap-4">
                    {album.spotifyUrl && (
                      <a
                        href={album.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-lg hover:bg-crimson-light transition-colors font-bold uppercase"
                      >
                        <i className="fab fa-spotify" />
                        Spotify
                      </a>
                    )}
                    {album.appleMusicUrl && (
                      <a
                        href={album.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-rock-black rounded-lg hover:bg-gray-200 transition-colors font-bold uppercase"
                      >
                        <i className="fab fa-apple" />
                        Apple Music
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Videos */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-crimson text-center mb-12">VIDEO POSNETKI</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.flatMap((album) =>
              album.tracks.slice(0, 2).map((track, idx) => (
                <div key={`${album.id}-${idx}`} className="card overflow-hidden">
                  <VideoPlayer
                    videoId="dQw4w9WgXcQ"
                    title={`${album.title} - ${track.title}`}
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-white">{track.title}</h4>
                    <p className="text-text-gray text-sm">{album.title} ({album.year})</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
