'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmailCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailCapturePopup({ isOpen, onClose }: EmailCapturePopupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setEmail('');
          setName('');
        }, 3000);
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-rock-dark to-rock-black border-2 border-crimson/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-crimson/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-gray hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {submitted ? (
            /* Success State */
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Hvala za prijavo! 🍺
              </h3>
              <p className="text-text-gray">
                Zdaj boš prvi izvedel za vse novice The Drinkers!
              </p>
            </div>
          ) : (
            /* Form State */
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 text-crimson mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">
                  Pridruži Se Fan Clubu!
                </h3>
                <p className="text-text-gray">
                  Ekskluzivne novice, popusti in presenečenja
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-text-gray">
                  <span className="text-crimson">🎸</span>
                  <span>Prvi dostop do vstopnic</span>
                </div>
                <div className="flex items-center gap-3 text-text-gray">
                  <span className="text-crimson">👕</span>
                  <span>10% popust na merchandise</span>
                </div>
                <div className="flex items-center gap-3 text-text-gray">
                  <span className="text-crimson">🎵</span>
                  <span>Ekskluzivne vsebine</span>
                </div>
                <div className="flex items-center gap-3 text-text-gray">
                  <span className="text-crimson">🎉</span>
                  <span>Posebna presenečenja</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-bold mb-2 text-sm">
                    Ime
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none transition-colors"
                    placeholder="Tvoje ime"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none transition-colors"
                    placeholder="tvoj@email.com"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 text-lg"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Pošiljam...
                    </span>
                  ) : (
                    'PRIDRUŽI SE ZDAJ'
                  )}
                </Button>

                <p className="text-xs text-text-gray text-center">
                  Brez skrbnosti, odjaviš se lahko kadarkoli.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
