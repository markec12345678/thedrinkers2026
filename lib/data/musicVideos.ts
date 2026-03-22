/**
 * The Drinkers - Official Music Videos
 * 
 * Curated collection of official music videos
 * Source: YouTube, Last.fm, Official Website
 */

export const musicVideos = [
  {
    id: '1',
    title: 'Deset majhnih jagrov',
    youtubeId: '5bYFArOho7U',
    thumbnail: 'https://img.youtube.com/vi/5bYFArOho7U/maxresdefault.jpg',
    duration: '3:45',
    views: '21K+',
    year: 2010,
    album: 'De Best Od',
    featured: true, // Hero video
  },
  {
    id: '2',
    title: 'Pijemo ga radi',
    youtubeId: 'hkHHvb2eDb4',
    thumbnail: 'https://img.youtube.com/vi/hkHHvb2eDb4/maxresdefault.jpg',
    duration: '3:30',
    views: '15K+',
    year: 2001,
    album: 'De Best Od',
    featured: true,
  },
  {
    id: '3',
    title: 'Ko Tamo Peva',
    youtubeId: '7HHx9c3YnMQ',
    thumbnail: 'https://img.youtube.com/vi/7HHx9c3YnMQ/maxresdefault.jpg',
    duration: '4:12',
    views: '8K+',
    year: 2001,
    album: 'De Best Od',
    featured: false,
  },
  {
    id: '4',
    title: 'Bosten',
    youtubeId: 'oKa8Y_rwhD0',
    thumbnail: 'https://img.youtube.com/vi/oKa8Y_rwhD0/maxresdefault.jpg',
    duration: '3:58',
    views: '5K+',
    year: 2014,
    album: 'Hajdi',
    featured: false,
  },
  {
    id: '5',
    title: 'Slovenac',
    youtubeId: 'FFKtFXLONR0',
    thumbnail: 'https://img.youtube.com/vi/FFKtFXLONR0/maxresdefault.jpg',
    duration: '4:05',
    views: '2.2K+',
    year: 2013,
    album: 'Recidiv',
    featured: false,
  },
  {
    id: '6',
    title: 'Lepi In Trezni',
    youtubeId: 'd3ygw0J_VgQ',
    thumbnail: 'https://img.youtube.com/vi/d3ygw0J_VgQ/maxresdefault.jpg',
    duration: '3:52',
    views: '3K+',
    year: 2016,
    album: 'Lepi In Trezni',
    featured: false,
  },
  {
    id: '7',
    title: 'Recidiv',
    youtubeId: 'aU32hb58g4E',
    thumbnail: 'https://img.youtube.com/vi/aU32hb58g4E/maxresdefault.jpg',
    duration: '4:20',
    views: '2K+',
    year: 2007,
    album: 'Recidiv',
    featured: false,
  },
  {
    id: '8',
    title: 'Žeja',
    youtubeId: 'xwL-SFI5DTI',
    thumbnail: 'https://img.youtube.com/vi/xwL-SFI5DTI/maxresdefault.jpg',
    duration: '3:38',
    views: '1.5K+',
    year: 2003,
    album: 'Žeja',
    featured: false,
  },
];

// Featured videos for homepage hero
export const featuredVideos = musicVideos.filter(v => v.featured);

// All videos sorted by year (newest first)
export const allVideosSorted = [...musicVideos].sort((a, b) => b.year - a.year);

// Videos by album
export const videosByAlbum = musicVideos.reduce((acc, video) => {
  if (!acc[video.album]) {
    acc[video.album] = [];
  }
  acc[video.album].push(video);
  return acc;
}, {} as Record<string, typeof musicVideos>);

// Video categories
export const videoCategories = {
  all: musicVideos,
  featured: featuredVideos,
  mostViewed: [...musicVideos].sort((a, b) => {
    const aViews = parseInt(a.views.replace('K+', '000').replace('M+', '000000'));
    const bViews = parseInt(b.views.replace('K+', '000').replace('M+', '000000'));
    return bViews - aViews;
  }),
  newest: allVideosSorted,
  oldest: [...musicVideos].sort((a, b) => a.year - b.year),
};

// YouTube embed URL helper
export const getYouTubeEmbedUrl = (videoId: string) => {
  return `https://www.youtube.com/embed/${videoId}`;
};

// YouTube watch URL helper
export const getYouTubeWatchUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// Thumbnail URL helper (different qualities)
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres') => {
  const qualities = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg',
    high: 'hqdefault.jpg',
    maxres: 'maxresdefault.jpg',
  };
  return `https://img.youtube.com/vi/${videoId}/${qualities[quality]}`;
};

export default musicVideos;
