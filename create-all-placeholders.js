#!/usr/bin/env node

/**
 * 🖼️ CREATE ALL MISSING PLACEHOLDER IMAGES
 * Scans components for missing images and creates placeholders
 */

const fs = require("fs");
const path = require("path");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🖼️  CREATE ALL PLACEHOLDER IMAGES  🖼️                ║
║                                                           ║
║   Creating all missing placeholder images               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

const imagesToCreate = [
  // Album covers
  {
    path: "album-1995.svg",
    text: "1995",
    color1: "#1a1a2e",
    color2: "#16213e",
  },
  {
    path: "album-1998.svg",
    text: "1998",
    color1: "#0f3460",
    color2: "#16213e",
  },
  {
    path: "album-2001.svg",
    text: "2001",
    color1: "#e94560",
    color2: "#c70039",
  },
  {
    path: "album-2010.svg",
    text: "2010",
    color1: "#1a1a2e",
    color2: "#533483",
  },
  {
    path: "album-2019.svg",
    text: "2019",
    color1: "#16213e",
    color2: "#0f3460",
  },
  {
    path: "album-zivljenje.svg",
    text: "ŽIVLJENJE",
    color1: "#e94560",
    color2: "#1a1a2e",
  },

  // Testimonials
  {
    path: "testimonials/marko.svg",
    text: "M",
    color1: "#1a1a2e",
    color2: "#16213e",
    circle: true,
  },
  {
    path: "testimonials/ana.svg",
    text: "A",
    color1: "#e94560",
    color2: "#c70039",
    circle: true,
  },
  {
    path: "testimonials/luka.svg",
    text: "L",
    color1: "#0f3460",
    color2: "#533483",
    circle: true,
  },

  // Fan art
  { path: "fan-art/1.svg", text: "🎨", color1: "#1a1a2e", color2: "#16213e" },
  { path: "fan-art/2.svg", text: "🎨", color1: "#e94560", color2: "#c70039" },
  { path: "fan-art/3.svg", text: "🎨", color1: "#0f3460", color2: "#533483" },

  // Bar
  { path: "bar-hero.svg", text: "🍺", color1: "#1a1a2e", color2: "#16213e" },

  // Band photo
  { path: "band-photo.svg", text: "🎸", color1: "#1a1a2e", color2: "#16213e" },

  // Backstage
  { path: "backstage.svg", text: "🎤", color1: "#e94560", color2: "#c70039" },
];

const imagesPath = path.join(__dirname, "public", "images");

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

let created = 0;

imagesToCreate.forEach((img, index) => {
  const fullPath = path.join(imagesPath, img.path);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const svg = createPlaceholder(img);
  fs.writeFileSync(fullPath, svg);
  created++;
  console.log(`✅ ${index + 1}/${imagesToCreate.length}: ${img.path}`);
});

console.log("\n╔═══════════════════════════════════════════════════════════╗");
console.log("║🎉 ALL PLACEHOLDER IMAGES CREATED!                        ║");
console.log("╚═══════════════════════════════════════════════════════════╝\n");

console.log(`📊 Total created: ${created}\n`);
console.log("📍 Saved to: /public/images/\n");
console.log("💡 NEXT: Refresh pages to see all images!\n");

function createPlaceholder(img) {
  const size = img.path.includes("testimonials") ? 200 : 512;
  const fontSize = img.path.includes("testimonials") ? 80 : 120;

  if (img.circle) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${img.path}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${img.color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${img.color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#grad-${img.path})"/>
  <text x="${size / 2}" y="${size / 2 + fontSize / 3}" font-family="Arial, sans-serif" font-size="${fontSize}" fill="white" text-anchor="middle" font-weight="bold">
    ${img.text}
  </text>
</svg>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${img.path}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${img.color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${img.color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="${size}" height="${size}" fill="url(#grad-${img.path})"/>
  <text x="${size / 2}" y="${size / 2 + fontSize / 3}" font-family="Arial, sans-serif" font-size="${fontSize}" text-anchor="middle">
    ${img.text}
  </text>
</svg>`;
}
