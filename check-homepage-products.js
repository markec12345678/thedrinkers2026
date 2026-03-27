const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

const sql = neon(process.env.DATABASE_URL);

async function checkProducts() {
  const products = await sql`
    SELECT id, name, category 
    FROM product 
    WHERE active = true 
    ORDER BY created_at 
    LIMIT 8
  `;

  console.log("First 8 products on homepage:\n");
  products.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`);
    console.log(`   Category: ${p.category}`);
    console.log(`   ID: ${p.id}\n`);
  });
}

checkProducts();
