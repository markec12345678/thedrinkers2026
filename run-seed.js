const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function runSeed() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🎸 Starting The Drinkers Database Seed...\n");

  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, "seed-clean.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf-8");

    // Split by semicolons and execute each statement
    const statements = sqlContent
      .split(";")
      .filter((s) => s.trim() && !s.trim().startsWith("--"))
      .map((s) => s.trim());

    console.log(`📝 Executing ${statements.length} SQL statements...\n`);

    let success = 0;
    let failed = 0;

    for (const statement of statements) {
      try {
        const result = await sql.unsafe(statement);
        success++;

        // Log interesting results
        if (statement.includes("INSERT INTO")) {
          const tableMatch = statement.match(/INSERT INTO (\w+)/);
          if (tableMatch) {
            console.log(`✅ Inserted into ${tableMatch[1]}`);
          }
        } else if (statement.includes("DELETE FROM")) {
          const tableMatch = statement.match(/DELETE FROM (\w+)/);
          if (tableMatch) {
            console.log(`🗑️  Cleared ${tableMatch[1]}`);
          }
        }
      } catch (err) {
        failed++;
        console.log(`❌ Failed: ${err.message.substring(0, 60)}`);
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log(`✅ Success: ${success} statements`);
    console.log(`⚠️  Failed: ${failed} statements`);
    console.log("=".repeat(60));

    // Verify seed
    console.log("\n🔍 Verifying seed...\n");

    const verification = await sql`
      SELECT 'product' as table_name, COUNT(*) as count FROM product
      UNION ALL SELECT 'tour_date', COUNT(*) FROM tour_date
      UNION ALL SELECT 'album', COUNT(*) FROM album
      UNION ALL SELECT 'vip_tier', COUNT(*) FROM vip_tier
      UNION ALL SELECT 'fan_art', COUNT(*) FROM fan_art
      ORDER BY table_name
    `;

    console.log("📊 Seed Results:");
    console.log("─".repeat(40));
    verification.forEach((row) => {
      console.log(`  ${row.table_name.padEnd(15)} ${row.count} rows`);
    });

    console.log("\n✅ Seed completed successfully!\n");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

runSeed();
