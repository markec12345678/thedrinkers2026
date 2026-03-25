require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function verifyMigration() {
  const sql = neon(process.env.DATABASE_URL);

  console.log('🔍 Verifying migration in "thedrinkers" schema...\n');

  // Check tables in thedrinkers schema
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'thedrinkers'
    ORDER BY table_name
  `;

  console.log(`✅ Found ${tables.length} tables in thedrinkers schema:\n`);
  tables.forEach((t) => console.log(`  - ${t.table_name}`));

  // Check VIP tiers
  console.log("\n🎯 Checking VIP Tiers...");
  try {
    const vipTiers = await sql`
      SELECT name, display_name, price, priority 
      FROM thedrinkers.vip_tier 
      ORDER BY priority
    `;

    if (vipTiers.length > 0) {
      console.log(`✅ VIP Tiers seeded: ${vipTiers.length}\n`);
      vipTiers.forEach((t) => {
        console.log(`   ${t.priority}. ${t.display_name}: €${t.price}/month`);
      });
    } else {
      console.log("⚠️  vip_tier table is empty");
    }
  } catch (e) {
    console.log("⚠️  vip_tier not found:", e.message.substring(0, 50));
  }

  // Summary
  const expectedTables = [
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

  const existingTables = tables.map((t) => t.table_name);
  const missing = expectedTables.filter((t) => !existingTables.includes(t));

  console.log("\n" + "═".repeat(60));
  if (missing.length === 0) {
    console.log("✅ ALL TABLES CREATED SUCCESSFULLY!");
  } else {
    console.log(`⚠️  Missing ${missing.length} tables:`);
    missing.forEach((t) => console.log(`   - ${t}`));
  }
  console.log("═".repeat(60));
}

verifyMigration();
