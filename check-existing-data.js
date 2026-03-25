const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkExistingData() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking existing data in database...\n");

  try {
    // Check VIP tiers
    console.log("👑 VIP Tiers:");
    const vipTiers = await sql`SELECT name, display_name, price FROM vip_tier`;
    vipTiers.forEach((t) =>
      console.log(`   - ${t.name}: ${t.display_name} (€${t.price})`),
    );

    // Check if we have the right data
    console.log("\n" + "=".repeat(60));
    console.log("\n📊 Analysis:");

    const expectedTiers = ["bronze", "silver", "gold"];
    const actualTiers = vipTiers.map((t) => t.name);

    const hasAllTiers = expectedTiers.every((tier) =>
      actualTiers.includes(tier),
    );

    if (hasAllTiers && vipTiers.length === 3) {
      console.log("✅ VIP Tiers are complete (bronze, silver, gold)");
    } else if (vipTiers.length === 4) {
      console.log("⚠️  VIP Tiers: 4 found (expected 3)");
      console.log("   Might have duplicate or extra tier");
    } else {
      console.log("❌ VIP Tiers incomplete");
    }

    console.log("\n" + "=".repeat(60));
    console.log("\n💡 Recommendation:");

    if (vipTiers.length === 4) {
      console.log("🗑️  Delete extra VIP tiers and run seed?");
      console.log("\nRun this in SQL Editor:");
      console.log("DELETE FROM vip_tier;");
      console.log("\nThen run seed-database.sql");
    } else if (!hasAllTiers) {
      console.log("📝 Run seed-database.sql to add missing data");
    } else {
      console.log("✅ Database looks good!");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

checkExistingData();
