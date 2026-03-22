/**
 * @fileoverview Hero Section Image Configuration
 * 
 * This file contains the configuration for hero section images
 * for The Drinkers official website.
 */

// Hero Section Images
export const heroImages = {
  // Primary hero background (largest, best quality)
  primary: {
    src: '/images/hero/hero-bg.webp',
    alt: 'The Drinkers - Slovenian Booze Rock Band performing live on stage',
    size: '126 KB',
    dimensions: {
      width: 1920,
      height: 1080,
      aspectRatio: '16:9'
    },
    priority: true, // Load with high priority
    quality: 90 // High quality for hero
  },
  
  // Alternative hero background
  alternative: {
    src: '/images/hero/hero-alt.webp',
    alt: 'The Drinkers band logo with crimson red stage lights',
    size: '67 KB',
    dimensions: {
      width: 1920,
      height: 1080,
      aspectRatio: '16:9'
    },
    priority: false,
    quality: 85
  }
};

// Band Member Images
export const bandMembersImages = [
  {
    id: 1,
    src: '/images/band-members/member-1.jpg',
    alt: 'The Drinkers band member 1',
    size: '10 KB',
    role: 'Vocals' // Update with actual role
  },
  {
    id: 2,
    src: '/images/band-members/member-2.jpg',
    alt: 'The Drinkers band member 2',
    size: '14 KB',
    role: 'Guitar' // Update with actual role
  },
  {
    id: 3,
    src: '/images/band-members/member-3.jpg',
    alt: 'The Drinkers band member 3',
    size: '9 KB',
    role: 'Bass' // Update with actual role
  },
  {
    id: 4,
    src: '/images/band-members/member-4.jpg',
    alt: 'The Drinkers band member 4',
    size: '14 KB',
    role: 'Drums' // Update with actual role
  },
  {
    id: 5,
    src: '/images/band-members/member-5.jpg',
    alt: 'The Drinkers band member 5',
    size: '14 KB',
    role: 'Guitar/Keys' // Update with actual role
  }
];

// Gallery Images
export const galleryImages = [
  {
    id: 1,
    src: '/images/gallery/concert-1.jpg',
    alt: 'The Drinkers live concert performance',
    size: '9 KB',
    category: 'concert'
  },
  {
    id: 2,
    src: '/images/gallery/concert-2.jpg',
    alt: 'The Drinkers band on stage',
    size: '8 KB',
    category: 'concert'
  },
  {
    id: 3,
    src: '/images/gallery/backstage-1.jpg',
    alt: 'The Drinkers backstage',
    size: '9 KB',
    category: 'backstage'
  },
  {
    id: 4,
    src: '/images/gallery/backstage-2.jpg',
    alt: 'The Drinkers behind the scenes',
    size: '5 KB',
    category: 'backstage'
  },
  {
    id: 5,
    src: '/images/gallery/promo-1.jpg',
    alt: 'The Drinkers promotional photo',
    size: '7 KB',
    category: 'promo'
  }
];

// Event Images
export const eventImages = [
  {
    id: 1,
    src: '/images/events/event-1.webp',
    alt: 'The Drinkers concert event',
    size: '13 KB',
    type: 'concert'
  },
  {
    id: 2,
    src: '/images/events/event-2.webp',
    alt: 'The Drinkers tour date',
    size: '10 KB',
    type: 'tour'
  }
];

// Social Media Images
export const socialMediaImages = {
  // Open Graph / Social sharing
  ogImage: {
    src: '/images/hero/hero-bg.webp', // Reuse hero image
    alt: 'The Drinkers - Official Website',
    dimensions: {
      width: 1200,
      height: 630
    }
  },
  
  // Twitter Card
  twitterImage: {
    src: '/images/hero/hero-bg.webp',
    alt: 'The Drinkers Band',
    dimensions: {
      width: 1200,
      height: 600
    }
  }
};

// Image Optimization Settings
export const imageOptimization = {
  // Next.js Image component defaults
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  // Quality settings
  quality: {
    hero: 90,
    gallery: 85,
    thumbnail: 75,
    social: 80
  },
  
  // Formats (in order of preference)
  formats: ['image/webp', 'image/jpeg'],
  
  // Loading strategies
  loading: {
    hero: 'lazy', // But with priority=true
    gallery: 'lazy',
    members: 'lazy'
  }
};

// SEO Image Metadata
export const imageSEO = {
  // Structured data for images
  schema: {
    '@type': 'ImageObject',
    inLanguage: 'sl-SI',
    contentUrl: 'https://thedrinkers.si/images/hero/hero-bg.webp',
    url: 'https://thedrinkers.si',
    description: 'The Drinkers - Slovenian Booze Rock Band',
    copyrightYear: '2026'
  },
  
  // Alt text best practices
  altTextGuidelines: {
    include: [
      'Band name: The Drinkers',
      'Activity: performing, concert, live',
      'Location: Slovenia, stage',
      'Genre: rock, booze rock'
    ],
    avoid: [
      'Generic: image, photo, picture',
      'Redundant: band image (already in context)',
      'Too long: keep under 125 characters'
    ]
  }
};

// Responsive Image Breakpoints
export const responsiveBreakpoints = {
  mobile: {
    maxWidth: 640,
    imageWidth: 640,
    quality: 75
  },
  tablet: {
    maxWidth: 1024,
    imageWidth: 1024,
    quality: 80
  },
  desktop: {
    maxWidth: 1920,
    imageWidth: 1920,
    quality: 90
  },
  retina: {
    maxWidth: 3840,
    imageWidth: 3840,
    quality: 90
  }
};

// Export all as single object
export const imagesConfig = {
  hero: heroImages,
  bandMembers: bandMembersImages,
  gallery: galleryImages,
  socialMedia: socialMediaImages,
  optimization: imageOptimization,
  seo: imageSEO,
  responsive: responsiveBreakpoints
};

export default imagesConfig;
