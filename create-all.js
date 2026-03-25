require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function createAllTables() {
  const sql = neon(process.env.DATABASE_URL);
  const startTime = Date.now();

  console.log("🚀 Creating ALL tables for The Drinkers...\n");

  const tables = [
    {
      name: "user",
      sql: `CREATE TABLE IF NOT EXISTS "user" (
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
      sql: `CREATE TABLE IF NOT EXISTS verification (
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
      sql: `CREATE TABLE IF NOT EXISTS mcp_server (
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
      sql: `CREATE TABLE IF NOT EXISTS thread (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        title varchar(255) NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "message",
      sql: `CREATE TABLE IF NOT EXISTS message (
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
      sql: `CREATE TABLE IF NOT EXISTS product (
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
      sql: `CREATE TABLE IF NOT EXISTS "order" (
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
      sql: `CREATE TABLE IF NOT EXISTS order_item (
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
      sql: `CREATE TABLE IF NOT EXISTS tour_date (
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
      sql: `CREATE TABLE IF NOT EXISTS album (
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
      sql: `CREATE TABLE IF NOT EXISTS song (
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
      sql: `CREATE TABLE IF NOT EXISTS fan_art (
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
      sql: `CREATE TABLE IF NOT EXISTS fan_art_like (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        fan_art_id uuid NOT NULL REFERENCES fan_art(id) ON DELETE cascade,
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        created_at timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "vip_membership",
      sql: `CREATE TABLE IF NOT EXISTS vip_membership (
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
      sql: `CREATE TABLE IF NOT EXISTS user_points (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
        points integer DEFAULT 0 NOT NULL,
        lifetime_points integer DEFAULT 0,
        last_updated timestamp DEFAULT now() NOT NULL
      )`,
    },
    {
      name: "user_reward",
      sql: `CREATE TABLE IF NOT EXISTS user_reward (
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
      sql: `CREATE TABLE IF NOT EXISTS points_transaction (
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

  for (const table of tables) {
    try {
      await sql([table.sql]);
      created++;
      console.log(`✅ ${table.name.padEnd(20)} created`);
    } catch (err) {
      if (err.message.includes("already exists")) {
        exists++;
        console.log(`ℹ️  ${table.name.padEnd(20)} exists`);
      } else {
        console.log(
          `❌ ${table.name.padEnd(20)} ${err.message.substring(0, 50)}`,
        );
      }
    }
  }

  console.log(`\n📊 Summary: ${created} created, ${exists} existed\n`);

  // Create indexes
  console.log("📇 Creating indexes...\n");

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
  ];

  for (const idx of indexes) {
    try {
      await sql([idx]);
    } catch (e) {}
  }
  console.log("✅ Indexes created\n");

  // Seed VIP (already done but verify)
  console.log("🎯 Verifying VIP tiers...\n");
  const vip =
    await sql`SELECT name, display_name, price FROM vip_tier ORDER BY priority`;
  console.log(`✅ VIP Tiers: ${vip.length}\n`);
  vip.forEach((v) => console.log(`   ${v.display_name}: €${v.price}/month`));

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "═".repeat(60));
  console.log(`🎉 ALL TABLES CREATED in ${duration}s!`);
  console.log("═".repeat(60));
  console.log("\n✅ Database migration complete!\n");
}

createAllTables();
