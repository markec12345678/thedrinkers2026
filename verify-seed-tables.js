const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkTableNames() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking EXACT table names in database...\n");

  // Get all tables that might be ours (case-insensitive search)
  const tables = await sql`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
    AND (
      lower(tablename) LIKE '%product%' OR
      lower(tablename) LIKE '%tour%' OR
      lower(tablename) LIKE '%album%' OR
      lower(tablename) LIKE '%vip%' OR
      lower(tablename) LIKE '%fan%' OR
      lower(tablename) LIKE '%order%' OR
      lower(tablename) LIKE '%song%'
    )
    ORDER BY tablename
  `;

  console.log("Found tables:");
  tables.forEach((t) => console.log(`  - "${t.tablename}"`));

  console.log("\n\n📝 Primerjava s seed-database.sql:");
  console.log("═".repeat(60));

  const seedTables = ["Product", "TourDate", "Album", "VipTier", "FanArt"];

  for (const seedTable of seedTables) {
    const found = tables.find(
      (t) => t.tablename.toLowerCase() === seedTable.toLowerCase(),
    );
    if (found) {
      console.log(`✅ "${seedTable}" → found as "${found.tablename}"`);
    } else {
      console.log(`❌ "${seedTable}" → NOT FOUND`);
    }
  }

  console.log("\n\n💡 Zaključek:");
  console.log("═".repeat(60));
  if (tables.length === 0) {
    console.log("⚠️  Nobena od pričakovanih tabel ni v bazi!");
    console.log("📝 seed-database.sql NI PRAVILEN za trenutno bazo.");
    console.log("\n🔧 Rešitev: Ustvari nove tabele ali uporabi drugo bazo.");
  } else {
    console.log("✅ Nekatere tabele obstajajo.");
    console.log("📝 Posodobi seed-database.sql z pravilnimi imeni.");
  }
}

checkTableNames();
