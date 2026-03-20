/**
 * The Drinkers - AI Image Generator
 * Windows PowerShell Version
 * 
 * Usage:
 *   node scripts/generate-images-win.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// API Configuration
const API_KEY = process.env.INFERENCE_SH_API_KEY || 'your-api-key-here';
const BASE_URL = 'https://api.inference.sh';

// Image prompts
const prompts = {
  albums: [
    {
      name: 'lepi-in-trezni',
      prompt: 'Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, crimson red and black color scheme, beer glass silhouette, high contrast studio lighting, 4K quality',
      aspect: '1:1'
    },
    {
      name: 'zeja',
      prompt: 'Vintage rock album artwork "Žeja", crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, professional music photography',
      aspect: '1:1'
    },
    {
      name: 'pivolucija',
      prompt: 'Revolution-themed album cover "Pivolucija", beer revolution concept, crimson red and silver colors, The Drinkers Slovenian rock band, bold typography',
      aspect: '1:1'
    }
  ],
  
  band: [
    {
      name: 'band-promo-2026',
      prompt: 'Professional rock band promotional photo, 5 musicians from The Drinkers on stage with instruments, dramatic crimson red stage lighting, energetic performance, concert atmosphere, photorealistic',
      aspect: '16:9'
    }
  ]
};

// Create directories
const dirs = [
  'public/images/ai-generated/albums',
  'public/images/ai-generated/band'
];

console.log('🎨 The Drinkers - AI Image Generator (Windows)\n');

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

console.log('\n📸 To generate images, you need to:\n');
console.log('1. Get API key from: https://inference.sh/dashboard');
console.log('2. Set environment variable:');
console.log('   $env:INFERENCE_SH_API_KEY="your-api-key-here"');
console.log('3. Run this script again\n');

console.log('📝 Example prompts ready:\n');

Object.keys(prompts).forEach(category => {
  console.log(`\n${category.toUpperCase()}:`);
  console.log('='.repeat(50));
  
  prompts[category].forEach(item => {
    console.log(`\n📷 ${item.name}`);
    console.log(`   Aspect: ${item.aspect}`);
    console.log(`   Prompt: ${item.prompt.substring(0, 100)}...`);
  });
});

console.log('\n\n🚀 Alternative: Use web interface');
console.log('   https://inference.sh/apps/seedream-4-5\n');
