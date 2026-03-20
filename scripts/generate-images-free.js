#!/usr/bin/env node

/**
 * The Drinkers - FREE AI Image Generator
 * Powered by Pollinations.ai - 100% FREE, No API Key, No Signup!
 * 
 * Usage:
 *   node scripts/generate-images-free.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Pollinations.ai API (FREE, no auth required!)
const BASE_URL = 'https://image.pollinations.ai/prompt/';

// Image generation prompts
const prompts = {
  // Album Covers
  albums: [
    {
      name: 'lepi-in-trezni',
      prompt: 'Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, crimson red and black color scheme, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality, music industry standard',
      aspect: '1:1'
    },
    {
      name: 'zeja',
      prompt: 'Vintage rock album artwork "Žeja" (Thirst), crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, professional music photography, dramatic lighting, square format',
      aspect: '1:1'
    },
    {
      name: 'pivolucija',
      prompt: 'Revolution-themed album cover "Pivolucija", beer revolution concept, crimson red and silver colors, The Drinkers Slovenian rock band, bold typography, high quality album artwork, 4K resolution',
      aspect: '1:1'
    },
    {
      name: 'prohibicija',
      prompt: 'Prohibition era themed album cover, vintage 1920s style meets modern rock, The Drinkers band, crimson accents, speakeasy aesthetic, professional album design, square format',
      aspect: '1:1'
    },
    {
      name: 'hajdi',
      prompt: 'Modern rock album cover "Hajdi", energetic design, crimson red guitar silhouette, The Drinkers Slovenian rock, dynamic composition, studio quality, 4K album artwork',
      aspect: '1:1'
    },
    {
      name: 'recidiv',
      prompt: 'Dark rock album cover "Recidiv", moody atmosphere, crimson and black gradient, The Drinkers band logo, professional music industry standard, high contrast design',
      aspect: '1:1'
    }
  ],

  // Band Photos
  band: [
    {
      name: 'band-promo-2026',
      prompt: 'Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments (guitars, bass, drums, microphone), dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography, 16:9 aspect ratio',
      aspect: '16:9'
    },
    {
      name: 'live-performance',
      prompt: 'The Drinkers live in concert, crowd surfing fan, energetic rock show, crimson stage lights, beer mugs in air, Slovenian flag colors, professional concert photography, dynamic action shot, 16:9',
      aspect: '16:9'
    },
    {
      name: 'backstage-portrait',
      prompt: 'The Drinkers band members backstage portrait, casual rock style, leather jackets, guitars, intimate backstage lighting, professional band photography, authentic rock and roll vibe, 4:3 aspect ratio',
      aspect: '4:3'
    }
  ],

  // Social Media
  social: [
    {
      name: 'instagram-post-concert',
      prompt: 'Instagram square post for The Drinkers rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic, bold text space, 1:1 aspect ratio',
      aspect: '1:1'
    },
    {
      name: 'twitter-header',
      prompt: 'Twitter header banner for The Drinkers rock band, crimson red gradient background, musical notes and beer icons, professional social media design, 1500x500px layout, 3:1 aspect ratio',
      aspect: '3:1'
    },
    {
      name: 'facebook-cover',
      prompt: 'Facebook cover photo for The Drinkers, Slovenian rock band, full band photo with crimson lighting, space for text overlay, professional social media branding, 820x312px layout, 2.6:1 aspect ratio',
      aspect: '2.6:1'
    }
  ],

  // Merchandise
  merch: [
    {
      name: 'tshirt-mockup-pijemo',
      prompt: 'Black t-shirt mockup with "Pijemo ga radi" The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready, 4:5 aspect ratio',
      aspect: '4:5'
    },
    {
      name: 'hoodie-mockup',
      prompt: 'Black hoodie mockup with The Drinkers band logo, crimson red embroidery, professional product shot, studio lighting, merchandise photography, square format, 1:1',
      aspect: '1:1'
    },
    {
      name: 'beer-mug-design',
      prompt: 'Custom beer mug with The Drinkers logo engraved, crimson red design, professional product photography, transparent background, studio lighting, merchandise mockup, 1:1',
      aspect: '1:1'
    },
    {
      name: 'vinyl-mockup',
      prompt: 'Vinyl record mockup with The Drinkers album cover, crimson red vinyl, professional product photography, turntable setting, music merchandise, square format, 1:1',
      aspect: '1:1'
    }
  ],

  // Tour Posters
  posters: [
    {
      name: 'tour-2026-poster',
      prompt: 'Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities (Ljubljana, Maribor, Koper, Zagreb), crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style, 2:3 aspect ratio',
      aspect: '2:3'
    },
    {
      name: 'orto-bar-ljubljana',
      prompt: 'Specific concert poster for The Drinkers at Orto Bar Ljubljana, date April 15 2026, crimson red background, rock band silhouette, professional event poster design, 2:3 aspect ratio',
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

console.log('🎨 The Drinkers - FREE AI Image Generator');
console.log('   Powered by Pollinations.ai (100% FREE, No API Key!)\n');

// Create directories
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

console.log('\n📸 Generating images...\n');

// Parse aspect ratio to pixels
function aspectToPixels(aspect) {
  const [w, h] = aspect.split(':').map(Number);
  if (w === 1 && h === 1) return { width: 1024, height: 1024 };
  if (w === 16 && h === 9) return { width: 1920, height: 1080 };
  if (w === 4 && h === 3) return { width: 1024, height: 768 };
  if (w === 3 && h === 1) return { width: 1500, height: 500 };
  if (w === 2 && h === 3) return { width: 800, height: 1200 };
  if (w === 4 && h === 5) return { width: 800, height: 1000 };
  if (w === 26 && h === 10) return { width: 820, height: 312 };
  
  // Default to square
  return { width: 1024, height: 1024 };
}

// Generate image using Pollinations.ai
function generateImage(category, item) {
  const { width, height } = aspectToPixels(item.aspect);
  const outputFile = `public/images/ai-generated/${category}/${item.name}.jpg`;
  
  // Encode prompt for URL
  const encodedPrompt = encodeURIComponent(item.prompt);
  const url = `${BASE_URL}${encodedPrompt}?width=${width}&height=${height}&model=flux&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;
  
  console.log(`📷 Generating: ${item.name} (${category})`);
  console.log(`   Size: ${width}x${height}`);
  console.log(`   URL: ${url.substring(0, 100)}...`);
  
  return new Promise((resolve) => {
    const file = fs.createWriteStream(outputFile);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`   ✅ Generated: ${outputFile}\n`);
          resolve(true);
        });
      } else {
        console.log(`   ❌ Error: HTTP ${response.statusCode}\n`);
        resolve(false);
      }
    }).on('error', (err) => {
      fs.unlink(outputFile, () => {});
      console.log(`   ❌ Error: ${err.message}\n`);
      resolve(false);
    });
  });
}

// Main execution
async function main() {
  let total = 0;
  let success = 0;
  
  for (const category of Object.keys(prompts)) {
    console.log(`\n🎯 Category: ${category.toUpperCase()}`);
    console.log('='.repeat(50));
    
    for (const item of prompts[category]) {
      total++;
      const result = await generateImage(category, item);
      if (result) success++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('\n✅ Image generation complete!\n');
  console.log(`📊 Summary: ${success}/${total} images generated\n`);
  console.log('📂 Images saved to: public/images/ai-generated/\n');
  console.log('🎉 All images generated using Pollinations.ai - 100% FREE!\n');
  console.log('🚀 Next steps:');
  console.log('   1. Review generated images in public/images/ai-generated/');
  console.log('   2. Regenerate any you don\'t like (delete and run again)');
  console.log('   3. Images are ready to use in your Next.js app!\n');
}

// Run
main().catch(console.error);
