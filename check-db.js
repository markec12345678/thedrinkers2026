require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

async function check() {
  const sql = neon(process.env.DATABASE_URL);

  const result =
    await sql`SELECT current_database() as db, current_schema() as schema`;
  console.log("Database:", result[0].db);
  console.log("Schema:", result[0].schema);

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name IN ('product', 'products', 'tour_date', 'tour_dates')
    ORDER BY table_name
  `;

  console.log("\nFound tables:");
  tables.forEach((t) => console.log("  -", t.table_name));
}

check();
