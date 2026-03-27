#!/usr/bin/env node

/**
 * 🖼️ CREATE PLACEHOLDER PRODUCT IMAGES
 * Creates simple placeholder images for products
 *
 * Usage: node create-placeholder-images.js
 */

const fs = require("fs");
const path = require("path");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🖼️  CREATE PLACEHOLDER IMAGES  🖼️                    ║
║                                                           ║
║   Creating placeholder product images                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

async function createPlaceholderImages() {
  console.log("📊 Step 1/3: Getting Products from Database...\n");

  const { neon } = require("@neondatabase/serverless");
  require("dotenv").config();

  if (!process.env.DATABASE_URL) {
    console.log("❌ DATABASE_URL not found in .env");
    console.log("Please add DATABASE_URL to your .env file");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Get all active products
    const products = await sql`
      SELECT id, name, category, price 
      FROM product 
      WHERE active = true 
      ORDER BY created_at DESC
    `;

    console.log(`✅ Found ${products.length} active products\n`);

    if (products.length === 0) {
      console.log("⚠️  No products found!");
      console.log("Please create products first.\n");
      return;
    }

    console.log("📊 Step 2/3: Creating Images Folder...\n");

    const imagesPath = path.join(__dirname, "public", "images", "drops");

    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
      console.log("✅ Created /public/images/drops/\n");
    } else {
      console.log("✅ /public/images/drops/ exists\n");
    }

    console.log("📊 Step 3/3: Creating Placeholder Images...\n");

    // Create simple SVG placeholder for each product
    for (const product of products) {
      const svg = createPlaceholderSVG(product);
      const filePath = path.join(imagesPath, `${product.id}.svg`);

      fs.writeFileSync(filePath, svg);
      console.log(`✅ Created: ${product.name} (${product.id}.svg)`);
    }

    console.log(
      "\n╔═══════════════════════════════════════════════════════════╗",
    );
    console.log("║🎉 PLACEHOLDER IMAGES CREATED!                            ║");
    console.log(
      "╚═══════════════════════════════════════════════════════════╝\n",
    );

    console.log("📋 NEXT STEPS:\n");
    console.log("1. Test pages:");
    console.log("   http://localhost:3001/drops\n");

    console.log("2. Replace with real images (optional):");
    console.log("   - Use Canva.com for mockups");
    console.log("   - Use Placeit.net for professional mockups");
    console.log("   - Use AI tools (Midjourney, DALL-E 3)\n");

    console.log("3. Image requirements:");
    console.log("   - Size: 1000x1000px (square)");
    console.log("   - Format: JPG or PNG");
    console.log("   - Max size: 500KB\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

function createPlaceholderSVG(product) {
  const gradientColors = {
    "t-shirt": ["#a855f7", "#ec4899"],
    hoodie: ["#6366f1", "#8b5cf6"],
    poster: ["#ec4899", "#f43f5e"],
    vinyl: ["#f59e0b", "#f97316"],
    accessories: ["#10b981", "#14b8a6"],
    music: ["#3b82f6", "#6366f1"],
  };

  const colors = gradientColors[product.category] || ["#a855f7", "#ec4899"];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1000" height="1000" fill="url(#grad)"/>
  
  <!-- Product Icon -->
  <text x="500" y="400" font-family="Arial, sans-serif" font-size="200" fill="white" text-anchor="middle" font-weight="bold">
    ${getProductIcon(product.category)}
  </text>
  
  <!-- Product Name -->
  <text x="500" y="550" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">
    ${product.name.substring(0, 30)}${product.name.length > 30 ? "..." : ""}
  </text>
  
  <!-- Price -->
  <text x="500" y="650" font-family="Arial, sans-serif" font-size="72" fill="white" text-anchor="middle" font-weight="bold">
    €${product.price}
  </text>
  
  <!-- Category -->
  <text x="500" y="750" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    ${product.category || "Product"}
  </text>
  
  <!-- Watermark -->
  <text x="500" y="900" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.5)" text-anchor="middle">
    The Drinkers
  </text>
</svg>`;
}

function getProductIcon(category) {
  const icons = {
    "t-shirt": "👕",
    hoodie: "🧥",
    poster: "🖼️",
    vinyl: "💿",
    accessories: "🎁",
    music: "🎵",
  };

  return icons[category] || "📦";
}

createPlaceholderImages();
