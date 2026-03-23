'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Section } from '@/components/ui/Section';
import { tourDates } from '@/lib/constants';
import L from 'leaflet';
import { Calendar, MapPin, Ticket } from 'lucide-react';

// Fix for Leaflet markers in Next.js
const fixMarkerIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
};

interface MapCenterProps {
  center: [number, number];
  zoom: number;
}

function MapCenter({ center, zoom }: MapCenterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function InteractiveTourMap() {
  const [isClient, setIsClient] = useState(false);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);

  useEffect(() => {
    fixMarkerIcon();
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] bg-rock-gray rounded-lg animate-pulse" />
    );
  }

  // Custom crimson marker
  const crimsonIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-crimson.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Slovenia center
  const center: [number, number] = [46.1512, 14.9955];

  return (
    <Section background="darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-crimson mb-4">
            🗺️ Turneja 2026
          </h2>
          <p className="text-xl text-text-gray max-w-2xl mx-auto">
            Interaktivni zemljevid vseh koncertov The Drinkers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <MapPin className="w-8 h-8 text-crimson mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{tourDates.length}</div>
            <div className="text-text-gray">Lokacij</div>
          </div>
          <div className="card p-6 text-center">
            <Calendar className="w-8 h-8 text-crimson mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {tourDates.filter(d => new Date(d.date) > new Date()).length}
            </div>
            <div className="text-text-gray">Prihajajočih</div>
          </div>
          <div className="card p-6 text-center">
            <Ticket className="w-8 h-8 text-crimson mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {tourDates.filter(d => d.soldOut).length}
            </div>
            <div className="text-text-gray">Razprodanih</div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border-2 border-crimson/30 shadow-2xl shadow-crimson/20">
          <MapContainer
            key="tour-map"
            center={center}
            zoom={8}
            scrollWheelZoom={true}
            className="w-full h-[600px]"
            style={{ background: '#1a1a1a' }}
          >
            <MapCenter center={center} zoom={8} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {tourDates.filter(show => show.coordinates).map((show) => (
              <Marker
                key={show.id}
                position={[show.coordinates![0], show.coordinates![1]]}
                icon={crimsonIcon}
                eventHandlers={{
                  click: () => setSelectedShow(show.id),
                }}
              >
                <Popup>
                  <div className="text-rock-black min-w-[200px]">
                    <h4 className="font-bold text-crimson text-lg mb-2">{show.venue}</h4>
                    <p className="text-sm mb-1">📍 {show.city}, {show.country}</p>
                    <p className="text-sm mb-2">📅 {new Date(show.date).toLocaleDateString('sl-SI')}</p>
                    {show.soldOut ? (
                      <span className="inline-block px-3 py-1 bg-gray-600 text-white text-xs font-bold rounded">
                        RAZPRODANO
                      </span>
                    ) : (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-crimson text-white text-xs font-bold rounded hover:bg-crimson/80 transition-colors"
                      >
                        VSTOPNICE
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* List View */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tourDates.map((show, index) => (
            <div
              key={show.id}
              className={`card p-4 cursor-pointer transition-all ${
                selectedShow === show.id ? 'border-crimson bg-crimson/10' : 'hover:border-crimson/50'
              }`}
              onClick={() => setSelectedShow(show.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">{show.venue}</h4>
                {show.soldOut && (
                  <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                    RAZPRODANO
                  </span>
                )}
              </div>
              <div className="text-text-gray text-sm space-y-1">
                <p>📍 {show.city}</p>
                <p>📅 {new Date(show.date).toLocaleDateString('sl-SI')}</p>
                <p>💰 {show.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
