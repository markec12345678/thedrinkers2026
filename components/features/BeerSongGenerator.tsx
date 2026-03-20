'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Beer, Music, Shuffle, Volume2, Heart, Share2 } from 'lucide-react';

const drinkingSongs = [
  { title: "Pijemo ga radi", artist: "The Drinkers", year: 1995 },
  { title: "Alkohol je moj idol", artist: "The Drinkers", year: 1997 },
  { title: "Rjava podmornica", artist: "The Drinkers", year: 1995 },
  { title: "Mafalda", artist: "The Drinkers", year: 2007 },
  { title: "Trboule", artist: "The Drinkers", year: 2014 },
  { title: "Huda baba", artist: "The Drinkers", year: 2014 },
  { title: "Nenormalna", artist: "The Drinkers", year: 2014 },
  { title: "F.A.S.", artist: "The Drinkers", year: 2014 },
  { title: "Jutro na Fužinah", artist: "The Drinkers", year: 2014 },
  { title: "Deset majhnih jagrov", artist: "The Drinkers", year: 1997 },
];

const beerEmojis = ["🍺", "🍻", "🥃", "🍷", "🍾", "🍸"];
const drinkingPhrases = [
  "Na zdravje!",
  "Pijemo ga radi!",
  "Življenje je prekratno za slabe pive!",
  "Ena za cesto!",
  "Za dobro voljo!",
  "Čestitam!",
  "Prosim!",
  "Na prijateljstvo!",
];

export default function BeerSongGenerator() {
  const [currentSong, setCurrentSong] = useState(drinkingSongs[0]);
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<string[]>([]);

  const generateSong = () => {
    setIsGenerating(true);
    
    // Random song selection
    const randomSong = drinkingSongs[Math.floor(Math.random() * drinkingSongs.length)];
    setCurrentSong(randomSong);

    // Generate fun drinking lyrics
    const randomBeer = beerEmojis[Math.floor(Math.random() * beerEmojis.length)];
    const randomPhrase = drinkingPhrases[Math.floor(Math.random() * drinkingPhrases.length)];
    const randomVerse = Math.floor(Math.random() * 3) + 1;
    
    let lyrics = `${randomBeer} ${randomPhrase} ${randomBeer}\n\n`;
    
    switch(randomVerse) {
      case 1:
        lyrics += `S skodelko v roki,\nZ The Drinkers ob strani,\n${randomSong.title} igra,\n${randomBeer} ${randomBeer} ${randomBeer}!\n\n`;
        break;
      case 2:
        lyrics += `Pivska pena leti,\nGlasba je naša,\n${randomSong.artist} nas vodi,\n${randomBeer} do jutra!\n\n`;
        break;
      case 3:
        lyrics += `V Litiji se je začelo,\nLeta 1993,\nZdaj pijemo še naprej,\n${randomBeer} ${randomBeer} ${randomBeer}!\n\n`;
        break;
    }
    
    lyrics += `Refren:\n${randomSong.title.toUpperCase()}!\n${randomPhrase}\n${randomBeer} ${randomBeer} ${randomBeer}!`;

    setGeneratedLyrics(lyrics);
    
    setTimeout(() => setIsGenerating(false), 1000);
  };

  const toggleFavorite = (songTitle: string) => {
    setFavoriteSongs(prev => 
      prev.includes(songTitle) 
        ? prev.filter(s => s !== songTitle)
        : [...prev, songTitle]
    );
  };

  const shareLyrics = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Drinking Song!",
        text: generatedLyrics,
      });
    } else {
      navigator.clipboard.writeText(generatedLyrics);
      alert("Lyrics copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-rock-black to-rock-bg p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Beer className="w-12 h-12 text-crimson" />
            <h1 className="text-5xl font-bold text-gradient">Beer Song Generator</h1>
            <Music className="w-12 h-12 text-crimson" />
          </div>
          <p className="text-xl text-rock-muted">Create your perfect drinking anthem!</p>
        </motion.div>

        {/* Generator Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-crimson/30"
        >
          <div className="text-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateSong}
              disabled={isGenerating}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <Shuffle className={`w-6 h-6 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating...' : 'Generate Drinking Song'}
            </motion.button>
          </div>

          {/* Current Song Display */}
          {currentSong && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{currentSong.title}</h3>
                    <p className="text-rock-muted">{currentSong.artist} • {currentSong.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(currentSong.title)}
                      className={`p-2 rounded-lg transition-colors ${
                        favoriteSongs.includes(currentSong.title)
                          ? 'bg-crimson text-white'
                          : 'bg-rock-surface text-rock-muted hover:bg-rock-gray'
                      }`}
                      title={favoriteSongs.includes(currentSong.title) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${favoriteSongs.includes(currentSong.title) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-rock-surface text-rock-muted rounded-lg hover:bg-rock-gray transition-colors" title="Play song">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generated Lyrics */}
          {generatedLyrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rock-gray/50 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">Your Drinking Song</h4>
                <button
                  onClick={shareLyrics}
                  className="p-2 bg-crimson text-white rounded-lg hover:bg-crimson-dark transition-colors"
                  title="Share lyrics"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <div className="whitespace-pre-line text-lg leading-relaxed font-mono">
                {generatedLyrics}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Favorite Songs */}
        {favoriteSongs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rock-surface/60 backdrop-blur rounded-2xl p-6 border border-crimson/20"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-crimson" />
              Favorite Drinking Songs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {favoriteSongs.map((song, index) => (
                <div key={index} className="bg-rock-gray/50 rounded-lg p-3">
                  <p className="font-medium">{song}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-6">
            <Beer className="w-8 h-8 text-crimson mx-auto mb-3" />
            <p className="text-lg font-medium">
              {drinkingSongs.length} classic drinking songs in our database!
            </p>
            <p className="text-rock-muted mt-2">
              Generate unlimited drinking anthems with The Drinkers!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
