#!/usr/bin/env node
/**
 * 🚀 NEON DATABASE SETUP
 * Using your Neon project: still-star-68957589
 * Org: org-morning-resonance-94055602
 */

require("dotenv").config();
const https = require("https");

const NEON_API_KEY = process.env.NEON_API_KEY || "npg_rOLVpPuR5kI2"; // From your connection string
const PROJECT_ID = "still-star-68957589";
const ORG_ID = "org-morning-resonance-94055602";

console.log("🔍 NEON PROJECT INFO:");
console.log(`   Org: ${ORG_ID}`);
console.log(`   Project: ${PROJECT_ID}`);
console.log(`   Database: neondb\n`);

// Test database connection
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function testNeon() {
  try {
    console.log("🔗 Testing database connection...\n");

    // Get tables
    const tables = await sql`
      SELECT table_name, table_schema
      FROM information_schema.tables
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
      ORDER BY table_schema, table_name
    `;

    console.log(`📊 Found ${tables.length} tables:\n`);

    const grouped = {};
    tables.forEach((t) => {
      if (!grouped[t.table_schema]) grouped[t.table_schema] = [];
      grouped[t.table_schema].push(t.table_name);
    });

    Object.entries(grouped).forEach(([schema, tables]) => {
      console.log(`${schema}:`);
      tables.forEach((t) => console.log(`  - ${t}`));
      console.log();
    });

    // Check our tables
    console.log("🎯 The Drinkers Tables:");
    const ourTables = [
      "user",
      "product",
      "order",
      "tour_date",
      "album",
      "song",
      "fan_art",
      "vip_tier",
      "vip_membership",
    ];

    for (const table of ourTables) {
      try {
        const result = await sql`SELECT COUNT(*) FROM ${sql.ident(table)}`;
        console.log(`✅ ${table}: ${result[0].count} rows`);
      } catch (e) {
        console.log(`❌ ${table}: not found`);
      }
    }

    console.log("\n✅ Neon connection working!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testNeon();
