const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkDatabase() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Database Info:\n");

  // Get database info
  const info = await sql`
    SELECT 
      current_database() as database_name,
      current_schema() as current_schema,
      session_user as user_name,
      version() as version
  `;

  console.log("Database:", info[0].database_name);
  console.log("Schema:", info[0].current_schema);
  console.log("User:", info[0].user_name);
  console.log("\nVersion:", info[0].version.substring(0, 100));

  // List all tables in public schema
  console.log("\n\n📊 Tables in public schema:");
  console.log("─".repeat(60));

  const tables = await sql`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;

  console.log(`Found ${tables.length} tables:\n`);
  tables.forEach((t) => console.log(`  - ${t.tablename}`));

  // Check if our tables exist with different naming
  console.log("\n\n🎯 Looking for The Drinkers tables (case-insensitive):");
  console.log("─".repeat(60));

  const ourTables = [
    "user",
    "account",
    "session",
    "product",
    "order",
    "tour_date",
    "album",
    "vip_tier",
  ];

  for (const table of ourTables) {
    const result = await sql`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND lower(tablename) = ${table.toLowerCase()}
    `;

    if (result.length > 0) {
      console.log(`✅ ${table} → found as "${result[0].tablename}"`);
    } else {
      console.log(`❌ ${table} → NOT FOUND`);
    }
  }
}

checkDatabase();
