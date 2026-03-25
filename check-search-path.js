const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkSearchPath() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking search_path...\n");

  // Check current search_path
  const result = await sql`SHOW search_path`;
  console.log("Current search_path:", result[0]);

  // Check what schema product table is in
  const schema = await sql`
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_name IN ('product', 'Product')
  `;

  console.log("\nProduct table schema:", schema);

  // Try querying with explicit schema
  try {
    const test = await sql`SELECT * FROM public.product LIMIT 1`;
    console.log("\n✅ Can query public.product!");
  } catch (err) {
    console.log("\n❌ Cannot query public.product:", err.message);
  }

  // Try without schema prefix
  try {
    const test = await sql`SELECT * FROM product LIMIT 1`;
    console.log("✅ Can query product (no schema)!");
  } catch (err) {
    console.log("❌ Cannot query product (no schema):", err.message);
  }
}

checkSearchPath();
