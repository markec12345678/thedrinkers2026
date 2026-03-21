import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/constants';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Dynamic OG image generation for tour pages
export default async function Image({ params }: { params: { id: string } }) {
  // Mock tour data (in production, fetch from database)
  const tourData = {
    city: 'Ljubljana',
    venue: 'Orto Bar',
    date: '15.4.2026',
  };

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

        {/* Glow Effects */}
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

        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        {/* Main Content */}
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
          {/* Music Note Icon */}
          <div
            style={{
              fontSize: '80px',
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 20px rgba(220, 20, 60, 0.6))',
            }}
          >
            🎸
          </div>

          {/* Band Name */}
          <div
            style={{
              fontSize: '70px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              textShadow: '0 0 40px rgba(220, 20, 60, 0.5)',
            }}
          >
            {SITE_CONFIG.name}
          </div>

          {/* Tour Info */}
          <div
            style={{
              fontSize: '40px',
              color: '#dc143c',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            LIVE in {tourData.city}
          </div>

          {/* Venue & Date */}
          <div
            style={{
              fontSize: '32px',
              color: '#c0c0c0',
              textAlign: 'center',
            }}
          >
            {tourData.venue} • {tourData.date}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: '30px',
              fontSize: '28px',
              color: '#ffffff',
              background: 'linear-gradient(90deg, #dc143c, #ff1493)',
              padding: '15px 40px',
              borderRadius: '30px',
              fontWeight: 'bold',
            }}
          >
            GET TICKETS
          </div>
        </div>

        {/* Corner Decorations */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            fontSize: '40px',
            opacity: 0.4,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
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
    }
  );
}
