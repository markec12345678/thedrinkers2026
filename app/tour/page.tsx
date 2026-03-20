'use client';

import dynamic from 'next/dynamic';
import { Section } from '@/components/ui/Section';

const TourCalendar = dynamic(() => import('@/components/sections/TourCalendar').then(mod => mod.TourCalendar), { ssr: false });
const SloveniaMap = dynamic(() => import('@/components/features/SloveniaMap').then(mod => mod.SloveniaMap), { ssr: false });

export default function TourPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/tour-hero.jpg"
            alt="Tour"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">KONCERTI</h1>
          <p className="text-xl text-text-gray">Pridi nas gledat v živo!</p>
        </div>
      </section>

      {/* Tour Dates */}
      <TourCalendar />

      {/* Interactive Map */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-crimson text-center mb-8">ZEMLJEVID KONCERTOV</h2>
          <SloveniaMap />
        </div>
      </Section>
    </>
  );
}
