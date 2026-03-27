#!/usr/bin/env node

/**
 * 🎸 ADD GUITAR SOLO PRODUCT IMAGE
 * Creates professional product mockup for Guitar Solo product
 */

const fs = require("fs");
const path = require("path");

console.log("🎸 Adding Guitar Solo Product Image...\n");

// Guitar Solo product ID (6th product - index 5)
const productId = "41f0dfcf-eb65-49d1-b11f-f4f9c7697df5";

const imagesPath = path.join(__dirname, "public", "images", "drops");

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

// Create professional guitar/pin mockup SVG
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="20" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1000" height="1000" fill="url(#grad)"/>
  
  <!-- Guitar/Pin Icon -->
  <text x="500" y="350" font-family="Arial, sans-serif" font-size="240" text-anchor="middle" filter="url(#shadow)">
    🎸
  </text>
  
  <!-- Product Name -->
  <text x="500" y="480" font-family="Arial, sans-serif" font-size="56" fill="white" text-anchor="middle" font-weight="bold">
    Guitar Solo
  </text>
  
  <!-- Brand -->
  <text x="500" y="540" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    The Drinkers
  </text>
  
  <!-- Price Tag -->
  <rect x="350" y="590" width="300" height="90" rx="12" fill="rgba(168,85,247,0.3)"/>
  <text x="500" y="648" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">
    €25.00
  </text>
  
  <!-- Limited Edition Badge -->
  <circle cx="800" cy="200" r="90" fill="#e94560" opacity="0.9"/>
  <text x="800" y="185" font-family="Arial, sans-serif" font-size="26" fill="white" text-anchor="middle" font-weight="bold">
    LIMITED
  </text>
  <text x="800" y="215" font-family="Arial, sans-serif" font-size="26" fill="white" text-anchor="middle" font-weight="bold">
    EDITION
  </text>
  
  <!-- Watermark -->
  <text x="500" y="900" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.4)" text-anchor="middle">
    thedrinkers.si
  </text>
  
  <!-- Decorative Music Notes -->
  <text x="150" y="200" font-family="Arial, sans-serif" font-size="60" fill="rgba(255,255,255,0.2)">
    ♪
  </text>
  <text x="850" y="800" font-family="Arial, sans-serif" font-size="60" fill="rgba(255,255,255,0.2)">
    ♫
  </text>
  <text x="200" y="750" font-family="Arial, sans-serif" font-size="50" fill="rgba(255,255,255,0.15)">
    ♬
  </text>
  <text x="800" y="350" font-family="Arial, sans-serif" font-size="50" fill="rgba(255,255,255,0.15)">
    ♪
  </text>
</svg>`;

const filePath = path.join(imagesPath, `${productId}.svg`);
fs.writeFileSync(filePath, svg);

console.log("✅ Guitar Solo image created!\n");
console.log("📍 Saved to: " + filePath + "\n");
console.log("🎸 Product Details:\n");
console.log("   Name: Guitar Solo");
console.log("   Type: Pin Set / Accessory");
console.log("   Price: €25.00");
console.log("   Style: Professional mockup with guitar icon\n");

console.log("✨ Image features:\n");
console.log("   ✓ Guitar emoji icon (🎸)");
console.log("   ✓ Professional gradient background");
console.log("   ✓ Product name and branding");
console.log("   ✓ Price tag (€25.00)");
console.log("   ✓ Limited edition badge");
console.log("   ✓ Music notes decorations");
console.log("   ✓ Brand watermark\n");

console.log("🎉 Ready to use! Refresh /drops page to see it!\n");
