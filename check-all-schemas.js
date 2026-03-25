require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function checkAllSchemas() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking all schemas for our tables...\n");

  // Check all schemas
  const schemas = await sql`
    SELECT DISTINCT table_schema
    FROM information_schema.tables
    WHERE table_schema NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
    ORDER BY table_schema
  `;

  console.log("📋 All schemas:");
  schemas.forEach((s) => console.log(`   - ${s.table_schema}`));

  // Check each schema for our tables
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

  for (const schema of schemas) {
    console.log(`\n📊 Tables in "${schema}" schema:`);
    console.log("─".repeat(50));

    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ${schema.table_schema}
      AND table_name IN (${expectedTables})
      ORDER BY table_name
    `;

    if (tables.length > 0) {
      tables.forEach((t) => console.log(`   ✅ ${t.table_name}`));
    } else {
      console.log("   (no matching tables)");
    }
  }

  // Try to query user table directly
  console.log('\n🔍 Trying to query "user" table directly:');
  try {
    const result = await sql`SELECT * FROM "user" LIMIT 1`;
    console.log('✅ Can query "user" table!');
    console.log("   Columns:", Object.keys(result[0] || {}).join(", "));
  } catch (err) {
    console.log(
      `❌ Cannot query "user" table: ${err.message.substring(0, 60)}`,
    );
  }

  // Try with lowercase
  try {
    const result = await sql`SELECT * FROM user LIMIT 1`;
    console.log("✅ Can query user table (lowercase)!");
  } catch (err) {
    console.log(
      `❌ Cannot query user table (lowercase): ${err.message.substring(0, 60)}`,
    );
  }
}

checkAllSchemas().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
