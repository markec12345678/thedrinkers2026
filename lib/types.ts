// Core Data Types for The Drinkers Website

// Export AI types
export * from "./types/ai";

export interface TourDate {
  id: string;
  date: string; // ISO string
  city: string;
  venue: string;
  country: "SI" | "AT" | "HR" | "IT" | "EU";
  ticketUrl?: string;
  soldOut?: boolean;
  coordinates?: [number, number]; // [lat, lng] for map
  price?: string;
  address?: string;
}

export interface Album {
  id: string;
  title: string;
  year: number;
  artwork: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  duration: string; // "3:45"
  lyrics?: string;
  story?: string; // Behind the song
  youtubeUrl?: string; // YouTube video URL
}

export interface Member {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  social?: { instagram?: string; spotify?: string };
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  currency: "EUR";
  images: string[];
  variants: { size?: string; color?: string }[];
  limited?: boolean;
  featured?: boolean;
  inStock?: boolean;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail?: string;
  type: "official" | "live" | "behind-scenes";
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category: "live" | "backstage" | "promo" | "fan-art";
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage?: string;
  author: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  preferences: {
    tourUpdates: boolean;
    merchDrops: boolean;
    exclusiveContent: boolean;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
