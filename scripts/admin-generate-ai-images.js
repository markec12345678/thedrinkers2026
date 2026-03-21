#!/usr/bin/env node

/**
 * The Drinkers - AI Image Generator (ADMIN ONLY)
 * Batch generate all official band visuals
 * 
 * Usage:
 *   node scripts/admin-generate-ai-images.js
 * 
 * Requirements:
 *   - inference.sh CLI installed and logged in
 *   - OR use Pollinations.ai (free, no auth)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Output directories
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'ai');
const DIRS = {
  albums: path.join(OUTPUT_DIR, 'albums'),
  band: path.join(OUTPUT_DIR, 'band'),
  social: path.join(OUTPUT_DIR, 'social'),
  merch: path.join(OUTPUT_DIR, 'merch'),
  posters: path.join(OUTPUT_DIR, 'posters'),
};

// Use Pollinations.ai (FREE) or inference.sh (PREMIUM)
const USE_PREMIUM = false; // Set to true for inference.sh

// Pollinations.ai API
const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt/';

// The Drinkers brand prompts
const PROMPTS = {
  albums: [
    {
      name: 'lepi-in-trezni',
      prompt: 'Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, crimson red and black color scheme, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality, music industry standard',
      aspect: '1024:1024'
    },
    {
      name: 'zeja',
      prompt: 'Vintage rock album artwork "Žeja" (Thirst), crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, professional music photography, dramatic lighting, square format',
      aspect: '1024:1024'
    },
    {
      name: 'pivolucija',
      prompt: 'Revolution-themed album cover "Pivolucija", beer revolution concept, crimson red and silver colors, The Drinkers Slovenian rock band, bold typography, high quality album artwork, 4K resolution',
      aspect: '1024:1024'
    },
    {
      name: 'prohibicija',
      prompt: 'Prohibition era themed album cover, vintage 1920s style meets modern rock, The Drinkers band, crimson accents, speakeasy aesthetic, professional album design, square format',
      aspect: '1024:1024'
    },
    {
      name: 'hajdi',
      prompt: 'Modern rock album cover "Hajdi", energetic design, crimson red guitar silhouette, The Drinkers Slovenian rock, dynamic composition, studio quality, 4K album artwork',
      aspect: '1024:1024'
    },
    {
      name: 'recidiv',
      prompt: 'Dark rock album cover "Recidiv", moody atmosphere, crimson and black gradient, The Drinkers band logo, professional music industry standard, high contrast design',
      aspect: '1024:1024'
    }
  ],

  band: [
    {
      name: 'promo-2026',
      prompt: 'Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments (guitars, bass, drums, microphone), dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography',
      aspect: '1920:1080'
    },
    {
      name: 'live-performance',
      prompt: 'The Drinkers live in concert, crowd surfing fan, energetic rock show, crimson stage lights, beer mugs in air, Slovenian flag colors, professional concert photography, dynamic action shot',
      aspect: '1920:1080'
    },
    {
      name: 'backstage-portrait',
      prompt: 'The Drinkers band members backstage portrait, casual rock style, leather jackets, guitars, intimate backstage lighting, professional band photography, authentic rock and roll vibe',
      aspect: '1024:768'
    }
  ],

  social: [
    {
      name: 'instagram-post',
      prompt: 'Instagram square post for The Drinkers rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic, bold text space',
      aspect: '1024:1024'
    },
    {
      name: 'twitter-header',
      prompt: 'Twitter header banner for The Drinkers rock band, crimson red gradient background, musical notes and beer icons, professional social media design',
      aspect: '1500:500'
    },
    {
      name: 'facebook-cover',
      prompt: 'Facebook cover photo for The Drinkers, Slovenian rock band, full band photo with crimson lighting, space for text overlay, professional social media branding',
      aspect: '820:312'
    }
  ],

  merch: [
    {
      name: 'tshirt-pijemo',
      prompt: 'Black t-shirt mockup with "Pijemo ga radi" The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready',
      aspect: '800:1000'
    },
    {
      name: 'hoodie-mockup',
      prompt: 'Black hoodie mockup with The Drinkers band logo, crimson red embroidery, professional product shot, studio lighting, merchandise photography',
      aspect: '1024:1024'
    },
    {
      name: 'beer-mug',
      prompt: 'Custom beer mug with The Drinkers logo engraved, crimson red design, professional product photography, transparent background, studio lighting, merchandise mockup',
      aspect: '1024:1024'
    },
    {
      name: 'vinyl-mockup',
      prompt: 'Vinyl record mockup with The Drinkers album cover, crimson red vinyl, professional product photography, turntable setting, music merchandise',
      aspect: '1024:1024'
    }
  ],

  posters: [
    {
      name: 'tour-2026',
      prompt: 'Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities (Ljubljana, Maribor, Koper, Zagreb), crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style',
      aspect: '800:1200'
    },
    {
      name: 'orto-bar-ljubljana',
      prompt: 'Specific concert poster for The Drinkers at Orto Bar Ljubljana, date April 15 2026, crimson red background, rock band silhouette, professional event poster design',
      aspect: '800:1200'
    }
  ]
};

// Create directories
function createDirectories() {
  console.log('📁 Creating directories...\n');
  Object.values(DIRS).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created: ${dir}`);
    }
  });
  console.log('');
}

// Download image from URL
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Generate image using Pollinations.ai (FREE)
async function generateWithPollinations(category, item) {
  const [width, height] = item.aspect.split(':').map(Number);
  const encodedPrompt = encodeURIComponent(item.prompt);
  const url = `${POLLINATIONS_BASE}${encodedPrompt}?width=${width}&height=${height}&model=flux&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;
  
  const outputPath = path.join(DIRS[category], `${item.name}.jpg`);
  
  console.log(`📸 ${item.name} (${category})`);
  console.log(`   Size: ${width}x${height}`);
  
  try {
    await downloadImage(url, outputPath);
    console.log(`✅ Generated: ${outputPath}\n`);
    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
    return false;
  }
}

// Generate image using inference.sh (PREMIUM)
async function generateWithInferenceSh(category, item) {
  const { execSync } = require('child_process');
  
  const aspectMap = {
    '1024:1024': 'square',
    '1920:1080': 'landscape',
    '1024:768': 'standard',
    '1500:500': 'wide',
    '820:312': 'wide',
    '800:1000': 'portrait',
    '800:1200': 'poster',
  };
  
  const outputPath = path.join(DIRS[category], `${item.name}.jpg`);
  const model = 'falai/flux-dev-lora';
  
  const command = `infsh app run ${model} --input '${JSON.stringify({
    prompt: item.prompt,
    aspect_ratio: aspectMap[item.aspect] || 'square',
  }).replace(/'/g, "'\\''")}' --output "${outputPath}"`;
  
  console.log(`📸 ${item.name} (${category})`);
  console.log(`   Model: ${model}`);
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Generated: ${outputPath}\n`);
    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🎨 The Drinkers - AI Image Generator (ADMIN ONLY)');
  console.log('='.repeat(60));
  console.log(`Mode: ${USE_PREMIUM ? 'PREMIUM (inference.sh)' : 'FREE (Pollinations.ai)'}\n`);
  
  // Create directories
  createDirectories();
  
  // Generate images
  let total = 0;
  let success = 0;
  
  for (const [category, items] of Object.entries(PROMPTS)) {
    console.log(`\n🎯 Category: ${category.toUpperCase()}`);
    console.log('='.repeat(50));
    
    for (const item of items) {
      total++;
      
      const result = USE_PREMIUM
        ? await generateWithInferenceSh(category, item)
        : await generateWithPollinations(category, item);
      
      if (result) success++;
      
      // Small delay to avoid rate limiting
      if (!USE_PREMIUM) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ GENERATION COMPLETE!\n');
  console.log(`📊 Summary: ${success}/${total} images generated`);
  console.log(`📂 Output: ${OUTPUT_DIR}`);
  console.log('\n🎯 Next steps:');
  console.log('   1. Review images in public/images/ai/');
  console.log('   2. Replace any you don\'t like (delete and re-run)');
  console.log('   3. Images are ready to use in AIGallery component\n');
}

// Run
main().catch(console.error);
