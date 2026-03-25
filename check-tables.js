require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function checkTables() {
  const sql = neon(process.env.DATABASE_URL);

  // Check all tables with 'user' in name
  const userTables = await sql`
    SELECT table_name, table_type
    FROM information_schema.tables 
    WHERE table_schema = 'public'
      AND (table_name ILIKE '%user%' OR table_name ILIKE '%product%' OR table_name ILIKE '%order%')
    ORDER BY table_name
  `;

  console.log("Tables containing user/product/order:");
  userTables.forEach((t) => console.log(`  - ${t.table_name}`));

  // Check if our tables exist with exact names
  const ourTables = [
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

  console.log("\nChecking exact table names:");
  for (const table of ourTables) {
    try {
      const result = await sql`SELECT 1 FROM ${sql.ident(table)} LIMIT 1`;
      console.log(`✅ ${table} exists`);
    } catch (e) {
      if (e.message.includes("does not exist")) {
        console.log(`❌ ${table} missing`);
      } else {
        console.log(`⚠️  ${table} error: ${e.message.substring(0, 50)}`);
      }
    }
  }
}

checkTables();
