import { ImageResponse } from 'next/og';
import { albums } from '@/lib/constants';

// Route segment config
export const runtime = 'edge';

// Generate static params for all albums
export async function generateStaticParams() {
  return albums.map((album) => ({
    id: album.id,
  }));
}

// Image metadata
export const alt = 'Album';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const album = albums.find((a) => a.id === params.id) || albums[0];

  // Load custom font
  const fontData = await fetch(
    new URL('@/public/fonts/Inter-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
          position: 'relative',
          padding: '80px',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 50%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)',
          }}
        />

        {/* Left Side - Album Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Band Name */}
          <div
            style={{
              fontSize: '48px',
              color: '#dc143c',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            THE DRINKERS
          </div>

          {/* Album Title */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: 1.1,
              textShadow: '0 0 40px rgba(220, 20, 60, 0.5)',
            }}
          >
            {album.title}
          </div>

          {/* Year */}
          <div
            style={{
              fontSize: '40px',
              color: '#c0c0c0',
              marginBottom: '30px',
            }}
          >
            Album • {album.year}
          </div>

          {/* Track Count */}
          <div
            style={{
              fontSize: '32px',
              color: '#666666',
            }}
          >
            🎵 {album.tracks.length} pesmi
          </div>
        </div>

        {/* Right Side - Album Artwork Placeholder */}
        <div
          style={{
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #dc143c 0%, #b91030 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(220, 20, 60, 0.4)',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '120px',
            }}
          >
            💿
          </div>
        </div>

        {/* Bottom Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            fontSize: '24px',
            color: '#666666',
            zIndex: 1,
          }}
        >
          thedrinkers.si
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
