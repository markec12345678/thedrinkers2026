/**
 * Fan Art Gallery Types
 */

export interface FanArt {
  id: string;
  userId: string;
  username: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'featured';
  category: FanArtCategory;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  aiEnhanced: boolean;
  originalImageUrl?: string;
  merchEligible: boolean;
  moderatorNotes?: string;
}

export type FanArtCategory = 
  | 'sketch'
  | 'painting'
  | 'digital'
  | 'photo'
  | 'mixed-media'
  | 'other';

export interface FanArtSubmission {
  title: string;
  description?: string;
  category: FanArtCategory;
  image: File;
  agreeToTerms: boolean;
  allowAIEnhancement: boolean;
  merchInterest: boolean;
}

export interface FanArtTerms {
  copyrightOwner: 'fan' | 'band' | 'shared';
  commercialUse: boolean;
  attribution: boolean;
  merchRoyalty: number; // percentage
}

/**
 * Fan Art Gallery Stats
 */
export interface FanArtStats {
  totalSubmissions: number;
  pendingReview: number;
  approved: number;
  featured: number;
  totalLikes: number;
  totalViews: number;
  topArtists: Array<{
    userId: string;
    username: string;
    submissions: number;
    likes: number;
  }>;
}

/**
 * Moderation Queue Item
 */
export interface ModerationItem {
  id: string;
  submission: FanArt;
  submittedAt: Date;
  priority: 'normal' | 'high' | 'featured-candidate';
  flags: string[];
  reportCount: number;
}

/**
 * Fan Art Contest
 */
export interface FanArtContest {
  id: string;
  title: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'ended';
  prize: string;
  rules: string[];
  submissions: number;
  votes: number;
}

/**
 * Default terms for fan art submission
 */
export const DEFAULT_FAN_ART_TERMS: FanArtTerms = {
  copyrightOwner: 'fan', // Fan retains copyright
  commercialUse: false, // No commercial use without permission
  attribution: true, // Band must credit artist
  merchRoyalty: 10, // 10% royalty if used on merch
};

/**
 * Categories with display info
 */
export const FAN_ART_CATEGORIES = {
  sketch: {
    name: 'Sketch / Risba',
    icon: '✏️',
    description: 'Ročno risane skice',
  },
  painting: {
    name: 'Painting / Slika',
    icon: '🎨',
    description: 'Malarije in slike',
  },
  digital: {
    name: 'Digital Art',
    icon: '💻',
    description: 'Digitalno ustvarjeno',
  },
  photo: {
    name: 'Photography',
    icon: '📷',
    description: 'Fotografije s koncertov',
  },
  'mixed-media': {
    name: 'Mixed Media',
    icon: '🖼️',
    description: 'Kombinacija tehnik',
  },
  other: {
    name: 'Other / Ostalo',
    icon: '✨',
    description: 'Drugačna umetnost',
  },
};

/**
 * Upload limits
 */
export const UPLOAD_LIMITS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxPerUser: 10, // Max submissions per user
  minTitleLength: 3,
  maxTitleLength: 100,
  maxDescriptionLength: 500,
};

/**
 * Moderation guidelines
 */
export const MODERATION_GUIDELINES = {
  rejectReasons: [
    'Inappropriate content',
    'Copyright infringement',
    'Low quality',
    'Not band-related',
    'Duplicate submission',
    'Other',
  ],
  approveCriteria: [
    'Related to The Drinkers',
    'Original artwork',
    'Appropriate content',
    'Meets quality standards',
    'No copyright issues',
  ],
  featureCriteria: [
    'Exceptional quality',
    'High engagement',
    'Creative interpretation',
    'Community favorite',
  ],
};

/**
 * Check if file is valid
 */
export function validateUpload(file: File): { valid: boolean; error?: string } {
  // Check size
  if (file.size > UPLOAD_LIMITS.maxSize) {
    return {
      valid: false,
      error: `File too large. Max ${UPLOAD_LIMITS.maxSize / 1024 / 1024}MB`,
    };
  }

  // Check format
  if (!UPLOAD_LIMITS.allowedFormats.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF',
    };
  }

  return { valid: true };
}

/**
 * Calculate fan art score for ranking
 */
export function calculateFanArtScore(art: FanArt): number {
  const viewsScore = art.views * 0.1;
  const likesScore = art.likes * 10;
  const featuredBonus = art.status === 'featured' ? 500 : 0;
  const recencyBonus = Math.max(0, 100 - daysSince(art.createdAt));
  
  return viewsScore + likesScore + featuredBonus + recencyBonus;
}

function daysSince(date: Date): number {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Get contest prizes
 */
export const CONTEST_PRIZES = {
  first: {
    name: '1st Place',
    prize: 'Limited Edition Merch Pack + Backstage Pass',
    badge: '🥇',
  },
  second: {
    name: '2nd Place',
    prize: 'VIP Merch Discount (50%)',
    badge: '🥈',
  },
  third: {
    name: '3rd Place',
    prize: 'VIP Merch Discount (25%)',
    badge: '🥉',
  },
  honorable: {
    name: 'Honorable Mention',
    prize: 'Fan Club Badge',
    badge: '⭐',
  },
};
