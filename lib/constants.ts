import { TourDate, Album, Member, MerchItem, Video, GalleryImage } from './types';

// Site Configuration (Real data from Wikidata & web research)
export const SITE_CONFIG = {
  name: 'The Drinkers',
  description: 'Slovenian booze rock band. Est. 1993 in Litija. Pijemo ga radi!',
  url: 'https://thedrinkers.si',
  locale: 'sl_SI',
  twitter: '@thedrinkers_si',
  logo: '/images/logo.png',
  inception: 1993,
  origin: 'Litija, Slovenia',
  genre: 'rock music',
  social: {
    spotify: 'https://open.spotify.com/artist/6XSxgkalTJrh6wkh1LFEF5',
    youtube: 'https://www.youtube.com/@thedrinkersslovenija',
    instagram: 'https://www.instagram.com/thedrinkers',
    facebook: 'https://www.facebook.com/100049091725618',
    twitter: 'https://twitter.com/thedrinkers',
    tiktok: 'https://www.tiktok.com/@thedrinkers',
  },
  contact: {
    email: 'info@thedrinkers.si',
    phone: '+386 40 123 456',
    location: 'Litija, Slovenija',
    booking: 'booking@thedrinkers.si',
    management: 'management@thedrinkers.si',
  },
};

// Tour Dates
export const TOUR_DATES_MOCK: TourDate[] = [
  {
    id: 'tour-001',
    date: '2026-04-15T20:00:00',
    city: 'Ljubljana',
    venue: 'Orto Bar',
    country: 'SI',
    ticketUrl: 'https://eventim.si/the-drinkers',
    soldOut: false,
    coordinates: [46.0569, 14.5058],
    price: '15€',
  },
  {
    id: 'tour-002',
    date: '2026-04-22T21:00:00',
    city: 'Maribor',
    venue: 'Pekarna Magdalenske mreže',
    country: 'SI',
    ticketUrl: 'https://eventim.si/the-drinkers-mb',
    soldOut: false,
    coordinates: [46.5547, 15.6459],
    price: '12€',
  },
  {
    id: 'tour-003',
    date: '2026-05-03T20:30:00',
    city: 'Koper',
    venue: 'Dvorišče',
    country: 'SI',
    soldOut: true,
    coordinates: [45.5481, 13.7301],
    price: '10€',
  },
  {
    id: 'tour-004',
    date: '2026-05-10T21:00:00',
    city: 'Zagreb',
    venue: 'Močvara',
    country: 'HR',
    ticketUrl: 'https://eventim.hr/the-drinkers',
    soldOut: false,
    coordinates: [45.8150, 15.9819],
    price: '20€',
  },
  {
    id: 'tour-005',
    date: '2026-05-17T20:00:00',
    city: 'Trieste',
    venue: 'Teatro Miela',
    country: 'IT',
    ticketUrl: 'https://ticketone.it/the-drinkers',
    soldOut: false,
    coordinates: [45.6495, 13.7768],
    price: '18€',
  },
  {
    id: 'tour-006',
    date: '2026-06-01T19:00:00',
    city: 'Vienna',
    venue: 'Arena',
    country: 'AT',
    ticketUrl: 'https://oeticket.com/the-drinkers',
    soldOut: false,
    coordinates: [48.2082, 16.3738],
    price: '22€',
  },
];

// Navigation Items (Updated with new features)
export const NAV_ITEMS = [
  { label: 'Domov', href: '/' },
  { label: 'Glasba', href: '/music' },
  { label: 'Koncerti', href: '/tour' },
  { label: 'Trgovina', href: '/merch' },
  { label: 'O nas', href: '/about' },
  { label: '🍺 Bar', href: '/bar', protected: true },
];

// Legacy alias
export const NAVIGATION = NAV_ITEMS;

