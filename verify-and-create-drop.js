const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function verifyAndCreate() {
  console.log("🔍 Verifying Database Tables...\n");

  const sql = neon(process.env.DATABASE_URL);

  // Check all e-commerce tables
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND (
      table_name LIKE '%drop%' OR 
      table_name LIKE '%bundle%'
    )
    ORDER BY table_name
  `;

  console.log("E-commerce Tables:");
  tables.forEach((t) => console.log(`  ✅ ${t.table_name}`));
  console.log(`\nTotal: ${tables.length} tables\n`);

  if (tables.length === 0) {
    console.log("⚠️  Tables not found. Running migrations...\n");
    console.log("Please run: node run-all-migrations.js\n");
    return;
  }

  // Check if we have products
  console.log("📦 Checking products...\n");

  const products = await sql`
    SELECT id, name, price, stock, active
    FROM product
    WHERE active = true
    LIMIT 5
  `;

  console.log("Active Products:");
  products.forEach((p) =>
    console.log(`  ✅ ${p.name} (€${p.price}, Stock: ${p.stock})`),
  );
  console.log(`\nTotal: ${products.length} products\n`);

  if (products.length === 0) {
    console.log("❌ No active products found!");
    console.log("Please create a product first.\n");
    return;
  }

  // Create first drop
  console.log("🎯 Creating First Drop...\n");

  const product = products[0];

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1); // Start tomorrow

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 2); // End 48 hours later

  try {
    const [drop] = await sql`
      INSERT INTO limited_drop (
        name,
        description,
        product_id,
        quantity,
        quantity_remaining,
        price,
        original_price,
        start_date,
        end_date,
        vip_early_access,
        vip_early_access_hours,
        is_active,
        is_sold_out
      ) VALUES (
        'Tour 2026 Limited T-Shirt',
        'Exclusive limited edition t-shirt for The Drinkers Tour 2026. Only 100 available worldwide!',
        ${product.id},
        100,
        100,
        '25.00',
        '35.00',
        ${startDate.toISOString()},
        ${endDate.toISOString()},
        true,
        24,
        true,
        false
      )
      RETURNING *
    `;

    console.log("✅ Drop created successfully!\n");

    console.log("═══════════════════════════════════════════════════");
    console.log("📊 DROP DETAILS:");
    console.log("═══════════════════════════════════════════════════");
    console.log(`Name: ${drop.name}`);
    console.log(`Quantity: ${drop.quantity}`);
    console.log(`Price: €${drop.price} (was €${drop.original_price})`);
    console.log(`Start: ${new Date(drop.start_date).toLocaleString()}`);
    console.log(`End: ${new Date(drop.end_date).toLocaleString()}`);
    console.log(`VIP Early Access: Yes (24 hours)`);
    console.log("═══════════════════════════════════════════════════\n");

    console.log("🎉 FIRST DROP READY FOR LAUNCH! 🎉\n");
    console.log("📋 NEXT STEPS:");
    console.log("1. Start server: npm run dev");
    console.log("2. Visit: http://localhost:3000/drops");
    console.log("3. Test the purchase flow");
    console.log("4. Prepare for launch!\n");
  } catch (error) {
    console.error("❌ Error creating drop:", error.message);
  }
}

verifyAndCreate();
