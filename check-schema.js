require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function checkSchemas() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking database schemas...\n");

  // Check all schemas
  const schemas = await sql`
    SELECT schema_name 
    FROM information_schema.schemata 
    ORDER BY schema_name
  `;

  console.log("📋 All schemas:");
  schemas.forEach((s) => console.log(`   - ${s.schema_name}`));

  // Check tables in thedrinkers schema
  console.log('\n📊 Tables in "thedrinkers" schema:');
  console.log("─".repeat(50));

  const thedrinkersTables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'thedrinkers'
    ORDER BY table_name
  `;

  thedrinkersTables.forEach((t) => console.log(`   ✅ ${t.table_name}`));
  console.log(`\nTotal: ${thedrinkersTables.length} tables`);

  // Check tables in public schema
  console.log('\n📊 Tables in "public" schema:');
  console.log("─".repeat(50));

  const publicTables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;

  publicTables.forEach((t) => console.log(`   - ${t.table_name}`));
  console.log(`\nTotal: ${publicTables.length} tables`);
}

checkSchemas().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
