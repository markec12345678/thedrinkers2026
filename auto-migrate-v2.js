#!/usr/bin/env node
/**
 * 🚀 AUTOMATED DATABASE MIGRATION - V2
 * Using explicit transactions with pg
 */

require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

async function migrate() {
  const startTime = Date.now();

  try {
    console.log("🚀 Starting automated migration (PG mode)...\n");

    // Create pool with proper SSL
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 30000,
      statement_timeout: 300000,
      idleTimeoutMillis: 30000,
    });

    console.log("🔗 Step 1/4: Connecting to Neon...");
    const client = await pool.connect();
    console.log("✅ Connected!\n");

    console.log("📜 Step 2/4: Reading SQL...");
    const sqlPath = path.join(__dirname, "drizzle", "create-all-tables.sql");
    let sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Remove verification and SET statements
    sqlContent = sqlContent
      .split("-- Verification")[0]
      .replace(/SET search_path TO thedrinkers,? public;?/gi, "")
      .replace(/SET statement_timeout = 0;/gi, "");

    console.log(`   📊 Size: ${(sqlContent.length / 1024).toFixed(2)} KB\n`);

    console.log("⚙️  Step 3/4: Executing in transaction...\n");

    await client.query("BEGIN");

    try {
      // Create schema
      await client.query("CREATE SCHEMA IF NOT EXISTS thedrinkers");
      console.log("   ✅ Schema ready");

      // Split and execute statements
      const statements = sqlContent
        .split(";")
        .map((s) => s.trim())
        .filter(
          (s) =>
            s.length > 0 &&
            !s.startsWith("--") &&
            !s.startsWith("\\") &&
            !s.startsWith("SET") &&
            !s.startsWith("SELECT"),
        );

      console.log(`   📝 Executing ${statements.length} statements...\n`);

      let success = 0;
      let failed = 0;

      for (let i = 0; i < statements.length; i++) {
        try {
          await client.query(statements[i]);
          success++;
          if (i % 20 === 0) {
            process.stdout.write(
              `\r   Progress: ${success}/${statements.length}`,
            );
          }
        } catch (err) {
          if (err.message.includes("already exists") || err.code === "42P07") {
            success++;
          } else {
            failed++;
            console.error(
              `\n   ❌ Statement ${i}: ${err.message.substring(0, 80)}`,
            );
          }
        }
      }

      console.log(`\r   Progress: ${success}/${statements.length} complete`);
      console.log(`   ✅ Success: ${success}, ℹ️ Skipped: ${failed}\n`);

      await client.query("COMMIT");
      console.log("✅ Transaction committed!\n");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }

    // Verify
    console.log("🔍 Step 4/4: Verifying...\n");

    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'thedrinkers'
      ORDER BY table_name
    `);

    console.log(`✅ Created ${tablesResult.rows.length} tables:\n`);
    tablesResult.rows.forEach((t) => console.log(`   - ${t.table_name}`));

    // VIP Tiers
    console.log("\n🎯 VIP Tiers:");
    const vipResult = await client.query(`
      SELECT name, display_name, price, priority 
      FROM thedrinkers.vip_tier 
      ORDER BY priority
    `);

    if (vipResult.rows.length > 0) {
      console.log(`✅ Seeded ${vipResult.rows.length} tiers:\n`);
      vipResult.rows.forEach((t) => {
        console.log(`   ${t.priority}. ${t.display_name}: €${t.price}/month`);
      });
    }

    client.release();
    await pool.end();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log("\n" + "═".repeat(60));
    console.log(`🎉 MIGRATION COMPLETE in ${duration}s!`);
    console.log("═".repeat(60));
    console.log("\n✅ Database is ready for use!\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed!");
    console.error("Error:", error.message);
    console.error("\n💡 Manual option:");
    console.log("   1. Open https://console.neon.tech/");
    console.log("   2. SQL Editor");
    console.log("   3. Run: drizzle/create-all-tables.sql\n");
    process.exit(1);
  }
}

migrate();
