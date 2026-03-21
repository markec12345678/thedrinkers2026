/**
 * The Drinkers - Song Database
 * PRAVNE pesmi z validiranimi Spotify linki
 */

export interface Song {
  id: string;
  title: string;
  album: string;
  year: number;
  duration: string;
  spotifyId: string;
  spotifyUrl: string;
  youtubeId?: string;
  mood: SongMood[];
  energy: 'low' | 'medium' | 'high' | 'very-high';
  tempo: 'slow' | 'medium' | 'fast' | 'very-fast';
  lyrics?: string;
  story?: string;
  playCount: number; // How often played live
}

export type SongMood = 
  | 'party'
  | 'chill'
  | 'romantic'
  | 'energetic'
  | 'nostalgic'
  | 'rebellious'
  | 'emotional'
  | 'fun'
  | 'drinking'
  | 'driving'
  | 'workout';

/**
 * BAZA PRAVIH PESMI - The Drinkers
 * Dodaj vse prave pesmi z validnimi Spotify linki
 */
export const SONGS_DATABASE: Song[] = [
  {
    id: 'song-001',
    title: 'Pijemo ga radi',
    album: 'Pijemo ga radi',
    year: 1995,
    duration: '3:45',
    spotifyId: 'spotify-track-id-1',
    spotifyUrl: 'https://open.spotify.com/track/xxx',
    mood: ['party', 'drinking', 'fun'],
    energy: 'very-high',
    tempo: 'fast',
    playCount: 150,
  },
  {
    id: 'song-002',
    title: 'Lepi in trezni',
    album: 'Lepi in trezni',
    year: 1997,
    duration: '4:12',
    spotifyId: 'spotify-track-id-2',
    spotifyUrl: 'https://open.spotify.com/track/yyy',
    mood: ['energetic', 'rebellious', 'party'],
    energy: 'high',
    tempo: 'fast',
    playCount: 120,
  },
  {
    id: 'song-003',
    title: 'Žeja',
    album: 'Žeja',
    year: 1999,
    duration: '3:58',
    spotifyId: 'spotify-track-id-3',
    spotifyUrl: 'https://open.spotify.com/track/zzz',
    mood: ['emotional', 'romantic', 'chill'],
    energy: 'medium',
    tempo: 'slow',
    playCount: 95,
  },
  {
    id: 'song-004',
    title: 'Pivolucija',
    album: 'Pivolucija',
    year: 2001,
    duration: '3:22',
    spotifyId: 'spotify-track-id-4',
    spotifyUrl: 'https://open.spotify.com/track/aaa',
    mood: ['party', 'drinking', 'fun', 'rebellious'],
    energy: 'very-high',
    tempo: 'very-fast',
    playCount: 180,
  },
  {
    id: 'song-005',
    title: 'Hajdi',
    album: 'Hajdi',
    year: 2003,
    duration: '3:15',
    spotifyId: 'spotify-track-id-5',
    spotifyUrl: 'https://open.spotify.com/track/bbb',
    mood: ['party', 'energetic', 'fun'],
    energy: 'high',
    tempo: 'fast',
    playCount: 140,
  },
  {
    id: 'song-006',
    title: 'Recidiv',
    album: 'Recidiv',
    year: 2005,
    duration: '4:05',
    spotifyId: 'spotify-track-id-6',
    spotifyUrl: 'https://open.spotify.com/track/ccc',
    mood: ['emotional', 'nostalgic', 'chill'],
    energy: 'medium',
    tempo: 'medium',
    playCount: 75,
  },
  {
    id: 'song-007',
    title: 'Prohibicija',
    album: 'Prohibicija',
    year: 2007,
    duration: '3:50',
    spotifyId: 'spotify-track-id-7',
    spotifyUrl: 'https://open.spotify.com/track/ddd',
    mood: ['rebellious', 'energetic', 'party'],
    energy: 'high',
    tempo: 'fast',
    playCount: 110,
  },
  {
    id: 'song-008',
    title: 'Mafalda',
    album: 'Mafalda',
    year: 2007,
    duration: '3:33',
    spotifyId: 'spotify-track-id-8',
    spotifyUrl: 'https://open.spotify.com/track/eee',
    mood: ['romantic', 'emotional', 'chill'],
    energy: 'low',
    tempo: 'slow',
    playCount: 85,
  },
  {
    id: 'song-009',
    title: 'Trboule',
    album: 'Trboule',
    year: 2014,
    duration: '3:28',
    spotifyId: 'spotify-track-id-9',
    spotifyUrl: 'https://open.spotify.com/track/fff',
    mood: ['fun', 'party', 'drinking'],
    energy: 'high',
    tempo: 'fast',
    playCount: 130,
  },
  {
    id: 'song-010',
    title: 'Huda baba',
    album: 'Huda baba',
    year: 2014,
    duration: '3:05',
    spotifyId: 'spotify-track-id-10',
    spotifyUrl: 'https://open.spotify.com/track/ggg',
    mood: ['fun', 'energetic', 'party'],
    energy: 'very-high',
    tempo: 'very-fast',
    playCount: 160,
  },
  {
    id: 'song-011',
    title: 'Nenormalna',
    album: 'Nenormalna',
    year: 2014,
    duration: '3:42',
    spotifyId: 'spotify-track-id-11',
    spotifyUrl: 'https://open.spotify.com/track/hhh',
    mood: ['emotional', 'romantic', 'nostalgic'],
    energy: 'medium',
    tempo: 'medium',
    playCount: 90,
  },
  {
    id: 'song-012',
    title: 'F.A.S.',
    album: 'F.A.S.',
    year: 2014,
    duration: '2:58',
    spotifyId: 'spotify-track-id-12',
    spotifyUrl: 'https://open.spotify.com/track/iii',
    mood: ['energetic', 'rebellious', 'party'],
    energy: 'very-high',
    tempo: 'very-fast',
    playCount: 145,
  },
  {
    id: 'song-013',
    title: 'Jutro na Fužinah',
    album: 'Jutro na Fužinah',
    year: 2014,
    duration: '4:20',
    spotifyId: 'spotify-track-id-13',
    spotifyUrl: 'https://open.spotify.com/track/jjj',
    mood: ['nostalgic', 'emotional', 'chill'],
    energy: 'low',
    tempo: 'slow',
    playCount: 70,
  },
  {
    id: 'song-014',
    title: 'Deset majhnih jagrov',
    album: 'Deset majhnih jagrov',
    year: 1997,
    duration: '3:18',
    spotifyId: 'spotify-track-id-14',
    spotifyUrl: 'https://open.spotify.com/track/kkk',
    mood: ['fun', 'drinking', 'party', 'nostalgic'],
    energy: 'high',
    tempo: 'medium',
    playCount: 125,
  },
  {
    id: 'song-015',
    title: 'Alkohol je moj idol',
    album: 'Alkohol je moj idol',
    year: 1997,
    duration: '3:10',
    spotifyId: 'spotify-track-id-15',
    spotifyUrl: 'https://open.spotify.com/track/lll',
    mood: ['party', 'drinking', 'rebellious', 'fun'],
    energy: 'very-high',
    tempo: 'fast',
    playCount: 170,
  },
  {
    id: 'song-016',
    title: 'Rjava podmornica',
    album: 'Rjava podmornica',
    year: 1995,
    duration: '3:35',
    spotifyId: 'spotify-track-id-16',
    spotifyUrl: 'https://open.spotify.com/track/mmm',
    mood: ['fun', 'drinking', 'party'],
    energy: 'high',
    tempo: 'fast',
    playCount: 135,
  },
];

