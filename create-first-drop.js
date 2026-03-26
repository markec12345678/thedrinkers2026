const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function createFirstDrop() {
  console.log("🚀 Creating First Limited Drop...\n");

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Step 1: Get an active product
    console.log("📦 Finding active product...");
    const products = await sql`
      SELECT id, name, price, stock 
      FROM product 
      WHERE active = true 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    if (products.length === 0) {
      console.log("❌ No active products found!");
      console.log("Please create a product first.");
      return;
    }

    const product = products[0];
    console.log(`✅ Found product: ${product.name} (€${product.price})\n`);

    // Step 2: Create drop
    console.log("🎯 Creating limited drop...");

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start tomorrow

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 2); // End 48 hours later

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
        'Exclusive limited edition t-shirt for The Drinkers Tour 2026. Features exclusive tour artwork on front and band logo on back. Only 100 available worldwide!',
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

    // Step 3: Display drop details
    console.log("═══════════════════════════════════════════════════");
    console.log("📊 DROP DETAILS:");
    console.log("═══════════════════════════════════════════════════");
    console.log(`Name: ${drop.name}`);
    console.log(`Product ID: ${drop.product_id}`);
    console.log(`Quantity: ${drop.quantity}`);
    console.log(`Price: €${drop.price} (was €${drop.original_price})`);
    console.log(
      `Savings: €${(parseFloat(drop.original_price) - parseFloat(drop.price)).toFixed(2)}`,
    );
    console.log(`Start Date: ${new Date(drop.start_date).toLocaleString()}`);
    console.log(`End Date: ${new Date(drop.end_date).toLocaleString()}`);
    console.log(
      `VIP Early Access: ${drop.vip_early_access ? "Yes (24 hours)" : "No"}`,
    );
    console.log(`Status: ${drop.is_active ? "Active" : "Inactive"}`);
    console.log("═══════════════════════════════════════════════════\n");

    // Step 4: Test API
    console.log("🧪 Testing API...");
    try {
      const response = await fetch("http://localhost:3000/api/drops/active");
      const data = await response.json();

      if (data.success) {
        console.log(`✅ API working! Found ${data.count} active drops\n`);
      } else {
        console.log("⚠️  API returned error:", data.error, "\n");
      }
    } catch (error) {
      console.log("⚠️  Could not test API (server may not be running)");
      console.log("Start server with: npm run dev\n");
    }

    // Step 5: Next steps
    console.log("═══════════════════════════════════════════════════");
    console.log("✅ FIRST DROP SETUP COMPLETE!");
    console.log("═══════════════════════════════════════════════════");
    console.log("\n📋 NEXT STEPS:");
    console.log("1. Start server: npm run dev");
    console.log("2. Visit: http://localhost:3000/drops");
    console.log("3. Test purchase flow");
    console.log("4. Test waitlist functionality");
    console.log("5. Add product images to /public/images/drops/");
    console.log("6. Prepare for launch!\n");
  } catch (error) {
    console.error("❌ Error creating drop:", error.message);
    process.exit(1);
  }
}

createFirstDrop();
