#!/usr/bin/env node

/**
 * 🖼️ CREATE BETTER PRODUCT MOCKUPS
 * Creates professional-looking product mockups
 */

const fs = require("fs");
const path = require("path");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🖼️  CREATE PROFESSIONAL MOCKUPS  🖼️                  ║
║                                                           ║
║   Creating better product mockups                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

const products = [
  {
    id: "521a70fc-2f4b-4288-bb8e-a61d4a127644",
    name: "Classic T-Shirt",
    type: "tshirt",
    color: "black",
  },
  {
    id: "b460d25c-c8e6-42f2-8f18-bf27bcf56f02",
    name: "Hoodie Black",
    type: "hoodie",
    color: "black",
  },
  {
    id: "4949bf8e-b953-4569-8a50-14911eb486ae",
    name: "Tour 2026 Poster",
    type: "poster",
    color: "multi",
  },
  {
    id: "cdb15be9-477d-46ce-a1c8-cc2a1cb00de9",
    name: "Vinyl LP",
    type: "vinyl",
    color: "black",
  },
  {
    id: "40ed17fe-356f-4c13-afda-d3fce47b3433",
    name: "Beer Pint Glass",
    type: "glass",
    color: "clear",
  },
  {
    id: "f00f863a-9dd5-4ced-a923-b28649faa654",
    name: "Snapback Cap",
    type: "cap",
    color: "black",
  },
  {
    id: "d61fc546-5e32-4b9a-abe6-f3be7c89ce3e",
    name: "Tote Bag",
    type: "bag",
    color: "natural",
  },
  {
    id: "13281dc0-e023-4c81-9314-ba6bec304396",
    name: "Long Sleeve",
    type: "longsleeve",
    color: "black",
  },
  {
    id: "d833dcab-eb7e-4b19-a33c-f47a110fdb97",
    name: "Pin Set",
    type: "pins",
    color: "multi",
  },
  {
    id: "6cec5cea-2910-4476-a4bb-7789fedf14e5",
    name: "Tour 2026 CD",
    type: "cd",
    color: "multi",
  },
  {
    id: "bdedef60-9cb7-4f14-aba5-95a12f7f0a6a",
    name: "Zip-Up Hoodie",
    type: "hoodie",
    color: "grey",
  },
  {
    id: "41f0dfcf-eb65-49d1-b11f-f4f9c7697df5",
    name: "Sticker Pack",
    type: "stickers",
    color: "multi",
  },
];

const imagesPath = path.join(__dirname, "public", "images", "drops");

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

console.log("📊 Creating professional mockups...\n");

products.forEach((product, index) => {
  // Create SVG mockup
  const svg = createProfessionalMockup(product);
  const filePath = path.join(imagesPath, `${product.id}.svg`);
  fs.writeFileSync(filePath, svg);

  console.log(`✅ ${index + 1}/${products.length}: ${product.name}`);
});

console.log("\n╔═══════════════════════════════════════════════════════════╗");
console.log("║🎉 MOCKUPS CREATED!                                       ║");
console.log("╚═══════════════════════════════════════════════════════════╝\n");

console.log("📋 Mockups saved to: /public/images/drops/\n");
console.log("💡 TIP: For even better mockups, use:\n");
console.log("   - Canva.com (free templates)");
console.log("   - Placeit.net (professional mockups)");
console.log("   - Smartmockups.com (free & paid)\n");

function createProfessionalMockup(product) {
  const gradients = {
    tshirt: ["#1a1a2e", "#16213e"],
    hoodie: ["#1a1a2e", "#16213e"],
    poster: ["#e94560", "#c70039"],
    vinyl: ["#0f3460", "#16213e"],
    glass: ["#0f3460", "#533483"],
    cap: ["#1a1a2e", "#16213e"],
    bag: ["#e94560", "#c70039"],
    longsleeve: ["#1a1a2e", "#16213e"],
    pins: ["#e94560", "#c70039"],
    cd: ["#0f3460", "#533483"],
    stickers: ["#e94560", "#c70039"],
  };

  const icons = {
    tshirt: "👕",
    hoodie: "🧥",
    poster: "🖼️",
    vinyl: "💿",
    glass: "🍺",
    cap: "🧢",
    bag: "👜",
    longsleeve: "👕",
    pins: "📌",
    cd: "💿",
    stickers: "✨",
  };

  const colors = gradients[product.type] || ["#1a1a2e", "#16213e"];
  const icon = icons[product.type] || "📦";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="20" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1000" height="1000" fill="url(#grad)"/>
  
  <!-- Product Icon -->
  <text x="500" y="380" font-family="Arial, sans-serif" font-size="220" text-anchor="middle" filter="url(#shadow)">
    ${icon}
  </text>
  
  <!-- Product Name -->
  <text x="500" y="520" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">
    ${product.name}
  </text>
  
  <!-- Brand -->
  <text x="500" y="580" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    The Drinkers
  </text>
  
  <!-- Price Tag -->
  <rect x="350" y="630" width="300" height="80" rx="10" fill="rgba(255,255,255,0.2)"/>
  <text x="500" y="682" font-family="Arial, sans-serif" font-size="40" fill="white" text-anchor="middle" font-weight="bold">
    €25.00
  </text>
  
  <!-- Limited Edition Badge -->
  <circle cx="800" cy="200" r="80" fill="#e94560" opacity="0.9"/>
  <text x="800" y="190" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">
    LIMITED
  </text>
  <text x="800" y="220" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">
    EDITION
  </text>
  
  <!-- Watermark -->
  <text x="500" y="900" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.4)" text-anchor="middle">
    thedrinkers.si
  </text>
</svg>`;
}
