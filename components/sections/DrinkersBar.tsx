'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client';

export function DrinkersBar() {
  const { data: session, isPending } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const result = await signIn.email({
          email,
          password,
          callbackURL: '/bar',
        });

        if (result.error) {
          setError(result.error.message || 'Login failed');
        }
      } else {
        // Register
        const result = await signUp.email({
          email,
          password,
          name,
          callbackURL: '/bar',
        });

        if (result.error) {
          setError(result.error.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Loading state
  if (isPending) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍺</div>
          <p className="text-text-gray">Loading Drinkers' Bar...</p>
        </div>
      </Section>
    );
  }

  // Authenticated View
  if (!session) {
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
              <h1 className="text-4xl font-bold text-crimson mb-2">
                DRINKERS&apos; BAR
              </h1>
              <p className="text-text-gray">
                Ekskluzivni dostop samo za člane
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleAuth}
                className="space-y-6"
              >
                {!isLogin && (
                  <div>
                    <label className="block text-white font-bold mb-2">
                      Ime
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      placeholder="Tvoje ime"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-white font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="tvoj@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">
                    Geslo
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                    minLength={8}
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Prosimo počakaj...' : isLogin ? 'PRIJAVI SE' : 'REGISTRIRAJ SE'}
                </Button>

                <div className="text-center text-text-gray text-sm">
                  {isLogin ? (
                    <>
                      Še nimaš računa?{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-crimson hover:underline"
                      >
                        Registriraj se
                      </button>
                    </>
                  ) : (
                    <>
                      Že imaš račun?{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="text-crimson hover:underline"
                      >
                        Prijavi se
                      </button>
                    </>
                  )}
                </div>

                {/* Social Login */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-text-gray">Ali nadaljuj z</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => signIn.social({ provider: 'google' })}
                    className="w-full"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => signIn.social({ provider: 'discord' })}
                    className="w-full"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discord
                  </Button>
                </div>
              </motion.form>
            </AnimatePresence>

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

  // Get user tier
  const userTier = (session.user as any)?.membershipTier || 'free';

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
