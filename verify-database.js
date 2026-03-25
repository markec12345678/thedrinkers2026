require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function verifyDatabase() {
  console.log("🔍 Verifying Database Tables...\n");

  const sql = neon(process.env.DATABASE_URL);

  // Get all tables
  const allTables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  `;

  const tableNames = allTables.map((t) => t.table_name);

  // Check expected tables (case-insensitive)
  const expectedTables = [
    // Better Auth
    { name: "user", category: "Better Auth" },
    { name: "session", category: "Better Auth" },
    { name: "account", category: "Better Auth" },
    { name: "verification", category: "Better Auth" },

    // MCP & AI
    { name: "mcp_server", category: "MCP & AI" },
    { name: "thread", category: "MCP & AI" },
    { name: "message", category: "MCP & AI" },

    // Merch Store
    { name: "product", category: "Merch Store" },
    { name: "order", category: "Merch Store" },
    { name: "order_item", category: "Merch Store" },

    // Tour Dates
    { name: "tour_date", category: "Tour Dates" },

    // Music Catalog
    { name: "album", category: "Music Catalog" },
    { name: "song", category: "Music Catalog" },

    // Fan Art & Community
    { name: "fan_art", category: "Fan Art" },
    { name: "fan_art_like", category: "Fan Art" },

    // VIP Memberships
    { name: "vip_membership", category: "VIP" },
    { name: "vip_tier", category: "VIP" },

    // Rewards & Loyalty
    { name: "user_reward", category: "Rewards" },
    { name: "user_points", category: "Rewards" },
    { name: "points_transaction", category: "Rewards" },
  ];

  console.log("📊 Table Verification by Category:");
  console.log("═".repeat(60));

  let allExist = true;
  let currentCategory = "";

  for (const table of expectedTables) {
    if (table.category !== currentCategory) {
      currentCategory = table.category;
      console.log(`\n${table.category}:`);
      console.log("─".repeat(40));
    }

    // Case-insensitive check
    const exists = tableNames.some(
      (t) => t.toLowerCase() === table.name.toLowerCase(),
    );

    if (exists) {
      const actualName = tableNames.find(
        (t) => t.toLowerCase() === table.name.toLowerCase(),
      );
      console.log(`   ✅ ${actualName}`);
    } else {
      console.log(`   ❌ ${table.name} - MISSING`);
      allExist = false;
    }
  }

  console.log("\n" + "═".repeat(60));

  if (allExist) {
    console.log("✅ ALL TABLES VERIFIED SUCCESSFULLY!");
    console.log(`📊 Total expected tables: ${expectedTables.length}`);
    console.log(`📊 Total tables in DB: ${tableNames.length}`);
  } else {
    console.log("❌ SOME TABLES ARE MISSING!");
  }

  process.exit(allExist ? 0 : 1);
}

verifyDatabase().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
