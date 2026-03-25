require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function testConnection() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT 1 as test`;
    console.log("✅ Connection successful!", result);

    // Check existing tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log(`\n📊 Found ${tables.length} tables in database:`);
    tables.forEach((t) => console.log(`  - ${t.table_name}`));
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

testConnection();
