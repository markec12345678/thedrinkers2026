require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function createSchema() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Create schema
    console.log('📁 Creating schema "thedrinkers"...');
    await sql`CREATE SCHEMA IF NOT EXISTS thedrinkers`;
    console.log("✅ Schema created!\n");

    // Grant permissions
    await sql`GRANT ALL PRIVILEGES ON SCHEMA thedrinkers TO neondb_owner`;
    console.log("✅ Permissions granted!\n");

    console.log("Now tables will be created in thedrinkers schema:");
    console.log("  - thedrinkers.user");
    console.log("  - thedrinkers.product");
    console.log("  - thedrinkers.order");
    console.log("  etc.\n");

    console.log("Next step: Run migrations with schema prefix");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

createSchema();
