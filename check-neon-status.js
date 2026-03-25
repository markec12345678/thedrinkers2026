const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkNeonDatabase() {
  console.log("🔍 Connecting to Neon Database...\n");

  const sql = neon(process.env.DATABASE_URL);

  console.log("✅ Connected!\n");

  // Get all tables
  const allTables = await sql`
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_schema NOT IN ('information_schema', 'pg_catalog', 'drizzle')
    ORDER BY table_schema, table_name
  `;

  console.log(`📊 Found ${allTables.length} tables:\n`);

  // Group by schema
  const bySchema = {};
  allTables.forEach((t) => {
    if (!bySchema[t.table_schema]) bySchema[t.table_schema] = [];
    bySchema[t.table_schema].push(t.table_name);
  });

  Object.entries(bySchema).forEach(([schema, tables]) => {
    console.log(`\n${schema} (${tables.length} tables):`);
    console.log("─".repeat(50));
    tables.slice(0, 20).forEach((t) => console.log(`  - ${t}`));
    if (tables.length > 20) console.log(`  ... and ${tables.length - 20} more`);
  });

  // Check The Drinkers tables
  console.log("\n\n🎯 The Drinkers Required Tables:");
  console.log("═".repeat(60));

  const neededTables = [
    "user",
    "account",
    "session",
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

  let existingCount = 0;

  for (const table of neededTables) {
    try {
      await sql.unsafe(`SELECT 1 FROM "${table}" LIMIT 0`);
      console.log(`✅ ${table}`);
      existingCount++;
    } catch (err) {
      console.log(`❌ ${table}`);
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log(`Status: ${existingCount}/${neededTables.length} tables exist`);

  if (existingCount === neededTables.length) {
    console.log("\n✅ All tables ready! You can run seed now.\n");
  } else {
    console.log("\n⚠️  Some tables missing. Run: npm run db:push\n");
  }

  return existingCount === neededTables.length;
}

checkNeonDatabase().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
