require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

async function runMigrations() {
  try {
    console.log("🔗 Connecting to database...");
    const sql = neon(process.env.DATABASE_URL);

    // Test connection
    await sql`SELECT 1 as test`;
    console.log("✅ Connected successfully!\n");

    // Read combined SQL file
    const sqlPath = path.join(
      __dirname,
      "drizzle",
      "all-migrations-combined.sql",
    );
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    console.log("📜 Running migrations...");
    console.log("   File:", sqlPath);
    console.log("   Size:", sqlContent.length, "bytes\n");

    // Split by statements and execute
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter(
        (s) => s.length > 0 && !s.startsWith("--") && !s.startsWith("\\"),
      );

    console.log(`⚙️  Executing ${statements.length} SQL statements...\n`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        await sql.unsafe(statement);
        success++;
        if (i % 20 === 0) {
          process.stdout.write(
            `\r   Progress: ${success}/${statements.length}`,
          );
        }
      } catch (err) {
        // Ignore "already exists" errors
        if (
          err.message.includes("already exists") ||
          err.message.includes("duplicate") ||
          err.message.includes("ON CONFLICT")
        ) {
          success++;
        } else {
          failed++;
          console.error(
            `\n❌ Statement ${i + 1} failed:`,
            err.message.substring(0, 100),
          );
        }
      }
    }

    console.log(`\r   Progress: ${success}/${statements.length} complete`);
    console.log(`\n✅ Migrations completed!`);
    console.log(`   Success: ${success}`);
    console.log(`   Failed: ${failed}\n`);

    // Verify tables
    console.log("🔍 Verifying tables...\n");

    const expectedTables = [
      "user",
      "mcp_server",
      "thread",
      "message",
      "product",
      "order",
      "order_item",
      "tour_date",
      "album",
      "song",
      "fan_art",
      "fan_art_like",
      "vip_membership",
      "vip_tier",
      "user_points",
      "user_reward",
      "points_transaction",
    ];

    const existingTables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    const existingTableNames = existingTables.map((t) =>
      t.table_name.toLowerCase(),
    );

    console.log("Table Status:");
    console.log("─".repeat(60));

    let allExist = true;
    for (const table of expectedTables) {
      const exists = existingTableNames.includes(table.toLowerCase());
      const status = exists ? "✅" : "❌";
      console.log(
        `${status} ${table.padEnd(20)} ${exists ? "(created)" : "(missing)"}`,
      );
      if (!exists) allExist = false;
    }

    console.log("─".repeat(60));

    // Check VIP tiers
    console.log("\n🎯 VIP Tiers:");
    try {
      const vipTiers =
        await sql`SELECT name, display_name, price, priority FROM vip_tier ORDER BY priority`;
      if (vipTiers.length > 0) {
        console.log(`✅ Seeded ${vipTiers.length} VIP tiers:`);
        vipTiers.forEach((t) => {
          console.log(`   ${t.priority}. ${t.display_name}: €${t.price}/month`);
        });
      } else {
        console.log("⚠️  vip_tier table is empty");
      }
    } catch (e) {
      console.log("❌ vip_tier table not found");
    }

    console.log(
      `\n${allExist ? "✅ ALL TABLES CREATED SUCCESSFULLY!" : "⚠️  Some tables missing"}`,
    );
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    console.error(error);
  }
}

runMigrations();
