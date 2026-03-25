require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function listTables() {
  const sql = neon(process.env.DATABASE_URL);

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;

  console.log(`All ${tables.length} tables in database:\n`);

  // Group by first letter
  const grouped = {};
  tables.forEach((t) => {
    const first = t.table_name[0].toLowerCase();
    if (!grouped[first]) grouped[first] = [];
    grouped[first].push(t.table_name);
  });

  Object.keys(grouped)
    .sort()
    .forEach((letter) => {
      console.log(`${letter.toUpperCase()}:`);
      grouped[letter].forEach((name) => console.log(`  - ${name}`));
    });
}

listTables();
