require("dotenv").config();
const { Pool } = require("pg");

async function createTablesWithPG() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
    statement_timeout: 300000,
  });

  try {
    console.log("🔗 Connecting with node-postgres...");
    const client = await pool.connect();
    console.log("✅ Connected!\n");

    console.log("📜 Executing SQL...");

    // Create schema first
    await client.query("CREATE SCHEMA IF NOT EXISTS thedrinkers");
    console.log("✅ Schema ready\n");

    // Read and execute SQL
    const fs = require("fs");
    const path = require("path");
    const sqlPath = path.join(__dirname, "drizzle", "create-all-tables.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Split by semicolons and execute each
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter(
        (s) => s.length > 0 && !s.startsWith("--") && !s.startsWith("\\"),
      );

    console.log(`⚙️  Executing ${statements.length} statements...\n`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < statements.length; i++) {
      try {
        await client.query(statements[i]);
        success++;
        if (i % 10 === 0) {
          process.stdout.write(
            `\r   Progress: ${success}/${statements.length}`,
          );
        }
      } catch (err) {
        if (err.message.includes("already exists") || err.code === "42P07") {
          success++;
        } else {
          failed++;
          console.error(
            `\n❌ Statement ${i}: ${err.message.substring(0, 100)}`,
          );
        }
      }
    }

    console.log(`\r   Progress: ${success}/${statements.length} complete\n`);
    console.log(`✅ Success: ${success}, Failed: ${failed}\n`);

    // Verify
    const result = await client.query(`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'thedrinkers'
    `);

    console.log(
      `📊 Tables in thedrinkers schema: ${result.rows[0].table_count}\n`,
    );

    // Check VIP tiers
    const vipResult = await client.query(`
      SELECT name, display_name, price, priority 
      FROM thedrinkers.vip_tier 
      ORDER BY priority
    `);

    if (vipResult.rows.length > 0) {
      console.log("🎯 VIP Tiers:");
      vipResult.rows.forEach((t) => {
        console.log(`   ${t.priority}. ${t.display_name}: €${t.price}/month`);
      });
    }

    client.release();
    await pool.end();

    console.log("\n✅ MIGRATION COMPLETE!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

createTablesWithPG();
