#!/usr/bin/env node

/**
 * 🖼️ FIX ALL MISSING PRODUCT IMAGES
 * Scans database for all products and creates images for any missing
 */

const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🖼️  FIX ALL MISSING PRODUCT IMAGES  🖼️               ║
║                                                           ║
║   Creating images for all products                      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

async function fixAllImages() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("📊 Step 1/3: Getting all products from database...\n");

  try {
    // Get all active products
    const products = await sql`
      SELECT id, name, category, price, stock 
      FROM product 
      WHERE active = true 
      ORDER BY created_at
    `;

    console.log(`✅ Found ${products.length} active products\n`);

    const imagesPath = path.join(__dirname, "public", "images", "drops");

    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
    }

    console.log("📊 Step 2/3: Creating images for all products...\n");

    let created = 0;
    let skipped = 0;

    products.forEach((product, index) => {
      const filePath = path.join(imagesPath, `${product.id}.svg`);

      // Check if image already exists
      if (fs.existsSync(filePath)) {
        console.log(
          `⏭️  ${index + 1}/${products.length}: ${product.name} (already exists)`,
        );
        skipped++;
        return;
      }

      // Create image
      const svg = createProductImage(product);
      fs.writeFileSync(filePath, svg);
      created++;
      console.log(`✅ ${index + 1}/${products.length}: ${product.name}`);
    });

    console.log("\n📊 Step 3/3: Summary...\n");
    console.log(`   Total products: ${products.length}`);
    console.log(`   Images created: ${created}`);
    console.log(`   Images skipped: ${skipped}`);

    console.log(
      "\n╔═══════════════════════════════════════════════════════════╗",
    );
    console.log("║🎉 ALL PRODUCT IMAGES CREATED!                            ║");
    console.log(
      "╚═══════════════════════════════════════════════════════════╝\n",
    );

    console.log("📍 Images saved to: /public/images/drops/\n");
    console.log("💡 NEXT: Refresh /drops page to see all products!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("\n💡 Make sure DATABASE_URL is set in .env\n");
  }
}

function createProductImage(product) {
  // Color schemes based on category
  const gradients = {
    "t-shirt": ["#1a1a2e", "#16213e"],
    hoodie: ["#1a1a2e", "#16213e"],
    poster: ["#e94560", "#c70039"],
    vinyl: ["#0f3460", "#16213e"],
    accessories: ["#0f3460", "#533483"],
    music: ["#1a1a2e", "#16213e"],
    cd: ["#0f3460", "#533483"],
  };

  // Icons based on category
  const icons = {
    "t-shirt": "👕",
    hoodie: "🧥",
    poster: "🖼️",
    vinyl: "💿",
    accessories: "🎁",
    music: "🎵",
    cd: "💿",
  };

  const colors = gradients[product.category] || ["#1a1a2e", "#16213e"];
  const icon = icons[product.category] || "🎸";

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
  <text x="500" y="520" font-family="Arial, sans-serif" font-size="52" fill="white" text-anchor="middle" font-weight="bold">
    ${product.name}
  </text>
  
  <!-- Brand -->
  <text x="500" y="580" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    The Drinkers
  </text>
  
  <!-- Price Tag -->
  <rect x="350" y="630" width="300" height="80" rx="10" fill="rgba(168,85,247,0.3)"/>
  <text x="500" y="682" font-family="Arial, sans-serif" font-size="44" fill="white" text-anchor="middle" font-weight="bold">
    €${product.price}
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
  
  <!-- Stock indicator -->
  <rect x="50" y="900" width="200" height="60" rx="8" fill="rgba(16,185,129,0.3)"/>
  <text x="150" y="938" font-family="Arial, sans-serif" font-size="20" fill="#10b981" text-anchor="middle" font-weight="bold">
    ${product.stock} in stock
  </text>
</svg>`;
}

fixAllImages();
