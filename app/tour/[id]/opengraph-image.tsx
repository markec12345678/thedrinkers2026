import { ImageResponse } from 'next/og';
import { TOUR_DATES_MOCK } from '@/lib/constants';

// Route segment config
export const runtime = 'edge';

// Generate static params for all tour dates
export async function generateStaticParams() {
  return TOUR_DATES_MOCK.map((date) => ({
    id: date.id,
  }));
}

// Image metadata
export const alt = 'Koncert';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Format date in Slovenian
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('sl-SI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const tourDate = TOUR_DATES_MOCK.find((d) => d.id === params.id) || TOUR_DATES_MOCK[0];

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            background: 'radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.3) 0%, transparent 60%)',
          }}
        />

        {/* Sold Out Badge */}
        {tourDate.soldOut && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '60px',
              background: '#dc143c',
              color: '#ffffff',
              padding: '20px 40px',
              fontSize: '32px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transform: 'rotate(10deg)',
              boxShadow: '0 10px 30px rgba(220, 20, 60, 0.5)',
              zIndex: 10,
            }}
          >
            RAZPRODANO
          </div>
        )}

        {/* Band Name */}
        <div
          style={{
            fontSize: '56px',
            color: '#dc143c',
            marginBottom: '20px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            zIndex: 1,
          }}
        >
          THE DRINKERS
        </div>

        {/* Live Icon */}
        <div
          style={{
            fontSize: '80px',
            marginBottom: '30px',
            zIndex: 1,
          }}
        >
          🎤 LIVE
        </div>

        {/* City & Venue */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '0 0 40px rgba(220, 20, 60, 0.5)',
            zIndex: 1,
          }}
        >
          {tourDate.city}
        </div>

        <div
          style={{
            fontSize: '48px',
            color: '#c0c0c0',
            marginBottom: '40px',
            zIndex: 1,
          }}
        >
          📍 {tourDate.venue}
        </div>

        {/* Date & Time */}
        <div
          style={{
            fontSize: '40px',
            color: '#ffffff',
            background: 'rgba(220, 20, 60, 0.2)',
            padding: '20px 60px',
            borderRadius: '50px',
            border: '2px solid #dc143c',
            marginBottom: '30px',
            zIndex: 1,
          }}
        >
          📅 {formatDate(tourDate.date)}
        </div>

        {/* Price */}
        {tourDate.price && (
          <div
            style={{
              fontSize: '36px',
              color: '#c0c0c0',
              zIndex: 1,
            }}
          >
            Vstopnica: {tourDate.price}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '28px',
            color: '#666666',
            zIndex: 1,
          }}
        >
          thedrinkers.si/tour
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