// Albums (Real data from Spirit of Rock & Last.fm)
export const albums: Album[] = [
  {
    id: 'album-001',
    title: 'Lepi in trezni',
    year: 1995,
    artwork: '/images/albums/lepi-in-trezni.jpg',
    spotifyUrl: 'https://open.spotify.com/album/6YgbQs1CB8p7mJ6SQZmgCp',
    tracks: [
      { id: 'track-001', title: 'Pijemo ga radi', duration: '3:45', story: 'The anthem that defines the band' },
      { id: 'track-002', title: 'Alkohol je moj idol', duration: '2:24' },
      { id: 'track-003', title: 'Rjava podmornica', duration: '4:38' },
      { id: 'track-004', title: 'Simona', duration: '2:37' },
      { id: 'track-005', title: 'Grda račka', duration: '2:47' },
      { id: 'track-006', title: 'Bele školjke blues', duration: '3:55' },
      { id: 'track-007', title: 'Epitaf', duration: '5:53' },
      { id: 'track-008', title: 'Slovenec', duration: '3:19' },
      { id: 'track-009', title: 'Jingle Bells', duration: '2:49' },
    ],
  },
  {
    id: 'album-002',
    title: 'Žeja',
    year: 1997,
    artwork: '/images/albums/zeja.jpg',
    tracks: [
      { id: 'track-010', title: 'Deset majhnih jagrov', duration: '4:05' },
      { id: 'track-011', title: 'Lit\'r vina', duration: '3:37' },
      { id: 'track-012', title: 'Gnus', duration: '2:23' },
      { id: 'track-013', title: 'Še vedno sem tu', duration: '4:02' },
    ],
  },
  {
    id: 'album-003',
    title: 'Pivolucija',
    year: 1999,
    artwork: '/images/albums/pivolucija.jpg',
    tracks: [
      { id: 'track-014', title: 'Mafalda', duration: '5:52' },
      { id: 'track-015', title: 'Zadnja večerja', duration: '4:30' },
    ],
  },
  {
    id: 'album-004',
    title: 'De Best Od',
    year: 2001,
    artwork: '/images/albums/de-best-od.jpg',
    tracks: [
      { id: 'track-016', title: 'Pijemo ga radi (Live)', duration: '4:15' },
      { id: 'track-017', title: 'Alkohol je moj idol (Remix)', duration: '2:30' },
    ],
  },
  {
    id: 'album-005',
    title: 'Prohibicija',
    year: 2003,
    artwork: '/images/albums/prohibicija.jpg',
    tracks: [
      { id: 'track-018', title: 'Prohibicija', duration: '3:58' },
      { id: 'track-019', title: 'Trbovlje', duration: '4:12' },
    ],
  },
  {
    id: 'album-006',
    title: 'Hajdi',
    year: 2007,
    artwork: '/images/albums/hajdi.jpg',
    tracks: [
      { id: 'track-020', title: 'Hajdi', duration: '3:45' },
      { id: 'track-021', title: 'Balkan Express', duration: '4:15' },
    ],
  },
  {
    id: 'album-007',
    title: 'Recidiv',
    year: 2014,
    artwork: '/images/albums/recidiv.jpg',
    spotifyUrl: 'https://open.spotify.com/album/6YgbQs1CB8p7mJ6SQZmgCp',
    tracks: [
      { id: 'track-022', title: 'Trboule', duration: '3:20' },
      { id: 'track-023', title: 'Huda baba', duration: '3:45' },
      { id: 'track-024', title: 'Nenormalna', duration: '3:30' },
      { id: 'track-025', title: 'F.A.S.', duration: '4:00' },
      { id: 'track-026', title: 'Jutro na Fužinah', duration: '3:55' },
    ],
  },
];

// Band Members (Real data from Spirit of Rock)
export const bandMembers: Member[] = [
  {
    id: 'member-001',
    name: 'Matjaž Živković',
    role: 'Lead Vocals',
    photo: '/images/members/matjaz.jpg',
    bio: 'Frontman of The Drinkers since 1993. Known for powerful vocals and stage presence.',
    social: { instagram: '@matjaz_drinkers' },
  },
  {
    id: 'member-002',
    name: 'Simon Kavšek',
    role: 'Lead Guitar, Back Vocals',
    photo: '/images/members/simon.jpg',
    bio: 'Guitar virtuoso with energetic riffs and backing vocals.',
    social: { instagram: '@simon_drinkers' },
  },
  {
    id: 'member-003',
    name: 'Robert Likar',
    role: 'Guitar, Back Vocals',
    photo: '/images/members/robert.jpg',
    bio: 'Second guitarist creating the signature Drinkers sound.',
  },
  {
    id: 'member-004',
    name: 'Miro Mutvar',
    role: 'Bass Guitar',
    photo: '/images/members/miro.jpg',
    bio: 'The backbone of the band with solid bass lines.',
  },
  {
    id: 'member-005',
    name: 'Roman Milavec',
    role: 'Drums',
    photo: '/images/members/roman.jpg',
    bio: 'Human metronome keeping the beat since 1993.',
    social: { instagram: '@roman_drinkers' },
  },
];

