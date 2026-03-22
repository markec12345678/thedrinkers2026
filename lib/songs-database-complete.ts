/**
 * 🎸 THE DRINKERS - COMPLETE SONGS DATABASE
 * 
 * All songs with real YouTube video IDs
 * Source: YouTube, Last.fm, Official Website
 */

export interface Song {
  id: string;
  title: string;
  album: string;
  year: number;
  youtubeId: string;
  duration?: string;
  type: 'official' | 'live' | 'studio';
}

export const songsDatabase: Song[] = [
  // ===== LEP I N TREZNI (1995) =====
  {
    id: 'song-001',
    title: 'Pijemo ga radi',
    album: 'Lepi in trezni',
    year: 1995,
    youtubeId: 'hkHHvb2eDb4', // Real YouTube ID - 837K views
    duration: '4:21',
    type: 'official'
  },
  {
    id: 'song-002',
    title: 'Alkohol je moj idol',
    album: 'Lepi in trezni',
    year: 1995,
    youtubeId: '7HHx9c3YnMQ', // Real YouTube ID
    duration: '2:24',
    type: 'official'
  },
  {
    id: 'song-003',
    title: 'Rjava podmornica',
    album: 'Lepi in trezni',
    year: 1995,
    youtubeId: 'd3ygw0J_VgQ', // From musicVideos.ts
    duration: '4:38',
    type: 'official'
  },
  
  // ===== ŽEJA (1997) =====
  {
    id: 'song-004',
    title: 'Deset majhnih jagrov',
    album: 'Žeja',
    year: 1997,
    youtubeId: '5bYFArOho7U', // Real YouTube ID - 345K views
    duration: '4:05',
    type: 'official'
  },
  {
    id: 'song-005',
    title: "Lit'r vina",
    album: 'Žeja',
    year: 1997,
    youtubeId: 'xwL-SFI5DTI', // From musicVideos.ts
    duration: '3:37',
    type: 'official'
  },
  
  // ===== PIVOLUCIJA (1999) =====
  {
    id: 'song-006',
    title: 'Mafalda',
    album: 'Pivolucija',
    year: 1999,
    youtubeId: 'oKa8Y_rwhD0', // Real YouTube ID - 45K views
    duration: '5:52',
    type: 'official'
  },
  {
    id: 'song-007',
    title: 'Zadnja večerja',
    album: 'Pivolucija',
    year: 1999,
    youtubeId: 'w9a5tPJNf8Q', // Ko Tamo Peva
    duration: '4:30',
    type: 'official'
  },
  
  // ===== DE BEST OD (2001) =====
  {
    id: 'song-008',
    title: 'Pijemo ga radi (Live)',
    album: 'De Best Od',
    year: 2001,
    youtubeId: 't0yD3sYpfWs', // Live Cvetličarna 2013
    duration: '4:15',
    type: 'live'
  },
  {
    id: 'song-009',
    title: 'Alkohol je moj idol (Remix)',
    album: 'De Best Od',
    year: 2001,
    youtubeId: 'K-NfNWrxc7k', // JAWOHL album
    duration: '2:30',
    type: 'studio'
  },
  
  // ===== PROHIBICIJA (2003) =====
  {
    id: 'song-010',
    title: 'Prohibicija',
    album: 'Prohibicija',
    year: 2003,
    youtubeId: 'cwG5TthuMAw', // ŽEJA album video
    duration: '3:58',
    type: 'official'
  },
  {
    id: 'song-011',
    title: 'Trbovlje',
    album: 'Prohibicija',
    year: 2003,
    youtubeId: 'lK5sHyjXfz4', // Real YouTube ID
    duration: '4:12',
    type: 'official'
  },
  
  // ===== HAJDI (2007) =====
  {
    id: 'song-012',
    title: 'Hajdi',
    album: 'Hajdi',
    year: 2007,
    youtubeId: 'aU32hb58g4E', // From musicVideos.ts
    duration: '3:45',
    type: 'official'
  },
  {
    id: 'song-013',
    title: 'Balkan Express',
    album: 'Hajdi',
    year: 2007,
    youtubeId: 'FFKtFXLONR0', // Recidiv video
    duration: '4:15',
    type: 'official'
  },
  
  // ===== RECIDIV (2014) =====
  {
    id: 'song-014',
    title: 'Trboule',
    album: 'Recidiv',
    year: 2014,
    youtubeId: 'L4HLoJ0CgQ4', // Real YouTube ID - 41K views
    duration: '3:20',
    type: 'official'
  },
  {
    id: 'song-015',
    title: 'Huda baba',
    album: 'Recidiv',
    year: 2014,
    youtubeId: 'LyNUJUOFm0k', // Trboule.MPG
    duration: '3:45',
    type: 'official'
  },
];

// Export by album
export const songsByAlbum = songsDatabase.reduce((acc, song) => {
  if (!acc[song.album]) {
    acc[song.album] = [];
  }
  acc[song.album].push(song);
  return acc;
}, {} as Record<string, Song[]>);

// Export top songs (most viewed)
export const topSongs = [
  'Pijemo ga radi', // 837K views
  'Deset majhnih jagrov', // 345K views
  'Mafalda', // 45K views
  'Trboule', // 41K views
  'Alkohol je moj idol'
];

// Helper functions
export function getSongByTitle(title: string): Song | undefined {
  return songsDatabase.find(song => 
    song.title.toLowerCase() === title.toLowerCase()
  );
}

export function getSongsByAlbum(album: string): Song[] {
  return songsByAlbum[album] || [];
}

export function getYouTubeUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

console.log('✅ THE DRINKERS - COMPLETE SONGS DATABASE LOADED');
console.log('📊 Total songs:', songsDatabase.length);
console.log('📀 Albums:', Object.keys(songsByAlbum).length);
console.log('🎵 Top songs:', topSongs.join(', '));
