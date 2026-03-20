'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Beer, Clock, Trophy, Flame, Music, Users } from 'lucide-react';

interface BeerStats {
  totalBeers: number;
  todayBeers: number;
  weeklyBeers: number;
  rank: string;
  streak: number;
}

export default function BeerCounter() {
  const [stats, setStats] = useState<BeerStats>({
    totalBeers: 0,
    todayBeers: 0,
    weeklyBeers: 0,
    rank: 'Novice',
    streak: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('drinkersBeerStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const addBeer = () => {
    setIsAnimating(true);
    const newStats = {
      ...stats,
      totalBeers: stats.totalBeers + 1,
      todayBeers: stats.todayBeers + 1,
      weeklyBeers: stats.weeklyBeers + 1,
      streak: stats.streak + 1
    };

    // Update rank based on total beers
    if (newStats.totalBeers >= 1000) {
      newStats.rank = 'Legendary';
    } else if (newStats.totalBeers >= 500) {
      newStats.rank = 'Master';
    } else if (newStats.totalBeers >= 100) {
      newStats.rank = 'Expert';
    } else if (newStats.totalBeers >= 50) {
      newStats.rank = 'Advanced';
    } else if (newStats.totalBeers >= 10) {
      newStats.rank = 'Intermediate';
    }

    setStats(newStats);
    localStorage.setItem('drinkersBeerStats', JSON.stringify(newStats));
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Legendary': return 'text-yellow-400';
      case 'Master': return 'text-purple-400';
      case 'Expert': return 'text-blue-400';
      case 'Advanced': return 'text-green-400';
      case 'Intermediate': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getRankEmoji = (rank: string) => {
    switch (rank) {
      case 'Legendary': return '👑';
      case 'Master': return '🏆';
      case 'Expert': return '⭐';
      case 'Advanced': return '🎯';
      case 'Intermediate': return '🍺';
      default: return '🌱';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rock-black via-rock-dark to-rock-bg p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-gradient mb-4">Pijemo ga radi!</h1>
          <p className="text-xl text-rock-muted">The Drinkers Beer Counter</p>
        </motion.div>

        {/* Main Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-crimson/30"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Beer className="w-24 h-24 text-crimson mb-4" />
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-2">{stats.totalBeers}</h2>
            <p className="text-rock-muted mb-6">Total Beers Drank</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addBeer}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <Beer className="w-6 h-6" />
              Add Beer
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-rock-surface/60 backdrop-blur rounded-2xl p-6 border border-crimson/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-crimson" />
              <h3 className="text-lg font-semibold">Today</h3>
            </div>
            <p className="text-3xl font-bold">{stats.todayBeers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-rock-surface/60 backdrop-blur rounded-2xl p-6 border border-crimson/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-crimson" />
              <h3 className="text-lg font-semibold">Streak</h3>
            </div>
            <p className="text-3xl font-bold">{stats.streak}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-rock-surface/60 backdrop-blur rounded-2xl p-6 border border-crimson/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-crimson" />
              <h3 className="text-lg font-semibold">Rank</h3>
            </div>
            <p className={`text-2xl font-bold ${getRankColor(stats.rank)}`}>
              {getRankEmoji(stats.rank)} {stats.rank}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-rock-surface/60 backdrop-blur rounded-2xl p-6 border border-crimson/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-crimson" />
              <h3 className="text-lg font-semibold">Weekly</h3>
            </div>
            <p className="text-3xl font-bold">{stats.weeklyBeers}</p>
          </motion.div>
        </div>

        {/* Motivational Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-6">
            <Music className="w-8 h-8 text-crimson mx-auto mb-3" />
            <p className="text-lg font-medium">
              {stats.totalBeers === 0 && "Time to start drinking!"}
              {stats.totalBeers > 0 && stats.totalBeers < 10 && "Good start! Keep going!"}
              {stats.totalBeers >= 10 && stats.totalBeers < 50 && "You're becoming a real drinker!"}
              {stats.totalBeers >= 50 && stats.totalBeers < 100 && "Impressive! You're a true connoisseur!"}
              {stats.totalBeers >= 100 && stats.totalBeers < 500 && "Legendary status achieved!"}
              {stats.totalBeers >= 500 && "You're a drinking master!"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
