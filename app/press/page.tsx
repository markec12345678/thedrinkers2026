'use client';

import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export default function PressPage() {
  const resources = [
    {
      icon: '📰',
      title: 'Press Release',
      description: 'Official press release in Slovenian and English',
      items: ['Slovenian version', 'English version', 'Email templates'],
    },
    {
      icon: '📷',
      title: 'High-Res Photos',
      description: 'Professional photos for publication',
      items: ['Band photos (300 DPI)', 'Logo pack (SVG, PNG)', 'Concert photos', 'Behind the scenes'],
    },
    {
      icon: '🎬',
      title: 'Video Assets',
      description: 'B-roll and video content',
      items: ['Concert footage', 'Interview clips', 'Behind the scenes', 'Music videos'],
    },
    {
      icon: '📊',
      title: 'Media Kit',
      description: 'Complete brand assets',
      items: ['Band biography', 'Fact sheet', 'Logo guidelines', 'Brand colors'],
    },
  ];

  const contacts = [
    {
      id: 'media-relations',
      name: '[IME PRIIMEK]',
      role: 'Media Relations',
      email: 'media@thedrinkers.si',
      phone: '+386 40 123 456',
    },
    {
      id: 'band-management',
      name: '[IME PRIIMEK]',
      role: 'Band Management',
      email: 'management@thedrinkers.si',
      phone: '+386 40 234 567',
    },
  ];

  const stats = [
    { value: '30+', label: 'Years of Career' },
    { value: '7', label: 'Studio Albums' },
    { value: '500+', label: 'Concerts' },
    { value: '100K+', label: 'Expected Annual Visits' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <Section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              📰 Press & Media
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Resources for journalists, bloggers, and media professionals
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-crimson-600 hover:bg-crimson-700 text-white px-8 py-4">
                📥 Download Press Release
              </Button>
              <Button variant="outline" className="border-crimson-600 text-crimson-400 hover:bg-crimson-950 px-8 py-4">
                📷 Download Media Kit
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-crimson-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Resources */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            📦 Media Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <GlassCard key={resource.title} className="p-6">
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {resource.description}
                </p>
                <ul className="space-y-1">
                  {resource.items.map((item) => (
                    <li key={item} className="text-gray-300 text-sm flex items-center">
                      <span className="text-crimson-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-crimson-600 hover:bg-crimson-700 text-white">
                  Download
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Press Release Preview */}
      <Section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            📰 Latest Press Release
          </h2>

          <div className="bg-black rounded-lg p-8 border border-gray-800">
            <div className="text-crimson-500 text-sm font-bold mb-4">
              FOR IMMEDIATE RELEASE
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              🎸 THE DRINKERS LAUNCH REVOLUTIONARY WEBSITE
            </h3>
            <p className="text-gray-400 mb-6">
              First Slovenian Rock Band with AI-Powered Fan Experience
            </p>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                <strong>LITIJA, SLOVENIA</strong> – Legendary Slovenian rock band 
                The Drinkers today launches the completely redesigned website{' '}
                <strong>thedrinkers.si</strong>, setting new standards for music 
                websites in the region with AI-powered fan experiences, VIP areas, 
                and interactive concert history.
              </p>

              <blockquote className="border-l-4 border-crimson-600 pl-4 my-6 italic text-gray-300">
                &quot;We wanted to create something that&apos;s not just a website, but a 
                true digital experience for our fans.&quot;
              </blockquote>

              <p className="text-gray-300">
                The website features include VIP &quot;Drinkers Bar&quot; with AI bots, 
                AI Studio for fan artwork generation, interactive map of all 
                concerts from 1993-2026, and fully integrated merch store.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-crimson-600 hover:bg-crimson-700 text-white">
                📥 Download Full Release (SLO)
              </Button>
              <Button className="bg-crimson-600 hover:bg-crimson-700 text-white">
                📥 Download Full Release (ENG)
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            📞 Media Contacts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map((contact) => (
              <GlassCard key={contact.id} className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {contact.name}
                </h3>
                <p className="text-crimson-400 mb-4">{contact.role}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">📧</span>
                    <a href={`mailto:${contact.email}`} className="hover:text-crimson-400">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">📱</span>
                    <a href={`tel:${contact.phone}`} className="hover:text-crimson-400">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Schedule Interview
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            ❓ FAQ for Media
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I use The Drinkers logo in my article?',
                a: 'Yes! Download our media kit which includes logo files in various formats (SVG, PNG) with usage guidelines.',
              },
              {
                q: 'Are interview opportunities available?',
                a: 'Yes! Contact our media relations team at media@thedrinkers.si to schedule interviews with band members.',
              },
              {
                q: 'Can I get high-resolution photos?',
                a: 'Absolutely! All press photos are available for download in our media resources section (300 DPI, print-ready).',
              },
              {
                q: 'Is there video content available?',
                a: 'Yes, we have B-roll footage, concert recordings, and behind-the-scenes content available for media use.',
              },
            ].map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need More Information?
            </h2>
            <p className="text-gray-400 mb-8">
              Our media team is ready to help you with any questions or requests.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-crimson-600 hover:bg-crimson-700 text-white px-8 py-4">
                📧 Contact Media Team
              </Button>
              <Button variant="outline" className="border-crimson-600 text-crimson-400 hover:bg-crimson-950 px-8 py-4">
                🌐 Visit Main Website
              </Button>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
