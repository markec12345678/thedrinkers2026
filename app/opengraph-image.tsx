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

// AI-generated background URL (using Pollinations.ai - FREE)
const AI_BACKGROUND_PROMPT = encodeURIComponent(
  'Professional rock band background, crimson red and black gradient, stage lighting, concert atmosphere, abstract music waves, high contrast, dramatic lighting, 4K quality'
);
const AI_BACKGROUND_URL = `https://image.pollinations.ai/prompt/${AI_BACKGROUND_PROMPT}?width=1200&height=630&model=flux&nologo=true&seed=42`;

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
          background: `url(${AI_BACKGROUND_URL}) center/cover`,
          position: 'relative',
        }}
      >
        {/* Overlay for better text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.85) 0%, rgba(26, 10, 10, 0.75) 50%, rgba(10, 10, 10, 0.85) 100%)',
          }}
        />

        {/* Crimson Glow Effect - Top */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.5) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />

        {/* Crimson Glow Effect - Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        {/* Decorative Music Elements */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            fontSize: '120px',
            opacity: 0.2,
            transform: 'rotate(15deg)',
          }}
        >
          🎸
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            fontSize: '100px',
            opacity: 0.2,
            transform: 'rotate(-15deg)',
          }}
        >
          🍺
        </div>

        {/* Main Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            padding: '40px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              fontSize: '100px',
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 20px rgba(220, 20, 60, 0.6))',
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
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '-3px',
              textAlign: 'center',
              textShadow: '0 0 60px rgba(220, 20, 60, 0.8), 0 0 30px rgba(255, 255, 255, 0.3)',
              background: 'linear-gradient(180deg, #ffffff 0%, #dc143c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {SITE_CONFIG.name}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '38px',
              color: '#c0c0c0',
              textAlign: 'center',
              maxWidth: '900px',
              marginBottom: '20px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            {SITE_CONFIG.description}
          </div>

          {/* Origin with Flag */}
          <div
            style={{
              fontSize: '32px',
              color: '#dc143c',
              marginTop: '20px',
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(220, 20, 60, 0.5)',
            }}
          >
            🇸🇮 {SITE_CONFIG.origin} • Slovenian Rock Legends
          </div>

          {/* Decorative Line */}
          <div
            style={{
              width: '300px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent 0%, #dc143c 50%, transparent 100%)',
              marginTop: '30px',
              marginBottom: '20px',
            }}
          />

          {/* Footer with URL */}
          <div
            style={{
              fontSize: '26px',
              color: '#999999',
              marginTop: '10px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            {SITE_CONFIG.url}
          </div>
        </div>

        {/* Corner Decorations */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
      </div>
    ),
    {
      ...size,
      // Use higher quality encoding
      quality: 90,
    }
  );
}
