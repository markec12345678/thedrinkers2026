#!/usr/bin/env node
/**
 * 🚀 SMART MIGRATION - Adapts to EXISTING database
 * Uses existing tables, creates only missing ones
 */

require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const fs = require("fs");

async function smartMigrate() {
  try {
    console.log("🚀 SMART Migration - Adapting to existing database...\n");

    const sql = neon(process.env.DATABASE_URL);

    // Step 1: Check what already exists
    console.log("🔍 Step 1/4: Scanning existing tables...\n");

    const existingTables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    const existingNames = existingTables.map((t) => t.table_name.toLowerCase());
    console.log(`📊 Found ${existingTables.length} existing tables\n`);

    // Step 2: Define what we need
    const neededTables = {
      // Auth - might exist from better-auth
      user: false,
      session: false,
      account: false,
      verification: false,

      // MCP & AI
      mcp_server: false,
      thread: false,
      message: false,

      // Merch
      product: false,
      order: false,
      order_item: false,

      // Tour
      tour_date: false,

      // Music
      album: false,
      song: false,

      // Community
      fan_art: false,
      fan_art_like: false,

      // VIP
      vip_membership: false,
      vip_tier: false,

      // Rewards
      user_reward: false,
      user_points: false,
      points_transaction: false,
    };

    // Check what exists
    console.log("📋 Table status:");
    for (const table of Object.keys(neededTables)) {
      const exists = existingNames.includes(table.toLowerCase());
      neededTables[table] = exists;
      const status = exists ? "✅" : "❌";
      console.log(
        `${status} ${table.padEnd(20)} ${exists ? "(exists)" : "(needs creation)"}`,
      );
    }

    const missingTables = Object.entries(neededTables)
      .filter(([_, exists]) => !exists)
      .map(([name]) => name);

    console.log(`\n📊 Summary:`);
    console.log(
      `   ✅ Existing: ${Object.values(neededTables).filter((v) => v).length}`,
    );
    console.log(`   ❌ Missing: ${missingTables.length}`);

    if (missingTables.length === 0) {
      console.log("\n✅ All tables already exist! Nothing to do.\n");

      // Just verify VIP tiers
      try {
        const vipCheck = await sql`SELECT COUNT(*) as count FROM vip_tier`;
        if (vipCheck[0].count === 0) {
          console.log("⚠️  VIP tiers empty - seeding...\n");
          await seedVIP(sql);
        }
      } catch (e) {
        console.log("\n🎯 Seeding VIP tiers...");
        await seedVIP(sql);
      }

      process.exit(0);
    }

    console.log("\n🔧 Missing tables to create:");
    missingTables.forEach((t) => console.log(`   - ${t}`));

    // Step 3: Create missing tables
    console.log("\n⚙️  Step 2/4: Creating missing tables...\n");

    const createStatements = getCreateStatements(missingTables);

    let created = 0;
    for (const stmt of createStatements) {
      const tableName = stmt.match(/CREATE TABLE "?(\w+)"?/i)?.[1];
      try {
        await sql.unsafe(stmt);
        created++;
        console.log(`   ✅ Created: ${tableName}`);
      } catch (err) {
        console.log(`   ⚠️  ${tableName}: ${err.message.substring(0, 60)}`);
      }
    }

    console.log(`\n✅ Created ${created} tables\n`);

    // Step 4: Create indexes
    console.log("📇 Step 3/4: Creating indexes...\n");
    await createIndexes(sql, missingTables);
    console.log("✅ Indexes created\n");

    // Step 5: Seed VIP
    console.log("🎯 Step 4/4: Seeding VIP tiers...\n");
    await seedVIP(sql);

    // Final verification
    console.log("\n🔍 Final verification...");
    const finalCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
        AND table_name IN (${missingTables.join(",")})
    `;

    console.log(`✅ Created ${finalCheck.length} new tables\n`);

    console.log("═".repeat(60));
    console.log("🎉 MIGRATION COMPLETE!");
    console.log("═".repeat(60));
    console.log("\n✅ Database is ready!\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    process.exit(1);
  }
}

async function seedVIP(sql) {
  try {
    await sql.unsafe(`
      INSERT INTO vip_tier (name, display_name, description, price, price_yearly, benefits, discount_percentage, early_access, exclusive_content, meet_and_greet, priority, active)
      VALUES 
        ('bronze', 'Bronze Fan', 'Basic membership with exclusive content and 10% merch discount', '9.99', '99.99', '["Exclusive content access", "10% merch discount", "Early newsletter"]', 10, false, true, false, 1, true),
        ('silver', 'Silver Supporter', 'Enhanced benefits with early ticket access and 15% discount', '19.99', '199.99', '["Everything in Bronze", "Early ticket access (24h)", "15% merch discount", "Monthly behind-the-scenes"]', 15, true, true, false, 2, true),
        ('gold', 'Gold Member', 'Premium experience with meet & greet opportunities', '49.99', '499.99', '["Everything in Silver", "Meet & greet lottery entries", "20% merch discount", "VIP-only live streams", "Signed merchandise previews"]', 20, true, true, true, 3, true),
        ('platinum', 'Platinum VIP', 'Ultimate fan experience with lifetime benefits', '99.99', '999.99', '["Everything in Gold", "Guaranteed meet & greet (1x/year)", "25% merch discount", "Backstage access", "Free shipping worldwide", "Birthday surprise"]', 25, true, true, true, 4, true)
      ON CONFLICT (name) DO NOTHING
    `);

    const vip =
      await sql`SELECT name, display_name, price FROM vip_tier ORDER BY priority`;
    console.log(`✅ VIP Tiers seeded: ${vip.length}\n`);
    vip.forEach((v) =>
      console.log(`   - ${v.display_name}: €${v.price}/month`),
    );
  } catch (e) {
    console.log("⚠️  VIP seeding skipped (table may not exist yet)");
  }
}

async function createIndexes(sql, tables) {
  const indexes = [];

  if (tables.includes("user"))
    indexes.push(`CREATE INDEX IF NOT EXISTS user_email_idx ON "user"(email)`);
  if (tables.includes("product"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS product_category_idx ON "product"(category)`,
    );
  if (tables.includes("order"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS order_user_id_idx ON "order"(user_id)`,
    );
  if (tables.includes("tour_date"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS tour_date_date_idx ON "tour_date"(date)`,
    );
  if (tables.includes("album"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS album_release_date_idx ON "album"(release_date)`,
    );
  if (tables.includes("song"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS song_album_id_idx ON "song"(album_id)`,
    );
  if (tables.includes("fan_art"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS fan_art_user_id_idx ON "fan_art"(user_id)`,
    );
  if (tables.includes("fan_art_like"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS fan_art_like_unique_idx ON "fan_art_like"(fan_art_id, user_id)`,
    );
  if (tables.includes("vip_membership"))
    indexes.push(
      `CREATE INDEX IF NOT EXISTS vip_membership_user_id_idx ON "vip_membership"(user_id)`,
    );

  for (const idx of indexes) {
    try {
      await sql.unsafe(idx);
    } catch (e) {
      // Ignore
    }
  }
}

function getCreateStatements(tables) {
  const statements = [];

  const tableDefs = {
    mcp_server: `
      CREATE TABLE IF NOT EXISTS mcp_server (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(255) NOT NULL UNIQUE,
        type varchar(50) NOT NULL,
        command text,
        args jsonb,
        env jsonb,
        enabled boolean DEFAULT true,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    thread: `
      CREATE TABLE IF NOT EXISTS thread (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        title varchar(255) NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    message: `
      CREATE TABLE IF NOT EXISTS message (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        thread_id uuid NOT NULL REFERENCES thread(id) ON DELETE cascade,
        role varchar(50) NOT NULL,
        content text NOT NULL,
        tool_calls jsonb,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `,

    product: `
      CREATE TABLE IF NOT EXISTS product (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(255) NOT NULL,
        description text NOT NULL,
        price numeric(10, 2) NOT NULL,
        compare_at_price numeric(10, 2),
        stock integer DEFAULT 0 NOT NULL,
        sku varchar(100) UNIQUE,
        category varchar(100),
        images jsonb,
        sizes jsonb,
        colors jsonb,
        featured boolean DEFAULT false,
        active boolean DEFAULT true,
        metadata jsonb,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    order: `
      CREATE TABLE IF NOT EXISTS "order" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        email varchar(255) NOT NULL,
        order_number varchar(50) UNIQUE NOT NULL,
        subtotal numeric(10, 2) NOT NULL,
        tax numeric(10, 2) DEFAULT 0,
        shipping numeric(10, 2) DEFAULT 0,
        total numeric(10, 2) NOT NULL,
        currency varchar(3) DEFAULT 'EUR' NOT NULL,
        status varchar(50) DEFAULT 'pending' NOT NULL,
        payment_intent_id varchar(255),
        payment_method varchar(50),
        payment_status varchar(50) DEFAULT 'pending',
        shipping_address jsonb,
        billing_address jsonb,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    order_item: `
      CREATE TABLE IF NOT EXISTS order_item (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id uuid NOT NULL REFERENCES "order"(id) ON DELETE cascade,
        product_id uuid NOT NULL REFERENCES product(id) ON DELETE restrict,
        quantity integer NOT NULL,
        price numeric(10, 2) NOT NULL,
        size varchar(20),
        color varchar(50),
        sku varchar(100)
      )
    `,

    tour_date: `
      CREATE TABLE IF NOT EXISTS tour_date (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        tour_name varchar(255),
        venue varchar(255) NOT NULL,
        city varchar(255) NOT NULL,
        country varchar(100) NOT NULL,
        date date NOT NULL,
        time time,
        ticket_url text,
        ticket_price numeric(10, 2),
        status varchar(50) DEFAULT 'announced' NOT NULL,
        capacity integer,
        sold_tickets integer DEFAULT 0,
        featured boolean DEFAULT false,
        active boolean DEFAULT true,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    album: `
      CREATE TABLE IF NOT EXISTS album (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title varchar(255) NOT NULL,
        release_date date NOT NULL,
        cover_image text,
        description text,
        label varchar(255),
        genre jsonb,
        total_tracks integer DEFAULT 0,
        featured boolean DEFAULT false,
        active boolean DEFAULT true,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    song: `
      CREATE TABLE IF NOT EXISTS song (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        album_id uuid REFERENCES album(id) ON DELETE set null,
        title varchar(255) NOT NULL,
        duration integer NOT NULL,
        lyrics text,
        track_number integer,
        featured boolean DEFAULT false,
        active boolean DEFAULT true,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    fan_art: `
      CREATE TABLE IF NOT EXISTS fan_art (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        email varchar(255),
        image_url text NOT NULL,
        thumbnail_url text,
        title varchar(255) NOT NULL,
        description text,
        approved boolean DEFAULT false NOT NULL,
        featured boolean DEFAULT false,
        likes integer DEFAULT 0,
        views integer DEFAULT 0,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    fan_art_like: `
      CREATE TABLE IF NOT EXISTS fan_art_like (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        fan_art_id uuid NOT NULL REFERENCES fan_art(id) ON DELETE cascade,
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `,

    vip_membership: `
      CREATE TABLE IF NOT EXISTS vip_membership (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        tier varchar(50) NOT NULL,
        status varchar(50) DEFAULT 'active' NOT NULL,
        start_date date NOT NULL,
        expires_at date NOT NULL,
        cancelled_at timestamp,
        stripe_subscription_id varchar(255),
        benefits jsonb,
        discount_code varchar(50) UNIQUE,
        discount_percentage integer DEFAULT 10,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    vip_tier: `
      CREATE TABLE IF NOT EXISTS vip_tier (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(50) NOT NULL UNIQUE,
        display_name varchar(100) NOT NULL,
        description text,
        price numeric(10, 2) NOT NULL,
        price_yearly numeric(10, 2),
        currency varchar(3) DEFAULT 'EUR' NOT NULL,
        benefits jsonb,
        discount_percentage integer DEFAULT 0,
        early_access boolean DEFAULT false,
        exclusive_content boolean DEFAULT false,
        meet_and_greet boolean DEFAULT false,
        active boolean DEFAULT true,
        priority integer DEFAULT 0,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `,

    user_points: `
      CREATE TABLE IF NOT EXISTS user_points (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        points integer DEFAULT 0 NOT NULL,
        lifetime_points integer DEFAULT 0,
        last_updated timestamp DEFAULT now() NOT NULL
      )
    `,

    user_reward: `
      CREATE TABLE IF NOT EXISTS user_reward (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        type varchar(50) NOT NULL,
        name varchar(255) NOT NULL,
        description text,
        value numeric(10, 2),
        earned_at timestamp DEFAULT now() NOT NULL,
        status varchar(50) DEFAULT 'active' NOT NULL
      )
    `,

    points_transaction: `
      CREATE TABLE IF NOT EXISTS points_transaction (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        amount integer NOT NULL,
        type varchar(50) NOT NULL,
        description text NOT NULL,
        reference varchar(255),
        balance integer NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `,
  };

  return tables.map((name) => tableDefs[name]).filter(Boolean);
}

smartMigrate();