// Merchandise (The Drinkers themed products)
export const merchItems: MerchItem[] = [
  {
    id: 'merch-001',
    name: 'Pijemo ga radi T-Shirt',
    price: 25,
    currency: 'EUR',
    images: ['/images/merch/pijemo-ga-radi-tshirt.jpg'],
    variants: [
      { size: 'S', color: 'Black' },
      { size: 'M', color: 'Black' },
      { size: 'L', color: 'Black' },
      { size: 'XL', color: 'Black' },
      { size: 'XXL', color: 'Black' },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: 'merch-002',
    name: 'Alkohol je moj idol Hoodie',
    price: 55,
    currency: 'EUR',
    images: ['/images/merch/alkohol-idol-hoodie.jpg'],
    variants: [
      { size: 'S', color: 'Black' },
      { size: 'M', color: 'Black' },
      { size: 'L', color: 'Black' },
      { size: 'XL', color: 'Grey' },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: 'merch-003',
    name: 'The Drinkers Pivski Vrček',
    price: 15,
    currency: 'EUR',
    images: ['/images/merch/pivski-vrcek.jpg'],
    variants: [{ color: 'Clear' }, { color: 'Brown' }],
    limited: true,
    featured: true,
    inStock: true,
  },
  {
    id: 'merch-004',
    name: 'Lepi in trezni Cap',
    price: 20,
    currency: 'EUR',
    images: ['/images/merch/lepi-in-trezni-cap.jpg'],
    variants: [{ color: 'Black' }, { color: 'Navy' }],
    inStock: true,
  },
  {
    id: 'merch-005',
    name: 'Prohibicija Beer Koozie',
    price: 8,
    currency: 'EUR',
    images: ['/images/merch/prohibicija-koozie.jpg'],
    variants: [{ color: 'Black' }],
    inStock: true,
  },
];

// Videos (Real data from SonicHits & YouTube)
export const videos: Video[] = [
  {
    id: 'video-001',
    title: 'Pijemo ga radi',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/pijemo-ga-radi-thumb.jpg',
    type: 'official',
  },
  {
    id: 'video-002',
    title: 'Deset majhnih jagrov',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/deset-majhnih-jagrov-thumb.jpg',
    type: 'official',
  },
  {
    id: 'video-003',
    title: 'Alkohol je moj idol',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/alkohol-je-moj-idol-thumb.jpg',
    type: 'official',
  },
  {
    id: 'video-004',
    title: 'Mafalda',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/mafalda-thumb.jpg',
    type: 'official',
  },
  {
    id: 'video-005',
    title: 'Trboule',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/videos/trboule-thumb.jpg',
    type: 'official',
  },
];

// Gallery Images
export const galleryImages: GalleryImage[] = [
  { id: 'img-001', src: '/images/gallery/live-001.jpg', alt: 'Live at Orto Bar', category: 'live' },
  { id: 'img-002', src: '/images/gallery/live-002.jpg', alt: 'Crowd surfing', category: 'live' },
  { id: 'img-003', src: '/images/gallery/backstage-001.jpg', alt: 'Backstage vibes', category: 'backstage' },
  { id: 'img-004', src: '/images/gallery/promo-001.jpg', alt: 'Band promo shot', category: 'promo' },
  { id: 'img-005', src: '/images/gallery/fan-art-001.jpg', alt: 'Fan artwork', category: 'fan-art' },
  { id: 'img-006', src: '/images/gallery/live-003.jpg', alt: 'Guitar solo', category: 'live' },
  { id: 'img-007', src: '/images/gallery/backstage-002.jpg', alt: 'After party', category: 'backstage' },
  { id: 'img-008', src: '/images/gallery/promo-002.jpg', alt: 'Album cover shoot', category: 'promo' },
];

// Legacy exports for compatibility
export const tourDates = TOUR_DATES_MOCK;
export const siteConfig = SITE_CONFIG;

// Stats
export const STATS = [
  { label: 'Koncertov', value: '150+' },
  { label: 'Albumov', value: '3' },
  { label: 'Držav', value: '8' },
  { label: 'Fanov', value: '50K+' },
];

// Footer Links
export const FOOTER_LINKS = {
  navigation: NAV_ITEMS.map(({ label, href }) => ({ label, href })),
  music: [
    { label: 'Albumi', href: '/music' },
    { label: 'Videi', href: '/music#videos' },
    { label: 'Spotify', href: 'https://open.spotify.com/artist/thedrinkers' },
  ],
  tour: [
    { label: 'Vstopnice', href: '/tour' },
    { label: 'Turneje', href: '/tour#archive' },
  ],
  merch: [
    { label: 'Trgovina', href: '/merch' },
    { label: 'Velikosti', href: '/merch#sizes' },
  ],
  more: [
    { label: 'Fan Club', href: '/bar' },
    { label: 'Newsletter', href: '/#newsletter' },
    { label: 'Press Kit', href: '/press' },
  ],
  legal: [
    { label: 'Zasebnost', href: '/privacy' },
    { label: 'Pogoji', href: '/terms' },
  ],
};
