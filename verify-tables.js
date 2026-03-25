require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function verifyTables() {
  try {
    const sql = neon(process.env.DATABASE_URL);

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

    console.log("🔍 Checking for expected tables...\n");

    const existingTables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    const existingTableNames = existingTables.map((t) =>
      t.table_name.toLowerCase(),
    );

    console.log("Status of expected tables:");
    console.log("─".repeat(50));

    let allExist = true;
    for (const table of expectedTables) {
      const exists = existingTableNames.includes(table.toLowerCase());
      const status = exists ? "✅" : "❌";
      console.log(
        `${status} ${table.padEnd(20)} ${exists ? "(exists)" : "(missing)"}`,
      );
      if (!exists) allExist = false;
    }

    console.log("─".repeat(50));
    console.log(
      `\n${allExist ? "✅ All tables exist!" : "⚠️  Some tables are missing"}`,
    );

    // Check vip_tier seed data if exists
    try {
      const vipTiers = await sql`SELECT * FROM vip_tier ORDER BY priority`;
      if (vipTiers.length > 0) {
        console.log(`\n✅ VIP Tiers seeded: ${vipTiers.length} rows`);
        vipTiers.forEach((t) => {
          console.log(`   - ${t.display_name}: €${t.price}/month`);
        });
      } else {
        console.log("\n⚠️  vip_tier table is empty (needs seeding)");
      }
    } catch (e) {
      console.log("\n⚠️  vip_tier table does not exist yet");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

verifyTables();
