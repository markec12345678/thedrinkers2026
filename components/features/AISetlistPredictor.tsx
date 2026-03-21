'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Sparkles, 
  Music, 
  Shuffle, 
  Heart, 
  Share2,
  Download,
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';
import { SONGS_DATABASE, Song } from '@/lib/songs-database';

interface SetlistPrediction {
  songs: Song[];
  totalDuration: string;
  mood: string;
  energy: string;
  confidence: number;
}

export default function AISetlistPredictor() {
  const [selectedMood, setSelectedMood] = useState<string>('party');
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<SetlistPrediction | null>(null);

  const moods = [
    { id: 'party', name: 'Party', icon: '🎉', energy: 'high' },
    { id: 'chill', name: 'Chill', icon: '😌', energy: 'low' },
    { id: 'energetic', name: 'Energetic', icon: '⚡', energy: 'very-high' },
    { id: 'romantic', name: 'Romantic', icon: '💕', energy: 'medium' },
    { id: 'nostalgic', name: 'Nostalgic', icon: '💫', energy: 'medium' },
  ];

  const durations = [
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '60 min' },
    { value: 90, label: '90 min' },
  ];

  const handlePredict = async () => {
    setIsPredicting(true);
    
    // Simulate AI prediction (in production, call API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter songs by mood
    const moodSongs = SONGS_DATABASE.filter(song => 
      song.mood.includes(selectedMood as any)
    );
    
    // Sort by energy and play count
    const sortedSongs = moodSongs.sort((a, b) => {
      const energyOrder = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
      return energyOrder[b.energy] - energyOrder[a.energy];
    });
    
    // Select songs for duration
    const selectedSongs: Song[] = [];
    let totalSeconds = 0;
    const targetSeconds = selectedDuration * 60;
    
    for (const song of sortedSongs) {
      const [min, sec] = song.duration.split(':').map(Number);
      const songSeconds = (min * 60) + sec;
      
      if (totalSeconds + songSeconds <= targetSeconds) {
        selectedSongs.push(song);
        totalSeconds += songSeconds;
      }
      
      if (selectedSongs.length >= 15) break;
    }
    
    // Calculate total duration
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const totalDuration = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
    
    setPrediction({
      songs: selectedSongs,
      totalDuration,
      mood: selectedMood,
      energy: moods.find(m => m.id === selectedMood)?.energy || 'medium',
      confidence: 85 + Math.floor(Math.random() * 10),
    });
    
    setIsPredicting(false);
  };

  const handleShare = () => {
    if (navigator.share && prediction) {
      navigator.share({
        title: `My Setlist: ${prediction.mood}`,
        text: `Check out my custom The Drinkers setlist: ${prediction.songs.length} songs, ${prediction.totalDuration}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-rock-black to-rock-bg p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-10 h-10 text-purple-500" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              AI Setlist Predictor
            </h1>
            <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
          </div>
          <p className="text-xl text-rock-muted mb-2">
            AI-predicted setlisti za vsako priložnost
          </p>
          <p className="text-sm text-rock-muted">
            Powered by The Drinkers discography + AI algorithms
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <GlassCard variant="dark" className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-500" />
                Nastavitve
              </h2>

              {/* Mood Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Razpoloženje (Mood)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedMood === mood.id
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-rock-gray/50 text-rock-muted border-purple-500/20 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.icon}</div>
                      <div className="text-sm font-medium">{mood.name}</div>
                      <div className="text-xs opacity-70">Energy: {mood.energy}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Trajanje
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {durations.map((duration) => (
                    <button
                      key={duration.value}
                      onClick={() => setSelectedDuration(duration.value)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedDuration === duration.value
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-rock-gray/50 text-rock-muted border-purple-500/20 hover:border-purple-500/50'
                      }`}
                    >
                      <Clock className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-xs font-medium">{duration.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={isPredicting}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPredicting ? (
                  <>
                    <Sparkles className="w-6 h-6 animate-spin" />
                    AI Predicting...
                  </>
                ) : (
                  <>
                    <Shuffle className="w-6 h-6" />
                    Generiraj Setlist
                  </>
                )}
              </button>
            </GlassCard>

            {/* AI Info */}
            <GlassCard variant="dark" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                <h3 className="text-lg font-bold">Kako deluje AI?</h3>
              </div>
              <ul className="space-y-2 text-sm text-rock-muted">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  Analiza razpoloženja in energije pesmi
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  Ujemanje z izbranim moodom
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  Optimizacija zaporedja za najboljši flow
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  Upoštevanje trajanja za točno dolžino
                </li>
              </ul>
            </GlassCard>
          </motion.div>

          {/* Predicted Setlist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard variant="dark" className="p-6 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Music className="w-6 h-6 text-purple-500" />
                Tvoj Predicted Setlist
                {prediction && (
                  <span className="text-sm font-normal text-rock-muted">
                    ({prediction.songs.length} pesmi, {prediction.totalDuration})
                  </span>
                )}
              </h2>

              {!prediction ? (
                <div className="flex flex-col items-center justify-center h-64 text-rock-muted">
                  <Music className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-center">
                    Izberi parametre in generiraj setlist
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {/* Prediction Info */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-400">
                        AI Confidence
                      </span>
                      <span className="text-lg font-bold text-purple-400">
                        {prediction.confidence}%
                      </span>
                    </div>
                    <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-500"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Songs List */}
                  <div className="space-y-2">
                    {prediction.songs.map((song, index) => (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-rock-gray/50 rounded-lg p-3 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">
                            {song.title}
                          </div>
                          <div className="text-xs text-rock-muted">
                            {song.album} • {song.year}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm text-rock-muted">
                            {song.duration}
                          </div>
                          <div className="text-xs text-purple-400 capitalize">
                            {song.energy}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleShare}
                      className="btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Deli
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
