require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function check() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking ALL tables in database...\n");

  // Check all tables
  const all = await sql`
    SELECT schemaname, tablename 
    FROM pg_tables 
    WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'neon_auth', 'drizzle')
    ORDER BY schemaname, tablename
    LIMIT 50
  `;

  console.log("First 50 tables:");
  all.forEach((t) => console.log(`  ${t.schemaname}.${t.tablename}`));

  // Try to query product directly
  console.log('\n\n📊 Trying to query "product" table...');
  try {
    const result = await sql`SELECT * FROM product LIMIT 1`;
    console.log("✅ SUCCESS! product table exists");
    console.log("Columns:", Object.keys(result[0] || {}));
  } catch (err) {
    console.log("❌ FAILED:", err.message.substring(0, 80));
  }

  // Try with quotes
  console.log('\n📊 Trying with quoted "product"...');
  try {
    const result = await sql.unsafe('SELECT * FROM "product" LIMIT 1');
    console.log('✅ SUCCESS! "product" table exists');
  } catch (err) {
    console.log("❌ FAILED:", err.message.substring(0, 80));
  }
}

check();
