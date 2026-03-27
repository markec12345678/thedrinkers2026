#!/usr/bin/env node

/**
 * 🎵 CREATE ALBUM COVER SVG
 * Creates placeholder album cover for Na Zdravje
 */

const fs = require("fs");
const path = require("path");

console.log("🎵 Creating album cover...\n");

const imagesPath = path.join(__dirname, "public", "images");

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" fill="url(#grad)"/>
  
  <!-- Vinyl Record -->
  <circle cx="256" cy="256" r="200" fill="#1a1a2e" stroke="#333" stroke-width="5"/>
  <circle cx="256" cy="256" r="180" fill="#16213e"/>
  <circle cx="256" cy="256" r="80" fill="#1a1a2e"/>
  <circle cx="256" cy="256" r="15" fill="#e94560"/>
  
  <!-- Text -->
  <text x="256" y="120" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="bold">
    NA ZDRAVJE
  </text>
  
  <text x="256" y="450" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)" text-anchor="middle">
    The Drinkers
  </text>
</svg>`;

const filePath = path.join(imagesPath, "album-na-zdravje.svg");
fs.writeFileSync(filePath, svg);

console.log("✅ Album cover created!\n");
console.log("📍 Saved to: " + filePath + "\n");
console.log("💡 Format: SVG (scalable vector graphics)\n");
console.log("✨ This will fix the error!\n");
