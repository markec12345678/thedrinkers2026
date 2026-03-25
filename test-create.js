require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function createOneTable() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔧 Testing table creation...\n");

  try {
    // Try creating vip_tier first (no dependencies)
    console.log("Creating vip_tier table...");

    const result = await sql`
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
    `;

    console.log("✅ Table created!\n");

    // Verify
    console.log("Verifying...");
    const check =
      await sql`SELECT table_name FROM information_schema.tables WHERE table_name = 'vip_tier'`;

    if (check.length > 0) {
      console.log("✅ vip_tier exists in database!\n");

      // Seed
      console.log("Seeding VIP tiers...");
      await sql`
        INSERT INTO vip_tier (name, display_name, price, priority) VALUES
        ('bronze', 'Bronze Fan', '9.99', 1),
        ('silver', 'Silver Supporter', '19.99', 2),
        ('gold', 'Gold Member', '49.99', 3),
        ('platinum', 'Platinum VIP', '99.99', 4)
        ON CONFLICT (name) DO NOTHING
      `;

      const tiers =
        await sql`SELECT name, display_name, price FROM vip_tier ORDER BY priority`;
      console.log(`✅ Seeded ${tiers.length} tiers:\n`);
      tiers.forEach((t) =>
        console.log(`   ${t.display_name}: €${t.price}/month`),
      );
    } else {
      console.log("⚠️  Table not found after creation\n");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

createOneTable();
