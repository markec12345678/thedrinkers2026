const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkTableStructure() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Checking table structures...\n");

  // Check tour_date structure
  console.log("📋 tour_date columns:");
  const tourDateColumns = await sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'tour_date'
    ORDER BY ordinal_position
  `;
  tourDateColumns.forEach((col) => {
    console.log(
      `  ${col.column_name.padEnd(20)} ${col.data_type.padEnd(15)} ${col.is_nullable === "YES" ? "NULL" : "NOT NULL"}`,
    );
  });

  console.log("\n\n📋 product columns:");
  const productColumns = await sql`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'product'
    ORDER BY ordinal_position
  `;
  productColumns.slice(0, 10).forEach((col) => {
    console.log(`  ${col.column_name.padEnd(25)} ${col.data_type}`);
  });
  if (productColumns.length > 10) {
    console.log(`  ... and ${productColumns.length - 10} more columns`);
  }
}

checkTableStructure();
