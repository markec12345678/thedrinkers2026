const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkIfSeedNeeded() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking if seed is needed...\n");

  try {
    // Check products
    const products = await sql`SELECT COUNT(*) as count FROM product`;
    console.log(`📦 Products: ${products[0].count}`);

    // Check tour dates
    const tourDates = await sql`SELECT COUNT(*) as count FROM tour_date`;
    console.log(`🎫 Tour Dates: ${tourDates[0].count}`);

    // Check albums
    const albums = await sql`SELECT COUNT(*) as count FROM album`;
    console.log(`💿 Albums: ${albums[0].count}`);

    // Check vip tiers
    const vipTiers = await sql`SELECT COUNT(*) as count FROM vip_tier`;
    console.log(`👑 VIP Tiers: ${vipTiers[0].count}`);

    // Check fan art
    const fanArt = await sql`SELECT COUNT(*) as count FROM fan_art`;
    console.log(`🎨 Fan Art: ${fanArt[0].count}`);

    console.log("\n" + "=".repeat(50));

    const totalProducts = parseInt(products[0].count);
    const totalTourDates = parseInt(tourDates[0].count);
    const totalAlbums = parseInt(albums[0].count);
    const totalVipTiers = parseInt(vipTiers[0].count);
    const totalFanArt = parseInt(fanArt[0].count);

    if (
      totalProducts === 0 &&
      totalTourDates === 0 &&
      totalAlbums === 0 &&
      totalVipTiers === 0 &&
      totalFanArt === 0
    ) {
      console.log("⚠️  Database is EMPTY - Seed is NEEDED!");
      console.log("\n✅ I will run the seed now...\n");
      return true;
    } else {
      console.log("✅ Database already has data!");
      console.log("\n📊 Existing data found:");
      if (totalProducts > 0) console.log(`   - ${totalProducts} products`);
      if (totalTourDates > 0) console.log(`   - ${totalTourDates} tour dates`);
      if (totalAlbums > 0) console.log(`   - ${totalAlbums} albums`);
      if (totalVipTiers > 0) console.log(`   - ${totalVipTiers} vip tiers`);
      if (totalFanArt > 0) console.log(`   - ${totalFanArt} fan art`);
      console.log("\n⚠️  Seed NOT needed (data already exists)");
      return false;
    }
  } catch (err) {
    console.error("❌ Error checking database:", err.message);
    return false;
  }
}

checkIfSeedNeeded();
