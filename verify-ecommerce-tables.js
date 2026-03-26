const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function verify() {
  const sql = neon(process.env.DATABASE_URL);

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND (table_name LIKE '%drop%' OR table_name LIKE '%bundle%')
  `;

  console.log("New E-commerce Tables:");
  tables.forEach((t) => console.log(`  ✅ ${t.table_name}`));
  console.log(`\nTotal: ${tables.length} tables\n`);
}

verify().catch(console.error);
