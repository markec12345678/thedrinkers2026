require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function createAll() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🚀 Creating tables with proper neon syntax...\n");

  // VIP Tier že obstaja - preskočimo
  // Ustvarimo ostale s pravilno sintakso

  const createTable = async (name, definition) => {
    try {
      // Uporabimo template string z pravilnim formatom
      const query = definition.replace(/\n/g, " ").replace(/\s+/g, " ");
      await sql.unsafe(query);
      console.log(`✅ ${name}`);
      return true;
    } catch (err) {
      if (err.message.includes("already exists")) {
        console.log(`ℹ️  ${name} (exists)`);
        return "exists";
      }
      console.log(`❌ ${name}: ${err.message.substring(0, 60)}`);
      return false;
    }
  };

  let results = [];

  // User table
  results.push(
    await createTable(
      "user",
      `
    CREATE TABLE IF NOT EXISTS "user" (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      email_verified boolean DEFAULT false,
      image text,
      created_at timestamp DEFAULT now() NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL,
      membership_tier varchar(50) DEFAULT 'free',
      display_name varchar(255)
    )
  `,
    ),
  );

  // Verification
  results.push(
    await createTable(
      "verification",
      `
    CREATE TABLE IF NOT EXISTS verification (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      identifier varchar(255) NOT NULL,
      value varchar(255) NOT NULL,
      expires_at timestamp NOT NULL,
      created_at timestamp DEFAULT now() NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    )
  `,
    ),
  );

  // MCP Server
  results.push(
    await createTable(
      "mcp_server",
      `
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
    ),
  );

  // Thread
  results.push(
    await createTable(
      "thread",
      `
    CREATE TABLE IF NOT EXISTS thread (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE cascade,
      title varchar(255) NOT NULL,
      created_at timestamp DEFAULT now() NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    )
  `,
    ),
  );

  // Message
  results.push(
    await createTable(
      "message",
      `
    CREATE TABLE IF NOT EXISTS message (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      thread_id uuid NOT NULL REFERENCES thread(id) ON DELETE cascade,
      role varchar(50) NOT NULL,
      content text NOT NULL,
      tool_calls jsonb,
      created_at timestamp DEFAULT now() NOT NULL
    )
  `,
    ),
  );

  console.log(
    "\n📊 Results:",
    results.filter((r) => r === true).length,
    "created",
  );

  // Verify all
  console.log("\n🔍 Verifying all tables...\n");

  const tables = [
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

  for (const table of tables) {
    try {
      const result =
        await sql`SELECT COUNT(*) as count FROM ${sql.ident(table)}`;
      console.log(`✅ ${table.padEnd(20)} (${result[0].count} rows)`);
    } catch (e) {
      console.log(`❌ ${table.padEnd(20)} (not found)`);
    }
  }
}

createAll();
