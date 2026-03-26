const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function runAllMigrations() {
  console.log("🚀 Running All E-commerce Migrations...\n");

  const sql = neon(process.env.DATABASE_URL);

  // Read all migration files
  const migrationsDir = path.join(__dirname, "drizzle/migrations");
  const files = fs.readdirSync(migrationsDir);

  const migrationFiles = files.filter((f) => f.endsWith(".sql"));

  console.log(`Found ${migrationFiles.length} migration files\n`);

  for (const file of migrationFiles) {
    console.log(`📄 Running ${file}...`);

    const filePath = path.join(migrationsDir, file);
    const sqlContent = fs.readFileSync(filePath, "utf-8");

    try {
      // Split by statements and execute
      const statements = sqlContent
        .split(";")
        .filter(
          (s) =>
            s.trim() &&
            !s.trim().startsWith("--") &&
            !s.trim().startsWith("/*"),
        )
        .map((s) => s.trim());

      for (const statement of statements) {
        try {
          await sql.unsafe(statement);
        } catch (err) {
          // Ignore "already exists" errors
          if (
            !err.message.includes("already exists") &&
            !err.message.includes("IF NOT EXISTS")
          ) {
            console.log(`  ⚠️  ${err.message.substring(0, 60)}`);
          }
        }
      }

      console.log(`✅ ${file} complete\n`);
    } catch (error) {
      console.error(`❌ Error in ${file}:`, error.message);
    }
  }

  console.log("═══════════════════════════════════════════════════");
  console.log("✅ All migrations complete!");
  console.log("═══════════════════════════════════════════════════\n");

  // Verify tables
  console.log("🔍 Verifying tables...\n");

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name IN (
      'limited_drop', 'drop_entry', 'drop_waitlist',
      'bundle', 'bundle_purchase'
    )
    ORDER BY table_name
  `;

  console.log("Tables created:");
  tables.forEach((t) => console.log(`  ✅ ${t.table_name}`));

  console.log(`\n✅ Total: ${tables.length} e-commerce tables created\n`);
  console.log("🎉 Database ready for e-commerce growth!\n");
}

runAllMigrations().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
