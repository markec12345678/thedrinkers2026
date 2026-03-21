/**
 * AI Setlist Generator
 * Generates personalized setlists based on user preferences
 * Uses RAG pipeline with real song database
 */

import { Song, SongMood, SONGS_DATABASE, PRESET_SETLISTS } from '@/lib/songs-database';

export interface SetlistRequest {
  mood?: string;
  energy?: 'low' | 'medium' | 'high' | 'very-high';
  duration?: number; // in minutes
  occasion?: string;
  customPrompt?: string;
}

export interface SetlistSong extends Song {
  position: number;
  transition?: string;
}

export interface GeneratedSetlist {
  id: string;
  name: string;
  description: string;
  songs: SetlistSong[];
  totalDuration: string;
  totalSongs: number;
  moods: string[];
  energy: string;
  createdAt: string;
  shareUrl: string;
  spotifyUrl?: string;
}

/**
 * Energy level mapping for sorting
 */
const ENERGY_LEVELS = {
  'low': 1,
  'medium': 2,
  'high': 3,
  'very-high': 4,
};

/**
 * Generate setlist using AI (simulated with smart algorithm)
 * In production, this would call an LLM via RAG pipeline
 */
export async function generateSetlist(
  request: SetlistRequest
): Promise<GeneratedSetlist> {
  const { mood, energy, duration, occasion, customPrompt } = request;

  // Step 1: Filter songs based on criteria
  let filteredSongs = [...SONGS_DATABASE];

  // Filter by mood
  if (mood) {
    const moodLower = mood.toLowerCase();
    filteredSongs = filteredSongs.filter(song =>
      song.mood.some(m => m.toLowerCase().includes(moodLower))
    );
  }

  // Filter by energy
  if (energy) {
    const minEnergyLevel = ENERGY_LEVELS[energy];
    filteredSongs = filteredSongs.filter(song =>
      ENERGY_LEVELS[song.energy] >= minEnergyLevel
    );
  }

  // Step 2: Score and sort songs
  const scoredSongs = filteredSongs.map(song => ({
    ...song,
    score: calculateSongScore(song, request),
  }));

  scoredSongs.sort((a, b) => b.score - a.score);

  // Step 3: Select songs for setlist (aim for requested duration)
  const targetMinutes = duration || 60;
  const selectedSongs: SetlistSong[] = [];
  let totalSeconds = 0;
  const targetSeconds = targetMinutes * 60;

  for (const song of scoredSongs) {
    const [min, sec] = song.duration.split(':').map(Number);
    const songSeconds = (min * 60) + sec;

    if (totalSeconds + songSeconds <= targetSeconds * 1.1) { // 10% buffer
      selectedSongs.push({
        ...song,
        position: selectedSongs.length + 1,
        transition: getTransitionText(song, selectedSongs.length),
      });
      totalSeconds += songSeconds;
    }

    // Stop if we have enough songs
    if (selectedSongs.length >= 15) break;
  }

  // Step 4: Order songs for optimal flow (energy mapping)
  const orderedSongs = orderSetlistForFlow(selectedSongs);

  // Step 5: Generate metadata
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const totalDuration = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

  // Step 6: Generate Spotify playlist URL (in production, would create real playlist)
  const spotifyTrackIds = orderedSongs.map(s => s.spotifyId).join(',');
  const spotifyUrl = `https://open.spotify.com/playlist/create?tracks=${spotifyTrackIds}`;

  return {
    id: `setlist-${Date.now()}`,
    name: generateSetlistName(request),
    description: generateSetlistDescription(request, orderedSongs.length),
    songs: orderedSongs,
    totalDuration,
    totalSongs: orderedSongs.length,
    moods: mood ? [mood] : getAllMoods(orderedSongs),
    energy: energy || 'mixed',
    createdAt: new Date().toISOString(),
    shareUrl: `/setlist/${Date.now()}`,
    spotifyUrl,
  };
}

/**
 * Calculate song score based on request
 */
