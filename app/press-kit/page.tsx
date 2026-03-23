'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Download, Image, FileText, Music, Video } from 'lucide-react';

const pressKitItems = [
  {
    id: 'photos',
    title: 'High-Res Fotografije',
    description: 'Profesionalne fotografije banda v visoki ločljivosti',
    icon: Image,
    files: [
      { name: 'band-photo-1.jpg', size: '15.2 MB', type: 'image/jpeg' },
      { name: 'band-photo-2.jpg', size: '12.8 MB', type: 'image/jpeg' },
      { name: 'band-photo-3.jpg', size: '14.1 MB', type: 'image/jpeg' },
      { name: 'live-concert-1.jpg', size: '18.5 MB', type: 'image/jpeg' },
      { name: 'live-concert-2.jpg', size: '16.3 MB', type: 'image/jpeg' },
    ],
  },
  {
    id: 'bio',
    title: 'Biografija',
    description: 'Uradna biografija banda v slovenskem in angleškem jeziku',
    icon: FileText,
    files: [
      { name: 'bio-slovenian.pdf', size: '2.1 MB', type: 'application/pdf' },
      { name: 'bio-english.pdf', size: '2.3 MB', type: 'application/pdf' },
    ],
  },
  {
    id: 'logos',
    title: 'Logotipi',
    description: 'Uradni logotipi The Drinkers v različnih formatih',
    icon: Image,
    files: [
      { name: 'logo-primary.png', size: '1.2 MB', type: 'image/png' },
      { name: 'logo-secondary.png', size: '0.9 MB', type: 'image/png' },
      { name: 'logo-vector.svg', size: '0.3 MB', type: 'image/svg+xml' },
      { name: 'logo-icon.png', size: '0.5 MB', type: 'image/png' },
    ],
  },
  {
    id: 'music',
    title: 'Glasba',
    description: 'Največji hiti in najnovejše pesmi',
    icon: Music,
    files: [
      { name: 'pijemo-ga-radi.mp3', size: '8.5 MB', type: 'audio/mpeg' },
      { name: 'lepi-in-trezni.mp3', size: '9.2 MB', type: 'audio/mpeg' },
      { name: 'zeja.mp3', size: '8.8 MB', type: 'audio/mpeg' },
    ],
  },
  {
    id: 'videos',
    title: 'Video Posnetki',
    description: 'Uradni videospoti in live posnetki',
    icon: Video,
    files: [
      { name: 'pijemo-ga-radi-video.mp4', size: '125.5 MB', type: 'video/mp4' },
      { name: 'lepi-in-trezni-video.mp4', size: '118.2 MB', type: 'video/mp4' },
      { name: 'live-at-orto-bar.mp4', size: '245.8 MB', type: 'video/mp4' },
    ],
  },
  {
    id: 'album-art',
    title: 'Album Covers',
    description: 'Uradne naslovnice vseh albumov',
    icon: Image,
    files: [
      { name: 'lepi-in-trezni-cover.jpg', size: '5.2 MB', type: 'image/jpeg' },
      { name: 'zeja-cover.jpg', size: '4.8 MB', type: 'image/jpeg' },
      { name: 'pivolucija-cover.jpg', size: '5.5 MB', type: 'image/jpeg' },
      { name: 'hajdi-cover.jpg', size: '5.1 MB', type: 'image/jpeg' },
      { name: 'recidiv-cover.jpg', size: '5.3 MB', type: 'image/jpeg' },
    ],
  },
];

export function PressKitPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleDownloadAll = () => {
    // In production, create a ZIP file
    alert('V pripravi... Prenos celotnega press kita bo na voljo kmalu!');
  };

  const handleDownloadFile = (fileName: string) => {
    // In production, trigger file download
    console.log('Downloading:', fileName);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-rock-black">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-bg.webp"
            alt="Press Kit"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-black" />
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
              PRESS KIT
            </h1>
            <p className="text-xl text-text-gray max-w-2xl mx-auto">
              Uradni materiali za medije in novinarje
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-crimson mb-2">33</div>
              <div className="text-text-gray">Let na sceni</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-crimson mb-2">7</div>
              <div className="text-text-gray">Studijskih albumov</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-crimson mb-2">500+</div>
              <div className="text-text-gray">Odigranih koncertov</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-crimson mb-2">1993</div>
              <div className="text-text-gray">Leto ustanovitve</div>
            </div>
          </div>

          {/* Band Info */}
          <GlassCard variant="dark" className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">O The Drinkers</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-gray text-lg leading-relaxed">
                The Drinkers so slovenska rock skupina, ustanovljena leta 1993 v Litiji. 
                Znani so po energičnih koncertih, iskrenih besedilih in neponovljivem odru. 
                Skupina je izdala 7 studijskih albumov in odigrala več kot 500 koncertov 
                po Sloveniji in regiji.
              </p>
              <p className="text-text-gray text-lg leading-relaxed mt-4">
                Njihovi največji hiti vključujejo &quot;Pijemo ga radi&quot;, &quot;Lepi in trezni&quot;, 
                &quot;Žeja&quot; in &quot;Mafalda&quot;. Skupina še vedno aktivno nastopa in snema novo glasbo.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button onClick={handleDownloadAll} size="lg">
                <Download className="w-5 h-5 mr-2" />
                Prenesi Celoten Press Kit (ZIP, 2.5 GB)
              </Button>
              <Button variant="secondary" size="lg">
                📧 Kontaktiraj za Medije
              </Button>
            </div>
          </GlassCard>

          {/* Press Kit Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressKitItems.map((category) => (
              <GlassCard
                key={category.id}
                variant="dark"
                className="cursor-pointer hover:border-crimson/50 transition-all"
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-crimson/20 rounded-lg flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-crimson" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-text-gray text-sm">
                      {category.files.length} datotek
                    </p>
                  </div>
                </div>
                <p className="text-text-gray text-sm mb-4">
                  {category.description}
                </p>

                {/* File List */}
                {selectedCategory === category.id && (
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {category.files.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between p-3 bg-rock-black/50 rounded-lg hover:bg-crimson/10 transition-colors cursor-pointer"
                        onClick={() => handleDownloadFile(file.name)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-crimson" />
                          <div>
                            <div className="text-white text-sm font-bold">
                              {file.name}
                            </div>
                            <div className="text-text-gray text-xs">
                              {file.size}
                            </div>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-text-gray hover:text-white" />
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            ))}
          </div>

          {/* Contact Info */}
          <GlassCard variant="dark" className="mt-12 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Kontakt za Medije
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-crimson mb-4">
                  Management
                </h3>
                <div className="space-y-2 text-text-gray">
                  <p>📧 management@thedrinkers.si</p>
                  <p>📞 +386 40 123 456</p>
                  <p>📍 Litija, Slovenija</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-crimson mb-4">
                  Press & PR
                </h3>
                <div className="space-y-2 text-text-gray">
                  <p>📧 press@thedrinkers.si</p>
                  <p>📞 +386 40 789 012</p>
                  <p>💬 @thedrinkers (Social Media)</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
