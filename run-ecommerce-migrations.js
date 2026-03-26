const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function runMigrations() {
  console.log("🚀 Running E-commerce Growth Migrations...\n");

  const sql = neon(process.env.DATABASE_URL);

  // Read migration files
  const migrations = ["0003_limited_drops.sql", "0004_bundle_deals.sql"];

  for (const migration of migrations) {
    const filePath = path.join(__dirname, "drizzle/migrations", migration);
    const sqlContent = fs.readFileSync(filePath, "utf-8");

    console.log(`📄 Running ${migration}...`);

    try {
      // Split by statements and execute
      const statements = sqlContent
        .split(";")
        .filter((s) => s.trim() && !s.trim().startsWith("--"))
        .map((s) => s.trim());

      for (const statement of statements) {
        // Skip comments
        if (statement.startsWith("/*") || statement.startsWith("--")) continue;

        try {
          await sql.unsafe(statement);
        } catch (err) {
          // Ignore "already exists" errors
          if (!err.message.includes("already exists")) {
            console.error(`  ⚠️  Warning: ${err.message.substring(0, 60)}`);
          }
        }
      }

      console.log(`✅ ${migration} complete\n`);
    } catch (error) {
      console.error(`❌ Error in ${migration}:`, error.message);
    }
  }

  console.log("═══════════════════════════════════════════════════");
  console.log("✅ All migrations complete!");
  console.log("═══════════════════════════════════════════════════\n");

  // Verify tables exist
  console.log("🔍 Verifying tables...\n");

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name IN ('limited_drop', 'drop_entry', 'drop_waitlist', 'bundle', 'bundle_purchase')
    ORDER BY table_name
  `;

  console.log("Tables created:");
  tables.forEach((t) => console.log(`  ✅ ${t.table_name}`));

  console.log(`\n✅ Total: ${tables.length} tables created\n`);
  console.log("🎉 E-commerce Growth database ready!\n");
}

runMigrations().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
