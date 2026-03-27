#!/usr/bin/env node

/**
 * 🖼️ CREATE MISSING ALBUM IMAGE
 * Creates placeholder for album-na-zdravje.jpg
 */

const fs = require("fs");
const path = require("path");

console.log("🖼️  Creating missing album image...\n");

const imagesPath = path.join(__dirname, "public", "images");

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

// Create placeholder album cover
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="800" height="800" fill="url(#grad)"/>
  
  <!-- Vinyl Record -->
  <circle cx="400" cy="400" r="300" fill="#1a1a2e" stroke="#333" stroke-width="10"/>
  <circle cx="400" cy="400" r="280" fill="#16213e"/>
  <circle cx="400" cy="400" r="100" fill="#1a1a2e"/>
  <circle cx="400" cy="400" r="20" fill="#e94560"/>
  
  <!-- Text -->
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">
    NA ZDRAVJE
  </text>
  
  <text x="400" y="650" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.6)" text-anchor="middle">
    The Drinkers
  </text>
</svg>`;

const filePath = path.join(imagesPath, "album-na-zdravje.jpg");
fs.writeFileSync(filePath, svg.replace(".svg", ".jpg"));

console.log("✅ Album image created!\n");
console.log("📍 Saved to: " + filePath + "\n");
console.log("✨ This will fix the error on homepage\n");
