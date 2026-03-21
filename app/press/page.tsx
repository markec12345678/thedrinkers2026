import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { generatePressReleaseSchema } from '@/lib/blog-schema';
import { JsonLd } from '@/lib/seo';
import Link from 'next/link';
import { Mail, Phone, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Press Kit | The Drinkers',
  description: 'Uradni press materiali za medije - sporočila za javnost, fotografije, kontakti',
};

const pressReleases = [
  {
    id: 'tour-2026-announcement',
    title: 'The Drinkers Napovedujejo Povratniško Turnejo 2026',
    summary: 'Po dveh letih premora se legendarna slovenska rock skupina vrača z veliko turnejo.',
    date: '2026-03-21',
    category: 'Tour Announcement',
    downloadUrl: '/press/tour-2026.pdf',
  },
  {
    id: 'new-album-2026',
    title: 'Nov Album "Pivolucija" Na Voljo Aprila 2026',
    summary: 'The Drinkers snemajo nov studijski album z 12 novimi pesmimi.',
    date: '2026-03-15',
    category: 'Album Release',
    downloadUrl: '/press/album-2026.pdf',
  },
  {
    id: 'vip-lounge-launch',
    title: 'The Drinkers Odpirajo VIP Lounge za Fane',
    summary: 'Ekskluzivni fan club z dostopom do backstagea, vstopnic in mercha.',
    date: '2026-03-10',
    category: 'Fan Club',
    downloadUrl: '/press/vip-lounge.pdf',
  },
];

const mediaAssets = [
  {
    type: 'Photos',
    items: [
      { name: 'Band Photo 2026', url: '/images/press/band-2026.jpg', size: '5.2 MB' },
      { name: 'Live Photo Orto Bar', url: '/images/press/live-orto.jpg', size: '4.8 MB' },
      { name: 'Album Cover Pivolucija', url: '/images/press/album-cover.jpg', size: '3.1 MB' },
    ],
  },
  {
    type: 'Logos',
    items: [
      { name: 'The Drinkers Logo (PNG)', url: '/images/press/logo.png', size: '1.2 MB' },
      { name: 'The Drinkers Logo (SVG)', url: '/images/press/logo.svg', size: '0.3 MB' },
      { name: 'The Drinkers Logo (Black)', url: '/images/press/logo-black.png', size: '1.1 MB' },
    ],
  },
  {
    type: 'Videos',
    items: [
      { name: 'Official Music Video 2026', url: '/videos/press/video-2026.mp4', size: '125 MB' },
      { name: 'Behind The Scenes', url: '/videos/press/bts-2026.mp4', size: '89 MB' },
      { name: 'Interview 2026', url: '/videos/press/interview-2026.mp4', size: '156 MB' },
    ],
  },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-black">
        <div className="absolute inset-0">
          <img
            src="/images/press-hero.jpg"
            alt="Press"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-black" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">PRESS KIT</h1>
          <p className="text-xl text-text-gray">Uradni materiali za medije</p>
        </div>
      </section>

      {/* Contact Info */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <GlassCard variant="crimson" className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Kontakt za Medije
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Email</h3>
                </div>
                <a href="mailto:press@thedrinkers.si" className="text-2xl text-crimson hover:text-crimson-light">
                  press@thedrinkers.si
                </a>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Telefon</h3>
                </div>
                <a href="tel:+38640123456" className="text-2xl text-crimson hover:text-crimson-light">
                  +386 40 123 456
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Press Releases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Sporočila za Javnost
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <GlassCard key={release.id} variant="dark" className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-crimson/20 text-crimson text-xs font-bold rounded uppercase">
                          {release.category}
                        </span>
                        <span className="text-sm text-text-gray">
                          {release.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {release.title}
                      </h3>
                      <p className="text-text-gray mb-4">
                        {release.summary}
                      </p>
                      <Link
                        href={`/press/${release.id}`}
                        className="text-crimson hover:text-crimson-light font-medium"
                      >
                        Preberi več →
                      </Link>
                    </div>
                    <a
                      href={release.downloadUrl}
                      className="flex items-center gap-2 px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson-light transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Media Assets */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Medijski Materiali
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {mediaAssets.map((asset) => (
                <GlassCard key={asset.type} variant="dark" className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {asset.type}
                  </h3>
                  <ul className="space-y-3">
                    {asset.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-text-gray hover:text-white transition-colors"
                        >
                          <span className="text-sm">{item.name}</span>
                          <span className="text-xs text-crimson">{item.size}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Band Bio */}
          <GlassCard variant="dark" className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              O Bandu
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-text-gray">
                The Drinkers so slovenska rock skupina iz Litije, ustanovljena leta 1993. 
                V več kot 30 letih delovanja so izdali 10 studijskih albumov in postali 
                ena najbolj prepoznavnih rock skupin v Sloveniji.
              </p>
              <p className="text-lg text-text-gray">
                Znani so po energičnih koncertih, iskrenih besedilih in prepoznavnem 
                zvoku, ki združuje klasični rock z modernimi elementi. Njihovi največji 
                hiti vključujejo "Pijemo ga radi", "Lepi in trezni", "Pivolucija" in 
                številne druge.
              </p>
              <p className="text-lg text-text-gray">
                Skupina še vedno redno nastopa po Sloveniji in regiji, ter vsako leto 
                izda nov album. Leta 2026 pripravljajo veliko povratniško turnejo po 
                dveh letih premora.
              </p>
            </div>
          </GlassCard>

          {/* FAQ for Media */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              Pogosta Vprašanja za Medije
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Kdaj je na voljo nov album?
                </h3>
                <p className="text-text-gray">
                  Nov album "Pivolucija" bo na voljo aprila 2026 na vseh streaming 
                  platformah in v fizični obliki.
                </p>
              </GlassCard>
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Kako rezervirati intervju?
                </h3>
                <p className="text-text-gray">
                  Za intervjuje in medijska vprašanja pišite na press@thedrinkers.si. 
                  Odgovorimo v 24-48 urah.
                </p>
              </GlassCard>
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Kje so na voljo fotografije?
                </h3>
                <p className="text-text-gray">
                  Vse uradne fotografije so na voljo v zgornjem razdelku "Medijski 
                  Materiali". Uporaba je dovoljena za medijske namene.
                </p>
              </GlassCard>
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Kako pridobim akreditacijo za koncert?
                </h3>
                <p className="text-text-gray">
                  Akreditacije za medije so na voljo za vse koncerte. Pišite na 
                  press@thedrinkers.si z informacijami o mediju in namenom.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
