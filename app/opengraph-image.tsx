import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/constants';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = SITE_CONFIG.name;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
          position: 'relative',
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
            background: 'radial-gradient(circle at 30% 50%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)',
          }}
        />

        {/* Glow Effect */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        {/* Logo/Icon */}
        <div
          style={{
            fontSize: '80px',
            marginBottom: '20px',
            zIndex: 1,
          }}
        >
          🎸
        </div>

        {/* Band Name */}
        <div
          style={{
            fontSize: '90px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '-2px',
            zIndex: 1,
            textShadow: '0 0 40px rgba(220, 20, 60, 0.5)',
          }}
        >
          {SITE_CONFIG.name}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '36px',
            color: '#c0c0c0',
            textAlign: 'center',
            maxWidth: '800px',
            zIndex: 1,
          }}
        >
          {SITE_CONFIG.description}
        </div>

        {/* Origin */}
        <div
          style={{
            fontSize: '28px',
            color: '#dc143c',
            marginTop: '30px',
            zIndex: 1,
          }}
        >
          🇸🇮 {SITE_CONFIG.origin}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '24px',
            color: '#666666',
            zIndex: 1,
          }}
        >
          {SITE_CONFIG.url}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
