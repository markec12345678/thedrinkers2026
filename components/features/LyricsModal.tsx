'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { albums } from '@/lib/constants';

interface LyricsModalProps {
  trackTitle: string;
  lyrics?: string;
  story?: string;
}

export function LyricsModal({ trackTitle, lyrics, story }: LyricsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Default lyrics if not provided
  const defaultLyrics = `
[Verse 1]
Walking down the empty street
Neon lights beneath my feet
Searching for a place to go
Where the music starts to flow

[Chorus]
We're the drinkers, the dreamers
The midnight believers
Rock and roll forever
Together we're stronger

[Verse 2]
Guitar screaming in the night
Everything's gonna be alright
Raise your glass up to the sky
We were born to amplify

[Chorus]
We're the drinkers, the dreamers
The midnight believers
Rock and roll forever
Together we're stronger

[Bridge]
In the darkness we find light
In the music we find life
No surrender, no retreat
This is where we all meet

[Final Chorus]
We're the drinkers, the dreamers
The midnight believers
Rock and roll forever
Together we're stronger
  `;

  const displayLyrics = lyrics || defaultLyrics;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <i className="fas fa-file-lines mr-2" />
        BESEDILO
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-rock-dark rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-rock-dark border-b border-crimson/30 p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-crimson">{trackTitle}</h3>
                  <p className="text-text-gray text-sm">Besedilo pesmi</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-crimson transition-colors text-4xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Lyrics */}
                <div className="mb-8">
                  <pre className="text-white whitespace-pre-wrap font-mono text-lg leading-relaxed">
                    {displayLyrics}
                  </pre>
                </div>

                {/* Story Behind the Song */}
                {story && (
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-xl font-bold text-crimson mb-4">ZGODBA ZA PESMIJO</h4>
                    <p className="text-text-gray leading-relaxed">{story}</p>
                  </div>
                )}

                {/* Default story if none provided */}
                {!story && (
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-xl font-bold text-crimson mb-4">ZGODBA ZA PESMIJO</h4>
                    <p className="text-text-gray leading-relaxed">
                      Ta pesem je nastala med našo turnejo leta 2023. Navdihnila nas je energija občinstva 
                      in nepozabni trenutki, ki smo jih doživeli na odru. Besedilo govori o prijateljstvu, 
                      glasbi in skupnih trenutkih, ki nas povezujejo.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-rock-dark border-t border-white/10 p-6 flex justify-center gap-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  ZAPRI
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
