'use client';

import { useEffect, useState } from 'react';

interface SpotifyEmbedProps {
  spotifyId: string;
  type?: 'track' | 'album' | 'playlist';
  width?: number;
  height?: number;
}

export function SpotifyEmbed({
  spotifyId,
  type = 'track',
  width = 300,
  height = type === 'album' ? 380 : 152,
}: SpotifyEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ width: '100%', maxWidth: width }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-rock-gray animate-pulse rounded-lg" />
      )}
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        allow="encrypted-media"
        loading="lazy"
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        title={`Spotify ${type} embed`}
      />
    </div>
  );
}
