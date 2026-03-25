require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

async function createTables() {
  console.log("🔧 Creating all tables with proper lowercase names...\n");

  const sql = neon(process.env.DATABASE_URL);

  const sqlFile = path.join(__dirname, "create-all-tables-fixed.sql");
  const sqlContent = fs.readFileSync(sqlFile, "utf-8");

  // Split by semicolons (but be careful with SQL statements)
  const statements = sqlContent
    .split(";")
    .filter((s) => s.trim() && !s.trim().startsWith("--"));

  console.log(`📝 Executing ${statements.length} SQL statements...\n`);

  let success = 0;
  let failed = 0;

  for (const statement of statements) {
    const cleanSQL = statement.trim();
    if (!cleanSQL) continue;

    try {
      await sql.unsafe(cleanSQL);
      success++;

      // Extract table name for logging
      const createMatch = cleanSQL.match(/CREATE TABLE "?(\w+)"?/i);
      const indexMatch = cleanSQL.match(/CREATE INDEX "?(\w+)"?/i);
      const alterMatch = cleanSQL.match(/ALTER TABLE "?(\w+)"?/i);

      if (createMatch) {
        console.log(`✅ Created table: ${createMatch[1]}`);
      } else if (indexMatch) {
        console.log(`✅ Created index: ${indexMatch[1]}`);
      } else if (alterMatch) {
        // Silent for ALTER statements
      }
    } catch (err) {
      // Ignore "already exists" errors
      if (err.message.includes("already exists")) {
        success++;
      } else {
        failed++;
        console.log(`❌ Failed: ${err.message.substring(0, 60)}`);
      }
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Success: ${success} statements`);
  console.log(`⚠️  Failed: ${failed} statements`);
  console.log("=".repeat(50));

  // Verify tables
  console.log("\n🔍 Verifying tables...\n");
  const tables = await sql`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('user', 'account', 'session', 'product', 'order', 'tour_date', 'album', 'song', 'fan_art', 'vip_membership')
    ORDER BY tablename
  `;

  console.log("Found tables:");
  tables.forEach((t) => console.log(`  ✅ ${t.tablename}`));

  console.log(`\n✅ Total: ${tables.length} core tables verified\n`);
}

createTables().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
