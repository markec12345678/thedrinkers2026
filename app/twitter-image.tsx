import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/constants';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = SITE_CONFIG.name;
export const size = {
  width: 1200,
  height: 675, // Twitter summary card aspect ratio
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
          background: 'linear-gradient(135deg, #1da1f2 0%, #0a0a0a 50%, #1a0a0a 100%)',
          position: 'relative',
        }}
      >
        {/* Twitter Branding */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '60px',
            fontSize: '48px',
            color: '#1da1f2',
            fontWeight: 'bold',
          }}
        >
          🐦 Twitter
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Emoji */}
          <div
            style={{
              fontSize: '120px',
              marginBottom: '30px',
            }}
          >
            🎸
          </div>

          {/* Band Name */}
          <div
            style={{
              fontSize: '100px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              textShadow: '0 0 60px rgba(220, 20, 60, 0.6)',
            }}
          >
            {SITE_CONFIG.name}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '42px',
              color: '#c0c0c0',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {SITE_CONFIG.description}
          </div>

          {/* Origin */}
          <div
            style={{
              fontSize: '36px',
              color: '#dc143c',
              marginTop: '40px',
              fontWeight: 'bold',
            }}
          >
            🇸🇮 {SITE_CONFIG.origin} • Est. {SITE_CONFIG.inception}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            display: 'flex',
            gap: '40px',
            fontSize: '28px',
            color: '#666666',
            zIndex: 1,
          }}
        >
          <span>thedrinkers.si</span>
          <span>•</span>
          <span>Rock&apos;n&apos;Roll</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
