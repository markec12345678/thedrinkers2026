'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Music, 
  Sparkles, 
  Play, 
  Download, 
  Share2, 
  Loader2,
  Disc,
  Clock,
  Zap,
  Heart,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface Song {
  id: string;
  title: string;
  album: string;
  year: number;
  duration: string;
  spotifyUrl: string;
  mood: string[];
  energy: string;
  position: number;
}

interface GeneratedSetlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  totalDuration: string;
  totalSongs: number;
  spotifyUrl?: string;
}

const MOODS = [
  { id: 'party', name: 'Party', icon: '🎉', color: 'bg-pink-500' },
  { id: 'chill', name: 'Chill', icon: '😌', color: 'bg-blue-500' },
  { id: 'energetic', name: 'Energetic', icon: '⚡', color: 'bg-yellow-500' },
  { id: 'romantic', name: 'Romantic', icon: '💕', color: 'bg-red-500' },
  { id: 'drinking', name: 'Drinking', icon: '🍺', color: 'bg-amber-600' },
  { id: 'workout', name: 'Workout', icon: '💪', color: 'bg-orange-500' },
  { id: 'nostalgic', name: 'Nostalgic', icon: '💫', color: 'bg-purple-500' },
  { id: 'rebellious', name: 'Rebellious', icon: '🤘', color: 'bg-slate-700' },
];

const ENERGY_LEVELS = [
  { id: 'low', name: 'Low', icon: '🌙' },
  { id: 'medium', name: 'Medium', icon: '☀️' },
  { id: 'high', name: 'High', icon: '🔥' },
  { id: 'very-high', name: 'Very High', icon: '💥' },
];

const PRESETS = [
  { id: 'party', name: 'Ultimate Party', description: 'Najbolj divje pesmi za zabavo', duration: 60 },
  { id: 'chill', name: 'Chill Vibes', description: 'Sproščeni ritmi za miren večer', duration: 50 },
  { id: 'workout', name: 'Workout Energy', description: 'Energija za tvoj trening', duration: 45 },
  { id: 'best-of', name: 'Greatest Hits', description: 'Največji hiti The Drinkers', duration: 65 },
];

export default function AISetlistGenerator() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedEnergy, setSelectedEnergy] = useState<string>('');
  const [duration, setDuration] = useState(60);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [setlist, setSetlist] = useState<GeneratedSetlist | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/setlist/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: selectedMood || undefined,
          energy: selectedEnergy || undefined,
          duration,
          customPrompt: customPrompt || undefined,
        }),
      });

      const result = await response.json();

      if (result.success && result.setlist) {
        setSetlist(result.setlist);
      } else {
        setError(result.error || 'Failed to generate setlist');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreset = (presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedMood(presetId === 'best-of' ? '' : presetId);
      setDuration(preset.duration);
      setError(null);
    }
  };

  const handleShare = () => {
    if (navigator.share && setlist) {
      navigator.share({
        title: setlist.name,
        text: `Check out my custom The Drinkers setlist: ${setlist.description}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSpotify = () => {
    if (setlist?.spotifyUrl) {
      window.open(setlist.spotifyUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crimson/10 via-rock-black to-rock-bg p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-10 h-10 text-crimson" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              AI Setlist Generator
            </h1>
            <Disc className="w-10 h-10 text-crimson animate-spin-slow" />
          </div>
          <p className="text-xl text-rock-muted mb-2">
            Ustvari personaliziran setlist za vsako priložnost
          </p>
          <p className="text-sm text-rock-muted">
            Powered by AI + The Drinkers discography
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <GlassCard variant="dark" className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-crimson" />
                Ustvari Setlist
              </h2>

              {/* Presets */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Hitri izbor (Presets)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePreset(preset.id)}
                      className="p-3 bg-rock-gray/50 hover:bg-crimson/10 border border-crimson/20 rounded-lg text-left transition-all"
                    >
                      <div className="font-bold text-white">{preset.name}</div>
                      <div className="text-xs text-rock-muted">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Razpoloženje (Mood)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id === selectedMood ? '' : mood.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedMood === mood.id
                          ? 'bg-crimson text-white border-crimson'
                          : 'bg-rock-gray/50 text-rock-muted border-crimson/20 hover:border-crimson/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.icon}</div>
                      <div className="text-xs font-medium">{mood.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Energija
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ENERGY_LEVELS.map((energy) => (
                    <button
                      key={energy.id}
                      onClick={() => setSelectedEnergy(energy.id === selectedEnergy ? '' : energy.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedEnergy === energy.id
                          ? 'bg-crimson text-white border-crimson'
                          : 'bg-rock-gray/50 text-rock-muted border-crimson/20 hover:border-crimson/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{energy.icon}</div>
                      <div className="text-xs font-medium">{energy.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Trajanje: {duration} min
                </label>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="15"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full accent-crimson"
                />
                <div className="flex justify-between text-xs text-rock-muted mt-2">
                  <span>30 min</span>
                  <span>90 min</span>
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Ali opiši z besedami (optional)
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="npr. 'Želim najbolj divje pesmi za zabavo s prijatelji'"
                  className="w-full h-20 px-4 py-3 bg-rock-gray/50 border border-crimson/30 rounded-lg text-white placeholder-rock-muted focus:outline-none focus:ring-2 focus:ring-crimson/50 resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!selectedMood && !selectedEnergy && !customPrompt)}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generiram...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Generiraj Setlist
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400"
                >
                  <span>{error}</span>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Generated Setlist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard variant="dark" className="p-6 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Disc className="w-6 h-6 text-crimson" />
                Tvoj Setlist
                {setlist && (
                  <span className="text-sm font-normal text-rock-muted">
                    ({setlist.totalSongs} pesmi, {setlist.totalDuration})
                  </span>
                )}
              </h2>

              {!setlist ? (
                <div className="flex flex-col items-center justify-center h-64 text-rock-muted">
                  <Music className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-center">
                    Izberi parametre in generiraj setlist
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {/* Setlist Info */}
                  <div className="bg-crimson/10 border border-crimson/30 rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {setlist.name}
                    </h3>
                    <p className="text-sm text-rock-muted mb-3">
                      {setlist.description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {setlist.totalDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Music className="w-4 h-4" />
                        {setlist.totalSongs} songs
                      </span>
                    </div>
                  </div>

                  {/* Songs List */}
                  <div className="space-y-2">
                    {setlist.songs.map((song, index) => (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-rock-gray/50 rounded-lg p-3 flex items-center gap-3 hover:bg-crimson/10 transition-all"
                      >
                        <div className="w-8 h-8 bg-crimson text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {song.position}
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
                          <a
                            href={song.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 justify-end"
                          >
                            <Play className="w-3 h-3" />
                            Play
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSpotify}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Odpri na Spotify
                    </button>
                    <button
                      onClick={handleShare}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Deli
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <GlassCard variant="dark" className="p-6 text-center">
            <Zap className="w-12 h-12 text-crimson mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">AI Powered</h3>
            <p className="text-sm text-rock-muted">
              Pametno generiranje temelječo na razpoloženju in energiji
            </p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 text-center">
            <Heart className="w-12 h-12 text-crimson mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Prave Pesmi</h3>
            <p className="text-sm text-rock-muted">
              Vse pesmi so iz uradne diskografije The Drinkers
            </p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-crimson mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Validirani Linki</h3>
            <p className="text-sm text-rock-muted">
              Vsi Spotify linki delujejo in so preverjeni
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
