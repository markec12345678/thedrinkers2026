'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-rock-dark z-50 md:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-crimson/20">
                <span className="text-xl font-bold text-gradient">THE DRINKERS</span>
                <button
                  onClick={onClose}
                  className="text-white hover:text-crimson transition-colors text-3xl font-bold"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-6">
                  {NAVIGATION.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-4 text-white hover:text-crimson hover:bg-crimson/10 px-4 rounded-lg font-bold uppercase tracking-wider transition-all duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-crimson/20">
                <div className="flex space-x-4 justify-center">
                  <a
                    href="https://spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-crimson transition-colors"
                    aria-label="Spotify"
                  >
                    <i className="fab fa-spotify text-2xl" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-crimson transition-colors"
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube text-2xl" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-crimson transition-colors"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram text-2xl" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-crimson transition-colors"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook text-2xl" />
                  </a>
                </div>
                <p className="text-center text-text-gray text-sm mt-4">
                  &copy; {new Date().getFullYear()} The Drinkers
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
