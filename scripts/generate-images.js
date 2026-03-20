#!/usr/bin/env node

/**
 * The Drinkers - AI Image Generator
 * Professional images for rock band website
 * 
 * Usage:
 *   node generate-images.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors from brand
const CRIMSON = '#dc143c';
const BLACK = '#0a0a0a';
const SILVER = '#c0c0c0';

// Image generation prompts
const prompts = {
  // Album Covers
  albums: [
    {
      name: 'lepi-in-trezni',
      prompt: `Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, clean crimson red and black color scheme, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality, music industry standard, aspect ratio 1:1`,
      aspect: '1:1'
    },
    {
      name: 'zeja',
      prompt: `Vintage rock album artwork "Žeja" (Thirst), crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, professional music photography, dramatic lighting, square format for album cover`,
      aspect: '1:1'
    },
    {
      name: 'pivolucija',
      prompt: `Revolution-themed album cover "Pivolucija", beer revolution concept, crimson red and silver colors, The Drinkers Slovenian rock band, bold typography, high quality album artwork, 4K resolution`,
      aspect: '1:1'
    },
    {
      name: 'prohibicija',
      prompt: `Prohibition era themed album cover, vintage 1920s style meets modern rock, The Drinkers band, crimson accents, speakeasy aesthetic, professional album design, square format`,
      aspect: '1:1'
    },
    {
      name: 'hajdi',
      prompt: `Modern rock album cover "Hajdi", energetic design, crimson red guitar silhouette, The Drinkers Slovenian rock, dynamic composition, studio quality, 4K album artwork`,
      aspect: '1:1'
    },
    {
      name: 'recidiv',
      prompt: `Dark rock album cover "Recidiv", moody atmosphere, crimson and black gradient, The Drinkers band logo, professional music industry standard, high contrast design`,
      aspect: '1:1'
    }
  ],

  // Band Photos
  band: [
    {
      name: 'band-promo-2026',
      prompt: `Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments (guitars, bass, drums, microphone), dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography, 16:9 aspect ratio`,
      aspect: '16:9'
    },
    {
      name: 'live-performance',
      prompt: `The Drinkers live in concert, crowd surfing fan, energetic rock show, crimson stage lights, beer mugs in air, Slovenian flag colors, professional concert photography, dynamic action shot`,
      aspect: '16:9'
    },
    {
      name: 'backstage-portrait',
      prompt: `The Drinkers band members backstage portrait, casual rock style, leather jackets, guitars, intimate backstage lighting, professional band photography, authentic rock'n'roll vibe`,
      aspect: '4:3'
    }
  ],

  // Social Media
  social: [
    {
      name: 'instagram-post-concert',
      prompt: `Instagram square post for The Drinkers rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic, bold text space, 1:1 aspect ratio`,
      aspect: '1:1'
    },
    {
      name: 'twitter-header',
      prompt: `Twitter header banner for The Drinkers rock band, crimson red gradient background, musical notes and beer icons, professional social media design, 1500x500px layout, 3:1 aspect ratio`,
      aspect: '3:1'
    },
    {
      name: 'facebook-cover',
      prompt: `Facebook cover photo for The Drinkers, Slovenian rock band, full band photo with crimson lighting, space for text overlay, professional social media branding, 820x312px layout`,
      aspect: '2.6:1'
    }
  ],

  // Merchandise
  merch: [
    {
      name: 'tshirt-mockup-pijemo',
      prompt: `Black t-shirt mockup with "Pijemo ga radi" The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready, 4:5 aspect ratio`,
      aspect: '4:5'
    },
    {
      name: 'hoodie-mockup',
      prompt: `Black hoodie mockup with The Drinkers band logo, crimson red embroidery, professional product shot, studio lighting, merchandise photography, square format`,
      aspect: '1:1'
    },
    {
      name: 'beer-mug-design',
      prompt: `Custom beer mug with The Drinkers logo engraved, crimson red design, professional product photography, transparent background, studio lighting, merchandise mockup`,
      aspect: '1:1'
    },
    {
      name: 'vinyl-mockup',
      prompt: `Vinyl record mockup with The Drinkers album cover, crimson red vinyl, professional product photography, turntable setting, music merchandise, square format`,
      aspect: '1:1'
    }
  ],

  // Tour Posters
  posters: [
    {
      name: 'tour-2026-poster',
      prompt: `Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities (Ljubljana, Maribor, Koper, Zagreb), crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style, 2:3 aspect ratio`,
      aspect: '2:3'
    },
    {
      name: 'orto-bar-ljubljana',
      prompt: `Specific concert poster for The Drinkers at Orto Bar Ljubljana, date April 15 2026, crimson red background, rock band silhouette, professional event poster design, 2:3 aspect ratio`,
      aspect: '2:3'
    }
  ]
};

// Create directories
const dirs = [
  'public/images/ai-generated/albums',
  'public/images/ai-generated/band',
  'public/images/ai-generated/social',
  'public/images/ai-generated/merch',
  'public/images/ai-generated/posters'
];

console.log('🎨 The Drinkers - AI Image Generator\n');

// Create directories
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

console.log('\n📸 Generating images...\n');

// Function to generate image
function generateImage(category, item) {
  const outputFile = `public/images/ai-generated/${category}/${item.name}.jpg`;
  
  console.log(`📷 Generating: ${item.name} (${category})`);
  
  try {
    // Using Seedream 4.5 for high quality
    const command = `infsh app run bytedance/seedream-4-5 --input '${JSON.stringify({
      prompt: item.prompt,
      aspect_ratio: item.aspect
    }).replace(/'/g, "'\\''")}' --output "${outputFile}"`;
    
    console.log(`   Command: ${command.substring(0, 100)}...`);
    console.log(`   Status: ⏳ Generating...\n`);
    
    // Uncomment to actually run (requires inference.sh CLI installed and logged in)
    // execSync(command, { stdio: 'inherit' });
    
    console.log(`   Status: ✅ Generated (mock - uncomment to run real generation)\n`);
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  }
}

// Generate all images
Object.keys(prompts).forEach(category => {
  console.log(`\n🎯 Category: ${category.toUpperCase()}`);
  console.log('='.repeat(50));
  
  prompts[category].forEach(item => {
    generateImage(category, item);
  });
});

console.log('\n✅ Image generation complete!\n');
console.log('📂 Images saved to: public/images/ai-generated/\n');
console.log('🚀 Next steps:');
console.log('   1. Install inference.sh CLI: curl -fsSL https://cli.inference.sh | sh && infsh login');
console.log('   2. Uncomment execSync line in generate-images.js');
console.log('   3. Run: node generate-images.js');
console.log('   4. Images will be generated and saved automatically\n');
