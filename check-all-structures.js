const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkAllStructures() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("📋 Checking ALL table structures for seed...\n");

  const tables = ["product", "tour_date", "album", "vip_tier", "fan_art"];

  for (const table of tables) {
    console.log(`\n📊 ${table} columns:`);
    console.log("─".repeat(60));

    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = ${table}
      ORDER BY ordinal_position
    `;

    columns.forEach((col) => {
      const nullable = col.is_nullable === "YES" ? "NULL" : "NOT NULL";
      console.log(
        `  ${col.column_name.padEnd(25)} ${col.data_type.padEnd(20)} ${nullable}`,
      );
    });
  }
}

checkAllStructures();
