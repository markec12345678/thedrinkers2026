require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function createTables() {
  console.log("🔧 Creating tables for The Drinkers...\n");

  const sql = neon(process.env.DATABASE_URL);

  try {
    // First check if tables already exist
    const existingTables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('user', 'account', 'session', 'product', 'order')
    `;

    if (existingTables.length > 0) {
      console.log("⚠️  Found existing tables:");
      existingTables.forEach((t) => console.log(`   - ${t.table_name}`));
      console.log("\n💡 Dropping and recreating...\n");
    }

    // Read and execute migration file
    const fs = require("fs");
    const path = require("path");

    const migrationFile = path.join(
      __dirname,
      "drizzle/migrations/0000_colorful_warbound.sql",
    );
    const migrationSQL = fs.readFileSync(migrationFile, "utf-8");

    // Split by statement-breakpoint
    const statements = migrationSQL
      .split("--> statement-breakpoint")
      .filter((s) => s.trim());

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
        const match = cleanSQL.match(/CREATE TABLE "?(\w+)"?/i);
        if (match) {
          console.log(`✅ Created table: ${match[1]}`);
        }
      } catch (err) {
        // Ignore "already exists" errors
        if (!err.message.includes("already exists")) {
          failed++;
          console.log(`❌ Failed: ${err.message.substring(0, 60)}`);
        }
      }
    }

    console.log(`\n${"=".repeat(50)}`);
    console.log(`✅ Success: ${success} statements`);
    console.log(`⚠️  Failed: ${failed} statements`);
    console.log("=".repeat(50));
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

createTables();
