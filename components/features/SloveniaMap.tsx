'use client';

import { useEffect, useState, useId, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { tourDates } from '@/lib/constants';
import L from 'leaflet';

export function SloveniaMap() {
  const uniqueId = useId();
  const [isClient, setIsClient] = useState(false);
  const [crimsonIcon, setCrimsonIcon] = useState<L.Icon | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Mark as mounted
    setMounted(true);

    // Fix for default marker icon in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Custom crimson marker icon
    const icon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-crimson.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    setCrimsonIcon(icon);
    setIsClient(true);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  if (!isClient || !crimsonIcon || !mounted) {
    return (
      <div className="w-full h-[500px] bg-rock-gray rounded-lg animate-pulse" />
    );
  }

  // Slovenia coordinates
  const center: [number, number] = [46.1512, 14.9955];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-crimson/30">
      <MapContainer
        key={`map-${uniqueId}-${mounted ? 'ready' : 'loading'}`}
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: '#1a1a1a' }}
        fadeAnimation={true}
        zoomAnimation={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {tourDates.map((show) => {
          if (!show.coordinates) return null;
          return (
            <Marker
              key={show.id}
              position={[show.coordinates[0], show.coordinates[1]]}
              icon={crimsonIcon}
            >
              <Popup>
                <div className="text-rock-black">
                  <strong className="text-crimson">{show.venue}</strong>
                  <br />
                  {show.city}
                  <br />
                  {new Date(show.date).toLocaleDateString('sl-SI')}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
