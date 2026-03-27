#!/usr/bin/env node

/**
 * 🚀 CREATE FIRST DROP
 * Creates the first limited edition drop
 *
 * Usage: node create-first-drop-now.js
 */

const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀  CREATE FIRST DROP  🚀                              ║
║                                                           ║
║   Creating your first limited edition drop              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

async function createFirstDrop() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log("📊 Getting active product...\n");

    // Get first active product
    const products = await sql`
      SELECT id, name, price 
      FROM product 
      WHERE active = true 
      LIMIT 1
    `;

    if (products.length === 0) {
      console.log("❌ No active products found!");
      process.exit(1);
    }

    const product = products[0];
    console.log(`✅ Using: ${product.name} (€${product.price})\n`);

    console.log("🎯 Creating drop...\n");

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 2); // 48 hours

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

    console.log("✅ Drop created!\n");

    console.log(
      "╔═══════════════════════════════════════════════════════════╗",
    );
    console.log("║📊 DROP DETAILS:                                          ║");
    console.log(
      "╚═══════════════════════════════════════════════════════════╝\n",
    );
    console.log(`Name: ${drop.name}`);
    console.log(`Quantity: ${drop.quantity} shirts`);
    console.log(`Price: €${drop.price} (was €${drop.original_price})`);
    console.log(
      `You Save: €${(parseFloat(drop.original_price) - parseFloat(drop.price)).toFixed(2)}`,
    );
    console.log(`Start: ${new Date(drop.start_date).toLocaleString()}`);
    console.log(`End: ${new Date(drop.end_date).toLocaleString()}`);
    console.log(`VIP Early Access: Yes (24 hours)`);
    console.log(
      `\nPotential Revenue: €${(drop.quantity * parseFloat(drop.price)).toFixed(2)}`,
    );
    console.log(
      `Potential Profit: ~€${(drop.quantity * (parseFloat(drop.price) - 10)).toFixed(2)} (60% margin)`,
    );

    console.log(
      "\n╔═══════════════════════════════════════════════════════════╗",
    );
    console.log("║🎉 FIRST DROP READY!                                      ║");
    console.log(
      "╚═══════════════════════════════════════════════════════════╝\n",
    );

    console.log("📋 NEXT STEPS:\n");
    console.log("1. Visit: http://localhost:3001/drops");
    console.log("2. Test the drop page");
    console.log("3. Test purchase flow");
    console.log("4. Launch! 🚀\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createFirstDrop();
