'use client';

import { motion } from 'framer-motion';

export default function PivskiStavec() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-rock-black to-rock-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 text-crimson" />
            <h1 className="text-5xl font-bold text-gradient mb-4">🍺 Pivski Števec</h1>
            <div className="w-12 h-12 text-crimson" />
          </div>
          <p className="text-xl text-rock-muted">The Drinkers - Vse naše pivske funkcionalnosti!</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-8 border border-crimson/30"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">🍺 Beer Counter</h2>
            <p className="text-rock-muted text-center mb-4">Štejaj koliko piv si popil</p>
            <div className="text-center text-crimson text-6xl">🍺</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-8 border border-crimson/30"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">🍺 Pivska Pesem</h2>
            <p className="text-rock-muted text-center mb-4">Ustvari svojo pivsko himno!</p>
            <div className="text-center text-crimson text-6xl">🎵</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-8 border border-crimson/30"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">🍻 Virtualna Pivnica</h2>
            <p className="text-rock-muted text-center mb-4">Srečaj z drugimi pivci!</p>
            <div className="text-center text-crimson text-6xl">🍻</div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-6">
            <p className="text-lg font-medium">
              The Drinkers • Pijemo ga radi od 1993! 🍺🎸
            </p>
            <p className="text-sm text-rock-muted">
              🍺 Pivski števec za vse fanove • Virtualna pivnica • Pivska pesem • Rock &apos;n&apos; roll doživetje!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