function calculateSongScore(song: Song, request: SetlistRequest): number {
  let score = 0;

  // Mood match
  if (request.mood) {
    const moodMatch = song.mood.some(m =>
      m.toLowerCase().includes(request.mood!.toLowerCase())
    );
    if (moodMatch) score += 50;
  }

  // Energy match
  if (request.energy) {
    const energyDiff = Math.abs(
      ENERGY_LEVELS[song.energy] - ENERGY_LEVELS[request.energy]
    );
    score += (4 - energyDiff) * 10;
  }

  // Popularity (play count)
  score += Math.min(song.playCount / 10, 20);

  // Recent songs boost
  if (song.year >= 2010) score += 5;

  return score;
}

/**
 * Order setlist for optimal energy flow
 */
function orderSetlistForFlow(songs: SetlistSong[]): SetlistSong[] {
  if (songs.length === 0) return [];

  const ordered: SetlistSong[] = [];
  const remaining = [...songs];

  // Start with medium energy
  let currentEnergy = 2;

  while (remaining.length > 0) {
    // Find song closest to current energy
    const nextIndex = remaining.findIndex(song =>
      Math.abs(ENERGY_LEVELS[song.energy] - currentEnergy) <= 1
    );

    if (nextIndex === -1) {
      // No good match, take highest energy
      ordered.push(remaining.shift()!);
      currentEnergy = 4;
    } else {
      const [nextSong] = remaining.splice(nextIndex, 1);
      ordered.push(nextSong);
      currentEnergy = ENERGY_LEVELS[nextSong.energy];
    }

    // Gradually increase energy
    if (currentEnergy < 4) currentEnergy += 0.5;
  }

  // Update positions
  return ordered.map((song, index) => ({
    ...song,
    position: index + 1,
  }));
}

/**
 * Generate setlist name based on request
 */
function generateSetlistName(request: SetlistRequest): string {
  if (request.customPrompt) {
    return `Custom: ${request.customPrompt.substring(0, 30)}...`;
  }

  if (request.occasion) {
    return `${request.occasion} Mix`;
  }

  if (request.mood) {
    const moodMap: Record<string, string> = {
      'party': 'Ultimate Party',
      'chill': 'Chill Vibes',
      'workout': 'Workout Energy',
      'romantic': 'Romantic Evening',
      'drinking': 'Pub Crawl',
      'energetic': 'High Energy',
    };
    return moodMap[request.mood] || `${request.mood} Mix`;
  }

  return 'Custom Mix';
}

/**
 * Generate setlist description
 */
function generateSetlistDescription(request: SetlistRequest, songCount: number): string {
  const base = `Personaliziran setlist ${songCount} pesmi`;
  
  if (request.mood) {
    return `${base} za ${request.mood} vzdušje`;
  }
  
  if (request.energy) {
    return `${base} z ${request.energy} energijo`;
  }
  
  return base;
}

/**
 * Get transition text for song
 */
function getTransitionText(song: Song, position: number): string {
  if (position === 0) return 'Opening track';
  if (position % 5 === 0) return 'Peak moment';
  if (song.energy === 'low') return 'Cool down';
  if (song.energy === 'very-high') return 'Energy boost';
  return '';
}

/**
 * Get all moods from selected songs
 */
function getAllMoods(songs: Song[]): string[] {
  const moods = new Set<string>();
  songs.forEach(song => {
    song.mood.forEach(mood => moods.add(mood));
  });
  return Array.from(moods);
}

/**
 * Get preset setlist by ID
 */
export function getPresetSetlist(presetId: keyof typeof PRESET_SETLISTS): SetlistRequest {
  const preset = PRESET_SETLISTS[presetId];
  
  return {
    mood: preset.moods[0],
    energy: preset.minEnergy as any,
    duration: parseInt(preset.duration),
    occasion: preset.name,
  };
}

/**
 * Get all available presets
 */
export function getAllPresets() {
  return Object.entries(PRESET_SETLISTS).map(([id, preset]) => ({
    id,
    ...preset,
  }));
}

/**
 * Validate Spotify URLs
 */
export function validateSpotifyUrls(songs: Song[]): { valid: boolean; invalid: string[] } {
  const invalid: string[] = [];
  
  songs.forEach(song => {
    if (!song.spotifyUrl || !song.spotifyUrl.includes('spotify.com')) {
      invalid.push(song.title);
    }
  });
  
  return {
    valid: invalid.length === 0,
    invalid,
  };
}
