require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function testTables() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Testing table existence with direct queries...\n");

  const tablesToTest = [
    "user",
    "session",
    "account",
    "verification",
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
    "user_reward",
    "user_points",
    "points_transaction",
  ];

  let success = 0;
  let failed = 0;

  for (const table of tablesToTest) {
    try {
      await sql.unsafe(`SELECT 1 FROM ${table} LIMIT 0`);
      console.log(`✅ ${table}`);
      success++;
    } catch (err) {
      console.log(`❌ ${table} - ${err.message.substring(0, 40)}`);
      failed++;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Existing tables: ${success}`);
  console.log(`❌ Missing tables: ${failed}`);
  console.log("=".repeat(50));

  if (failed > 0) {
    console.log("\n💡 Running db:push to create missing tables...\n");
    console.log("Please run: npm run db:push");
  }
}

testTables().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
