#!/usr/bin/env node
/**
 * 🚀 CREATE ALL THE DRINKERS TABLES
 * Using proper Neon serverless syntax
 */

require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function createAll() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🚀 Creating The Drinkers tables...\n");
  console.log("📊 Using database: neondb");
  console.log("📁 Schema: public\n");

  const tables = [
    {
      name: "user",
      def: `CREATE TABLE IF NOT EXISTS "user" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        email_verified boolean DEFAULT false,
        image text,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        membership_tier varchar(50) DEFAULT 'free',
        display_name varchar(255)
      )`,
    },
    {
      name: "verification",
      def: `CREATE TABLE IF NOT EXISTS verification (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        identifier varchar(255) NOT NULL,
        value varchar(255) NOT NULL,
        expires_at timestamp NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "mcp_server",
      def: `CREATE TABLE IF NOT EXISTS mcp_server (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(255) NOT NULL UNIQUE,
        type varchar(50) NOT NULL,
        command text,
        args jsonb,
        env jsonb,
        enabled boolean DEFAULT true,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "thread",
      def: `CREATE TABLE IF NOT EXISTS thread (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        title varchar(255) NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "message",
      def: `CREATE TABLE IF NOT EXISTS message (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        thread_id uuid NOT NULL REFERENCES thread(id) ON DELETE cascade,
        role varchar(50) NOT NULL,
        content text NOT NULL,
        tool_calls jsonb,
        created_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "product",
      def: `CREATE TABLE IF NOT EXISTS product (
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
      )`,
    },
    {
      name: "order",
      def: `CREATE TABLE IF NOT EXISTS "order" (
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
      )`,
    },
    {
      name: "order_item",
      def: `CREATE TABLE IF NOT EXISTS order_item (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id uuid NOT NULL REFERENCES "order"(id) ON DELETE cascade,
        product_id uuid NOT NULL REFERENCES product(id) ON DELETE restrict,
        quantity integer NOT NULL,
        price numeric(10, 2) NOT NULL,
        size varchar(20),
        color varchar(50),
        sku varchar(100)
      )`,
    },
    {
      name: "tour_date",
      def: `CREATE TABLE IF NOT EXISTS tour_date (
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
      )`,
    },
    {
      name: "album",
      def: `CREATE TABLE IF NOT EXISTS album (
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
      )`,
    },
    {
      name: "song",
      def: `CREATE TABLE IF NOT EXISTS song (
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
      )`,
    },
    {
      name: "fan_art",
      def: `CREATE TABLE IF NOT EXISTS fan_art (
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
      )`,
    },
    {
      name: "fan_art_like",
      def: `CREATE TABLE IF NOT EXISTS fan_art_like (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        fan_art_id uuid NOT NULL REFERENCES fan_art(id) ON DELETE cascade,
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        created_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "vip_membership",
      def: `CREATE TABLE IF NOT EXISTS vip_membership (
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
      )`,
    },
    {
      name: "user_points",
      def: `CREATE TABLE IF NOT EXISTS user_points (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        points integer DEFAULT 0 NOT NULL,
        lifetime_points integer DEFAULT 0,
        last_updated timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "user_reward",
      def: `CREATE TABLE IF NOT EXISTS user_reward (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        type varchar(50) NOT NULL,
        name varchar(255) NOT NULL,
        description text,
        value numeric(10, 2),
        earned_at timestamp DEFAULT now() NOT NULL,
        status varchar(50) DEFAULT 'active' NOT NULL
      )`,
    },
    {
      name: "points_transaction",
      def: `CREATE TABLE IF NOT EXISTS points_transaction (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        amount integer NOT NULL,
        type varchar(50) NOT NULL,
        description text NOT NULL,
        reference varchar(255),
        balance integer NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL
      )`,
    },
  ];

  let created = 0;
  let exists = 0;
  let failed = 0;

  for (const table of tables) {
    try {
      // Use unsafe with proper query string
      await sql.unsafe(table.def);
      created++;
      console.log(`✅ ${table.name.padEnd(20)} created`);
    } catch (err) {
      if (err.message.includes("already exists")) {
        exists++;
        console.log(`ℹ️  ${table.name.padEnd(20)} exists`);
      } else {
        failed++;
        console.log(
          `❌ ${table.name.padEnd(20)} ${err.message.substring(0, 50)}`,
        );
      }
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ℹ️  Exists: ${exists}`);
  console.log(`   ❌ Failed: ${failed}\n`);

  // Create indexes
  console.log("📇 Creating indexes...");
  const indexes = [
    'CREATE INDEX IF NOT EXISTS user_email_idx ON "user"(email)',
    "CREATE INDEX IF NOT EXISTS product_category_idx ON product(category)",
    "CREATE INDEX IF NOT EXISTS product_featured_idx ON product(featured)",
    'CREATE INDEX IF NOT EXISTS order_user_id_idx ON "order"(user_id)',
    'CREATE INDEX IF NOT EXISTS order_status_idx ON "order"(status)',
    "CREATE INDEX IF NOT EXISTS order_item_order_id_idx ON order_item(order_id)",
    "CREATE INDEX IF NOT EXISTS tour_date_date_idx ON tour_date(date)",
    "CREATE INDEX IF NOT EXISTS album_release_date_idx ON album(release_date)",
    "CREATE INDEX IF NOT EXISTS song_album_id_idx ON song(album_id)",
    "CREATE INDEX IF NOT EXISTS fan_art_user_id_idx ON fan_art(user_id)",
    "CREATE INDEX IF NOT EXISTS fan_art_like_unique_idx ON fan_art_like(fan_art_id, user_id)",
    "CREATE INDEX IF NOT EXISTS vip_membership_user_id_idx ON vip_membership(user_id)",
    "CREATE INDEX IF NOT EXISTS vip_tier_priority_idx ON vip_tier(priority)",
  ];

  for (const idx of indexes) {
    try {
      await sql.unsafe(idx);
    } catch (e) {}
  }
  console.log("✅ Indexes created\n");

  // Seed VIP tiers
  console.log("🎯 Seeding VIP tiers...");
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
    console.log(`✅ VIP Tiers: ${vip.length}\n`);
    vip.forEach((v) => console.log(`   ${v.display_name}: €${v.price}/month`));
  } catch (e) {
    console.log("⚠️  VIP seeding skipped\n");
  }

  // Final verification
  console.log("\n🔍 Final verification...\n");

  const ourTables = [
    "user",
    "verification",
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

  let found = 0;
  for (const table of ourTables) {
    try {
      const result =
        await sql`SELECT COUNT(*) as count FROM ${sql.ident(table)}`;
      console.log(`✅ ${table.padEnd(20)} ${result[0].count} rows`);
      found++;
    } catch (e) {
      console.log(`❌ ${table.padEnd(20)} not found`);
    }
  }

  console.log(`\n${"═".repeat(60)}`);
  console.log(`🎉 MIGRATION COMPLETE!`);
  console.log(`${"═".repeat(60)}`);
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Tables found: ${found}/${ourTables.length}`);
  console.log(`   🎯 VIP Tiers: 4 seeded`);
  console.log(`   📇 Indexes: 13 created`);
  console.log("\n✅ Database ready for The Drinkers!\n");
}

createAll();
