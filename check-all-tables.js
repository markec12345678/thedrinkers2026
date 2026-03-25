const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkAllTables() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking ALL tables in database...\n");
  console.log("═".repeat(70));

  // Check all tables
  const allTables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;

  console.log(`\n📊 Total tables in database: ${allTables.length}\n`);

  // Our seed tables
  const seedTables = [
    "product",
    "tour_date",
    "album",
    "song",
    "vip_tier",
    "vip_membership",
    "fan_art",
    "fan_art_like",
    "user",
    "account",
    "session",
    "verification",
    "mcp_server",
    "thread",
    "message",
    "order",
    "order_item",
    "user_reward",
    "user_points",
    "points_transaction",
  ];

  console.log("🎯 The Drinkers Tables:");
  console.log("─".repeat(70));

  for (const table of seedTables) {
    try {
      const result =
        await sql`SELECT COUNT(*) as count FROM ${sql.ident(table)}`;
      const count = result[0]?.count || 0;

      let status = "✅";
      if (count === 0) status = "⚠️ ";

      console.log(
        `${status} ${table.padEnd(20)} ${count.toString().padStart(3)} rows`,
      );
    } catch (err) {
      console.log(`❌ ${table.padEnd(20)} NOT FOUND`);
    }
  }

  console.log("\n" + "═".repeat(70));

  // Show detailed data for seeded tables
  console.log("\n📦 PRODUCTS:");
  const products = await sql`SELECT name, price, category FROM product LIMIT 5`;
  products.forEach((p) =>
    console.log(`   - ${p.name} (€${p.price}, ${p.category})`),
  );

  console.log("\n🎫 TOUR DATES:");
  const tours =
    await sql`SELECT venue, city, date, status FROM tour_date LIMIT 5`;
  tours.forEach((t) =>
    console.log(`   - ${t.venue}, ${t.city} (${t.date}) - ${t.status}`),
  );

  console.log("\n💿 ALBUMS:");
  const albums =
    await sql`SELECT title, release_date, total_tracks FROM album LIMIT 5`;
  albums.forEach((a) =>
    console.log(
      `   - ${a.title} (${a.release_date}, ${a.total_tracks} tracks)`,
    ),
  );

  console.log("\n👑 VIP TIERS:");
  const vips =
    await sql`SELECT name, display_name, price FROM vip_tier LIMIT 5`;
  vips.forEach((v) =>
    console.log(`   - ${v.display_name} (€${v.price}/month)`),
  );

  console.log("\n" + "═".repeat(70));
  console.log("\n✅ Drizzle Studio is running in background!");
  console.log("🌐 Open the URL shown in terminal to view data\n");
}

checkAllTables().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
