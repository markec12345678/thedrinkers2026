require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function dropUppercaseTables() {
  console.log("🗑️  Dropping uppercase tables...\n");

  const sql = neon(process.env.DATABASE_URL);

  const tablesToDrop = [
    "Account",
    "Session",
    "User",
    "Verification",
    "Mcp_server",
    "Thread",
    "Message",
    "Product",
    "Order",
    "Order_item",
    "Tour_date",
    "Album",
    "Song",
    "Fan_art",
    "Fan_art_like",
    "Vip_membership",
    "User_reward",
    "User_points",
    "Points_transaction",
  ];

  for (const table of tablesToDrop) {
    try {
      await sql.unsafe(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      console.log(`✅ Dropped: ${table}`);
    } catch (err) {
      console.log(
        `❌ Failed to drop ${table}: ${err.message.substring(0, 50)}`,
      );
    }
  }

  console.log("\n✅ Done dropping tables\n");

  // Now create lowercase tables
  console.log("📥 Creating lowercase tables...\n");

  const fs = require("fs");
  const path = require("path");
  const sqlFile = path.join(__dirname, "create-all-tables-fixed.sql");
  const sqlContent = fs.readFileSync(sqlFile, "utf-8");
  const statements = sqlContent
    .split(";")
    .filter((s) => s.trim() && !s.trim().startsWith("--"));

  let success = 0;
  for (const statement of statements) {
    const cleanSQL = statement.trim();
    if (!cleanSQL) continue;

    try {
      await sql.unsafe(cleanSQL);
      const createMatch = cleanSQL.match(/CREATE TABLE "?(\w+)"?/i);
      if (createMatch) {
        console.log(`✅ Created: ${createMatch[1]}`);
        success++;
      }
    } catch (err) {
      if (!err.message.includes("already exists")) {
        console.log(`❌ Failed: ${err.message.substring(0, 50)}`);
      }
    }
  }

  console.log(`\n✅ Created ${success} tables`);

  // Verify
  console.log("\n🔍 Verifying...\n");
  const result = await sql`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public'
    AND tablename IN ('user','account','session','product','order','tour_date','album','song','fan_art','vip_membership')
    ORDER BY tablename
  `;

  console.log("Tables found:");
  result.forEach((t) => console.log(`  ✅ ${t.tablename}`));
  console.log(`\nTotal: ${result.length} tables\n`);
}

dropUppercaseTables().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
