require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function check() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("Checking all tables in database...\n");

  // Try to query product table directly
  try {
    const result = await sql`SELECT count(*) FROM product`;
    console.log("✅ product table exists, rows:", result[0].count);
  } catch (err) {
    console.log("❌ product table:", err.message.substring(0, 60));
  }

  // List all tables
  const allTables = await sql`
    SELECT schemaname, tablename 
    FROM pg_tables 
    WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
    ORDER BY schemaname, tablename
  `;

  console.log("\nAll tables:");
  allTables.forEach((t) => console.log(`  ${t.schemaname}.${t.tablename}`));
}

check();