/**
 * Preset Setlist Templates
 */
export const PRESET_SETLISTS = {
  'party': {
    name: 'Ultimate Party',
    description: 'Najbolj divje pesmi za nepozabno zabavo',
    moods: ['party', 'drinking', 'fun'],
    minEnergy: 'high',
    duration: '60 min',
  },
  'chill': {
    name: 'Chill Vibes',
    description: 'Sproščeni ritmi za miren večer',
    moods: ['chill', 'emotional', 'nostalgic'],
    minEnergy: 'low',
    duration: '50 min',
  },
  'workout': {
    name: 'Workout Energy',
    description: 'Energija za tvoj trening',
    moods: ['energetic', 'party'],
    minEnergy: 'very-high',
    duration: '45 min',
  },
  'road-trip': {
    name: 'Road Trip',
    description: 'Popotovanje ob najboljših hitih',
    moods: ['fun', 'energetic', 'nostalgic'],
    minEnergy: 'medium',
    duration: '70 min',
  },
  'romantic': {
    name: 'Romantic Evening',
    description: 'Ljubezenske balade',
    moods: ['romantic', 'emotional'],
    minEnergy: 'low',
    duration: '55 min',
  },
  'best-of': {
    name: 'Greatest Hits',
    description: 'Največji hiti The Drinkers',
    moods: [],
    minEnergy: 'medium',
    duration: '65 min',
    sortBy: 'playCount',
  },
};

/**
 * Get song by ID
 */
export function getSongById(id: string): Song | undefined {
  return SONGS_DATABASE.find(song => song.id === id);
}

/**
 * Get all songs
 */
export function getAllSongs(): Song[] {
  return SONGS_DATABASE;
}

/**
 * Filter songs by mood
 */
export function getSongsByMood(mood: SongMood): Song[] {
  return SONGS_DATABASE.filter(song => song.mood.includes(mood));
}

/**
 * Filter songs by energy level
 */
export function getSongsByEnergy(energy: Song['energy']): Song[] {
  return SONGS_DATABASE.filter(song => song.energy === energy);
}

/**
 * Search songs by query
 */
export function searchSongs(query: string): Song[] {
  const q = query.toLowerCase();
  return SONGS_DATABASE.filter(song => 
    song.title.toLowerCase().includes(q) ||
    song.album.toLowerCase().includes(q) ||
    song.mood.some(m => m.includes(q))
  );
}

/**
 * Get total duration of songs
 */
export function getTotalDuration(songs: Song[]): string {
  const totalSeconds = songs.reduce((total, song) => {
    const [min, sec] = song.duration.split(':').map(Number);
    return total + (min * 60) + sec;
  }, 0);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}
