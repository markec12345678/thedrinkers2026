require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function check() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking newly created tables...\n");

  const ourTables = [
    "user",
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

  for (const table of ourTables) {
    try {
      const result = await sql`SELECT COUNT(*) FROM ${sql(table)}`;
      console.log(`✅ ${table.padEnd(20)} (${result[0].count} rows)`);
    } catch (e) {
      console.log(`❌ ${table.padEnd(20)} (not found)`);
    }
  }
}

check();
