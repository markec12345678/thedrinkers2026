// Seed merch products - Simple SQL approach
require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function seedProducts() {
  console.log("🛍️  Seeding merch products...\n");

  const products = [
    {
      name: "The Drinkers Classic T-Shirt",
      description: "Premium cotton t-shirt with The Drinkers logo",
      price: "29.99",
      stock: 100,
      category: "apparel",
      featured: true,
    },
    {
      name: "Žeja Album Hoodie",
      description: "Warm hoodie featuring Žeja album artwork",
      price: "59.99",
      stock: 50,
      category: "apparel",
      featured: true,
    },
    {
      name: "Pivolucija Vinyl LP",
      description: "Limited edition vinyl record",
      price: "34.99",
      stock: 25,
      category: "music",
      featured: true,
    },
  ];

  for (const p of products) {
    try {
      await sql`
        INSERT INTO product (name, description, price, stock, category, featured, active, created_at, updated_at)
        VALUES (${p.name}, ${p.description}, ${p.price}, ${p.stock}, ${p.category}, ${p.featured}, true, NOW(), NOW())
      `;
      console.log(`✅ Added: ${p.name}`);
    } catch (error) {
      console.error(`❌ Failed: ${p.name}:`, error.message);
    }
  }

  console.log("\n🎉 Seeding completed!");
}

seedProducts().catch(console.error);
