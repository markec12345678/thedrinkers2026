'use client';

import React from 'react';

/**
 * Email Template Preview Component
 * 
 * Use this to preview email templates in the browser
 * before sending to fans.
 */

export default function EmailPreview() {
  const emails = [
    {
      id: 1,
      name: 'Launch Announcement',
      subject: '🎸 STRAN JE ŽIVA! TheDrinkers.si je tukaj! 🍺',
      preview: 'Po mesecih dela vam predstavljamo...',
      sendDay: 'Day 0',
      goal: 'Welcome + announce',
    },
    {
      id: 2,
      name: 'VIP Bar Access',
      subject: '🍺 Tvoj VIP dostop čaka! (brezplačno)',
      preview: 'Ekskluzivna vsebina, backstage access...',
      sendDay: 'Day 2',
      goal: 'Drive to /bar',
    },
    {
      id: 3,
      name: 'Music Discovery',
      subject: '🎵 Katera pesem si ti? (quiz znotraj)',
      preview: 'Odkrij svoj The Drinkers alter-ego...',
      sendDay: 'Day 4',
      goal: 'Engage with music',
    },
    {
      id: 4,
      name: 'Concert Invitation',
      subject: '🎫 VIDIMO SE NA KONCERTU? (early access)',
      preview: 'Early access do vstopnic te čaka...',
      sendDay: 'Day 7',
      goal: 'Promote concert',
    },
    {
      id: 5,
      name: 'Merch Showcase',
      subject: '👕 NOVA kolekcija je tukaj! (+ tvoj popust)',
      preview: '20% popust + brezplačna dostava...',
      sendDay: 'Day 10',
      goal: 'Drive to merch',
    },
    {
      id: 6,
      name: 'AI Studio Fun',
      subject: '🎨 Ustvari svoj unikaten artwork! (AI Studio)',
      preview: 'Umetna inteligenca + The Drinkers...',
      sendDay: 'Day 14',
      goal: 'Engage with AI',
    },
    {
      id: 7,
      name: 'Community Ask',
      subject: '🤘 Pomagaj nam izboljšati stran!',
      preview: 'Tvoje mnenje nam veliko pomeni...',
      sendDay: 'Day 21',
      goal: 'Build engagement',
    },
  ];

  return (
    <div className="min-h-screen bg-rock-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            EMAIL <span className="text-crimson-500">TEMPLATES</span>
          </h1>
          <p className="text-xl text-gray-400">
            7-dnevna email sekvenca za nove subscriberje
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-rock-gray rounded-xl p-6 border border-crimson-500/20">
            <div className="text-3xl font-bold text-crimson-400 mb-2">7</div>
            <div className="text-gray-400">Emailov</div>
          </div>
          <div className="bg-rock-gray rounded-xl p-6 border border-crimson-500/20">
            <div className="text-3xl font-bold text-crimson-400 mb-2">21</div>
            <div className="text-gray-400">Dni Sekvenca</div>
          </div>
          <div className="bg-rock-gray rounded-xl p-6 border border-crimson-500/20">
            <div className="text-3xl font-bold text-crimson-400 mb-2">5-10%</div>
            <div className="text-gray-400">Pričakovana Konverzija</div>
          </div>
        </div>

        {/* Email List */}
        <div className="space-y-4">
          {emails.map((email, index) => (
            <div
              key={email.id}
              className="bg-rock-gray rounded-xl p-6 border border-rock-border hover:border-crimson-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Email Number */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-crimson-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="text-sm text-crimson-400 font-semibold">
                      {email.sendDay}
                    </div>
                  </div>

                  {/* Email Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-crimson-400 transition-colors">
                    {email.name}
                  </h3>

                  {/* Subject */}
                  <div className="mb-2">
                    <div className="text-sm text-gray-500 mb-1">Subject:</div>
                    <div className="text-gray-300">{email.subject}</div>
                  </div>

                  {/* Preview */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-500 mb-1">Preview:</div>
                    <div className="text-gray-400 italic">{email.preview}</div>
                  </div>

                  {/* Goal */}
                  <div className="inline-block px-3 py-1 bg-crimson-500/10 text-crimson-400 text-sm rounded-full border border-crimson-500/20">
                    🎯 {email.goal}
                  </div>
                </div>

                {/* Arrow */}
                <div className="ml-4">
                  <svg
                    className="w-6 h-6 text-gray-500 group-hover:text-crimson-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-r from-crimson-600 to-red-600 text-white font-bold text-lg px-8 py-4 rounded-full">
            📧 Vsi templati so v EMAIL_TEMPLATES_COMPLETE.md
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="mt-12 bg-rock-gray rounded-xl p-8 border border-rock-border">
          <h2 className="text-2xl font-bold text-white mb-6">
            🛠️ Implementacija
          </h2>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-crimson-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-white">Izberi Email Provider:</strong>{' '}
                Customer.io, Mailchimp, Resend, ali Kit
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-crimson-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-white">Importaj Subscriberje:</strong>{' '}
                CSV format z email, first_name, signup_date
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-crimson-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-white">Nastavi Avtomatizacijo:</strong>{' '}
                Trigger: signup form → Action: add to sequence
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-crimson-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-white">Kopiraj Template:</strong>{' '}
                Odpri EMAIL_TEMPLATES_COMPLETE.md in kopiraj vsebino
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-crimson-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                5
              </div>
              <div>
                <strong className="text-white">Testiraj:</strong> Pošlji testne
                emaile in preveri vse linke
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-crimson-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                6
              </div>
              <div>
                <strong className="text-white">Launchaj:</strong> Aktiviraj
                sekvenco in spremljaj metrike!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
