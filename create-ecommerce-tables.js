#!/usr/bin/env node

/**
 * 🗄️ CREATE E-COMMERCE TABLES
 * Creates all necessary tables for drops and bundles
 *
 * Usage: node create-ecommerce-tables.js
 */

const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🗄️  CREATE E-COMMERCE TABLES  🗄️                     ║
║                                                           ║
║   Creating limited drops and bundles tables             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

async function createTables() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("📊 Creating Tables...\n");

  try {
    // Create limited_drop table
    console.log("✅ Creating limited_drop table...");
    await sql`
      CREATE TABLE IF NOT EXISTS limited_drop (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        quantity_remaining INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        vip_early_access BOOLEAN DEFAULT false,
        vip_early_access_hours INTEGER,
        is_active BOOLEAN DEFAULT true,
        is_sold_out BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL
      )
    `;

    // Create drop_entry table
    console.log("✅ Creating drop_entry table...");
    await sql`
      CREATE TABLE IF NOT EXISTS drop_entry (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        drop_id UUID REFERENCES limited_drop(id) ON DELETE CASCADE,
        user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
        purchased_at TIMESTAMP DEFAULT now(),
        quantity INTEGER DEFAULT 1
      )
    `;

    // Create drop_waitlist table
    console.log("✅ Creating drop_waitlist table...");
    await sql`
      CREATE TABLE IF NOT EXISTS drop_waitlist (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        drop_id UUID REFERENCES limited_drop(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
        notified_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT now() NOT NULL
      )
    `;

    // Create bundle table
    console.log("✅ Creating bundle table...");
    await sql`
      CREATE TABLE IF NOT EXISTS bundle (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        items JSONB NOT NULL,
        bundle_price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2) NOT NULL,
        savings DECIMAL(10,2),
        savings_percent INTEGER,
        quantity INTEGER DEFAULT -1,
        quantity_remaining INTEGER,
        is_active BOOLEAN DEFAULT true,
        is_limited BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL
      )
    `;

    // Create bundle_purchase table
    console.log("✅ Creating bundle_purchase table...");
    await sql`
      CREATE TABLE IF NOT EXISTS bundle_purchase (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        bundle_id UUID REFERENCES bundle(id) ON DELETE SET NULL,
        user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
        order_id UUID REFERENCES "order"(id) ON DELETE SET NULL,
        purchased_at TIMESTAMP DEFAULT now(),
        items_received JSONB
      )
    `;

    // Create indexes
    console.log("✅ Creating indexes...");
    await sql`CREATE INDEX IF NOT EXISTS idx_limited_drop_active ON limited_drop(is_active)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_limited_drop_dates ON limited_drop(start_date, end_date)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_drop_entry_drop ON drop_entry(drop_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_drop_waitlist_drop ON drop_waitlist(drop_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_bundle_active ON bundle(is_active)`;

    console.log(
      "\n╔═══════════════════════════════════════════════════════════╗",
    );
    console.log("║🎉 TABLES CREATED SUCCESSFULLY!                           ║");
    console.log(
      "╚═══════════════════════════════════════════════════════════╝\n",
    );

    console.log("📋 Created Tables:\n");
    console.log("  ✅ limited_drop");
    console.log("  ✅ drop_entry");
    console.log("  ✅ drop_waitlist");
    console.log("  ✅ bundle");
    console.log("  ✅ bundle_purchase\n");

    console.log("📋 NEXT STEPS:\n");
    console.log("1. Refresh server (restart if needed)");
    console.log("2. Visit: http://localhost:3001/drops");
    console.log("3. Test API: http://localhost:3001/api/drops/active\n");
  } catch (error) {
    console.error("❌ Error creating tables:", error.message);
    process.exit(1);
  }
}

createTables();
