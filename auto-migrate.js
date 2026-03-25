#!/usr/bin/env node
/**
 * 🚀 AUTOMATED DATABASE MIGRATION
 * The Drinkers - Music Artist Platform
 *
 * This script will:
 * 1. Connect to Neon database
 * 2. Create all tables in 'thedrinkers' schema
 * 3. Seed VIP tiers
 * 4. Verify migration
 */

require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

async function migrate() {
  const startTime = Date.now();

  try {
    console.log("🚀 Starting automated migration...\n");

    // Step 1: Connect
    console.log("🔗 Step 1/4: Connecting to Neon database...");
    const sql = neon(process.env.DATABASE_URL);
    await sql`SELECT 1`;
    console.log("✅ Connected!\n");

    // Step 2: Read SQL
    console.log("📜 Step 2/4: Reading SQL migration file...");
    const sqlPath = path.join(__dirname, "drizzle", "create-all-tables.sql");

    if (!fs.existsSync(sqlPath)) {
      throw new Error(`SQL file not found: ${sqlPath}`);
    }

    let sqlContent = fs.readFileSync(sqlPath, "utf8");
    console.log(`   📊 File size: ${(sqlContent.length / 1024).toFixed(2)} KB`);

    // Remove verification query
    sqlContent = sqlContent.split("-- Verification")[0];
    console.log("✅ SQL loaded!\n");

    // Step 3: Execute
    console.log("⚙️  Step 3/4: Executing migrations...");
    console.log("   This may take 10-30 seconds...\n");

    await sql.unsafe(sqlContent);
    console.log("✅ Migrations executed!\n");

    // Step 4: Verify
    console.log("🔍 Step 4/4: Verifying migration...\n");

    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'thedrinkers'
      ORDER BY table_name
    `;

    console.log(
      `✅ Created ${tables.length} tables in 'thedrinkers' schema:\n`,
    );
    tables.forEach((t) => console.log(`   - ${t.table_name}`));

    // Check VIP tiers
    console.log("\n🎯 Checking VIP Tiers...");
    const vipTiers = await sql`
      SELECT name, display_name, price, priority 
      FROM thedrinkers.vip_tier 
      ORDER BY priority
    `;

    if (vipTiers.length > 0) {
      console.log(`✅ Seeded ${vipTiers.length} VIP tiers:\n`);
      vipTiers.forEach((t) => {
        console.log(`   ${t.priority}. ${t.display_name}: €${t.price}/month`);
      });
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log("\n" + "═".repeat(60));
    console.log(`🎉 MIGRATION COMPLETE in ${duration}s!`);
    console.log("═".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`   ✅ Tables: ${tables.length}`);
    console.log(`   ✅ VIP Tiers: ${vipTiers.length}`);
    console.log(`   ⏱️  Duration: ${duration}s`);
    console.log("\n✅ Database is ready!\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed!");
    console.error("Error:", error.message);
    console.error("\n💡 Try running migration via Neon Dashboard:");
    console.log("   1. Open https://console.neon.tech/");
    console.log("   2. Go to SQL Editor");
    console.log("   3. Copy & paste: drizzle/create-all-tables.sql");
    console.log("   4. Click RUN\n");
    process.exit(1);
  }
}

migrate();
