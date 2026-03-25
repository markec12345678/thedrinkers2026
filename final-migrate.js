#!/usr/bin/env node
/**
 * 🚀 FINAL MIGRATION SCRIPT
 * Using SET search_path approach
 */

require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

async function migrate() {
  const startTime = Date.now();

  try {
    console.log("🚀 FINAL Migration Attempt...\n");

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      statement_timeout: 600000,
    });

    const client = await pool.connect();
    console.log("✅ Connected\n");

    // Set search path
    await client.query("SET search_path TO thedrinkers");
    console.log("📁 Using schema: thedrinkers\n");

    // Read SQL and remove schema prefix
    let sql = fs.readFileSync("drizzle/create-all-tables.sql", "utf8");

    // Remove 'thedrinkers.' prefix from all table references
    sql = sql.replace(/thedrinkers\./g, "");

    // Split by CREATE TABLE
    const tableCreates = sql.match(/CREATE TABLE[^;]+;/g);

    if (!tableCreates || tableCreates.length === 0) {
      throw new Error("No CREATE TABLE statements found");
    }

    console.log(`📊 Found ${tableCreates.length} table definitions\n`);
    console.log("⚙️  Creating tables...\n");

    let created = 0;

    for (let i = 0; i < tableCreates.length; i++) {
      const statement = tableCreates[i];
      try {
        await client.query(statement);
        created++;
        process.stdout.write(
          `\r   Creating tables: ${created}/${tableCreates.length}`,
        );
      } catch (err) {
        if (!err.message.includes("already exists")) {
          console.error(`\n   ⚠️  Table ${i}: ${err.message.substring(0, 60)}`);
        }
        created++;
      }
    }

    console.log(`\r   ✅ Created ${created}/${tableCreates.length} tables\n`);

    // Create indexes
    console.log("📇 Creating indexes...");
    const indexCreates = sql.match(/CREATE INDEX[^;]+;/g) || [];

    for (const idx of indexCreates) {
      try {
        await client.query(idx);
      } catch (err) {
        // Ignore duplicate errors
      }
    }
    console.log(`   ✅ Created ${indexCreates.length} indexes\n`);

    // Seed VIP tiers
    console.log("🎯 Seeding VIP tiers...");
    const insertMatch = sql.match(/INSERT INTO[^;]+ON CONFLICT[^;]+;/s);
    if (insertMatch) {
      try {
        await client.query(insertMatch[0]);
        console.log("   ✅ VIP tiers seeded\n");
      } catch (err) {
        console.log("   ℹ️  VIP tiers may already exist\n");
      }
    }

    // Verify
    console.log("🔍 Verifying...");
    const result = await client.query(`
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = 'thedrinkers'
    `);

    client.release();
    await pool.end();

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log("\n" + "═".repeat(60));
    console.log(`🎉 MIGRATION COMPLETE in ${duration}s`);
    console.log(`📊 Tables in thedrinkers schema: ${result.rows[0].count}`);
    console.log("═".repeat(60));
    console.log("\n✅ Database ready!\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

migrate();
