'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function DrinkersBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication (replace with real auth in production)
    if (email && password) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Prosim vnesi email in geslo');
    }
  };

  if (!isAuthenticated) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8"
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🍺</div>
              <h1 className="text-4xl font-bold text-crimson mb-2">DRINKERS&apos; BAR</h1>
              <p className="text-text-gray">Ekskluzivni dostop samo za člane</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="tvoj@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">Geslo</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full">
                PRIJAVI SE
              </Button>

              <div className="text-center text-text-gray text-sm">
                Še nimaš računa?{' '}
                <a href="#" className="text-crimson hover:underline">
                  Registriraj se
                </a>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-text-gray text-sm text-center">
                Dostop do Drinkers&apos; Bar je na voljo samo imetnikom VIP vstopnic in članom fan kluba.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    );
  }

  // Authenticated View
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/bar-hero.jpg"
            alt="Drinkers Bar"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">🍺</div>
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">DRINKERS&apos; BAR</h1>
          <p className="text-xl text-text-gray">Ekskluzivni fan lounge</p>
        </div>
      </section>

      {/* Bar Content */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-crimson mb-4">FAN CHAT</h2>
                <div className="h-96 bg-rock-black/50 rounded-lg p-4 mb-4 overflow-y-auto">
                  {/* Chat messages would go here */}
                  <div className="text-text-gray text-center mt-20">
                    Pridruži se pogovoru z drugimi fani!
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tvoje sporočilo..."
                    className="input-field flex-1"
                  />
                  <Button>POŠLJI</Button>
                </div>
              </div>
            </div>

            {/* Exclusive Content */}
            <div>
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">EKSKLUZIVNO</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-text-gray">
                    <i className="fas fa-music text-crimson" />
                    Neobjavljene skladbe
                  </li>
                  <li className="flex items-center gap-3 text-text-gray">
                    <i className="fas fa-video text-crimson" />
                    Backstage posnetki
                  </li>
                  <li className="flex items-center gap-3 text-text-gray">
                    <i className="fas fa-ticket-alt text-crimson" />
                    Zgodnji dostop do vstopnic
                  </li>
                  <li className="flex items-center gap-3 text-text-gray">
                    <i className="fas fa-gift text-crimson" />
                    Posebne ponudbe
                  </li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-white mb-4">NADGRADI ČLANSTVO</h3>
                <p className="text-text-gray text-sm mb-4">
                  Pridobi dostop do še več ekskluzivnih vsebin z VIP članstvom.
                </p>
                <Button className="w-full" size="sm">
                  VEČ O VIP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Events */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-crimson text-center mb-8">
            EKSKLUZIVNI DOGODKI
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card p-6 flex gap-4">
                <div className="w-32 h-32 bg-rock-gray rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Meet & Greet</h3>
                  <p className="text-text-gray text-sm mb-2">
                    Ekskluzivno srečanje s skupino po koncertu
                  </p>
                  <div className="text-crimson font-bold">Samo za člane</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
