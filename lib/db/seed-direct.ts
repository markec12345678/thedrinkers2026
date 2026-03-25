// lib/db/seed-direct.ts
// 🎸 THE DRINKERS - SEED using direct SQL with neon
// Usage: npx tsx lib/db/seed-direct.ts

import { neon } from "@neondatabase/serverless";
require("dotenv").config();

const sql = neon(process.env.DATABASE_URL!);

console.log("🎸 Starting The Drinkers Database Seed (Direct SQL)...\n");

async function seed() {
  try {
    // 1. Seed Products
    console.log("🛍️  Seeding products...");
    await sql`
      INSERT INTO "product" ("name", "description", "price", "compare_at_price", "stock", "sku", "category", "images", "sizes", "colors", "featured", "active")
      VALUES 
        ('The Drinkers Classic T-Shirt', '100% bombažna majica z logotipom.', '29.99', '39.99', 150, 'TD-TSHIRT-001', 't-shirt', '["/images/merch/tshirt-front.jpg"]'::jsonb, '["S","M","L","XL","XXL"]'::jsonb, '["black","white"]'::jsonb, true, true),
        ('The Drinkers Hoodie Black', 'Premium pulover s kapuco.', '59.99', '79.99', 75, 'TD-HOODIE-001', 'hoodie', '["/images/merch/hoodie-front.jpg"]'::jsonb, '["S","M","L","XL","XXL"]'::jsonb, '["black","grey"]'::jsonb, true, true),
        ('Tour 2026 Poster', 'Limitirana edicija tour posterja.', '19.99', NULL, 200, 'TD-POSTER-2026', 'poster', '["/images/merch/poster-2026.jpg"]'::jsonb, NULL, NULL, true, true)
    `;
    console.log("✅ 3 products seeded\n");

    // 2. Seed Tour Dates
    console.log("🎫  Seeding tour dates...");
    await sql`
      INSERT INTO "tour_date" ("venue", "city", "country", "date", "time", "doors", "ticket_url", "ticket_price", "status", "capacity", "sold_tickets", "featured", "active")
      VALUES 
        ('Orto Bar', 'Ljubljana', 'Slovenia', '2026-04-15', '21:00', '20:00', 'https://eventim.si/the-drinkers-ljubljana', '25.00', 'on_sale', 300, 187, true, true),
        ('Kino Šiška', 'Ljubljana', 'Slovenia', '2026-04-20', '20:00', '19:00', 'https://kinosiska.si/the-drinkers', '30.00', 'on_sale', 500, 342, true, true),
        ('O2 Academy', 'London', 'UK', '2026-08-01', '19:00', '18:00', 'https://o2academy.co.uk/the-drinkers', '40.00', 'announced', 1500, 0, true, true)
    `;
    console.log("✅ 3 tour dates seeded\n");

    // 3. Seed Albums
    console.log("💿  Seeding albums...");
    await sql`
      INSERT INTO "album" ("title", "artist", "release_date", "cover_image", "description", "label", "genre", "total_tracks", "featured", "active")
      VALUES 
        ('First Round', 'The Drinkers', '2020-03-15', '/images/albums/first-round.jpg', 'Debitantski album The Drinkers.', 'Independent', '["Rock","Alternative"]'::jsonb, 7, true, true),
        ('Midnight Sessions', 'The Drinkers', '2022-06-20', '/images/albums/midnight-sessions.jpg', 'Drugi album. Temnejši zvok.', 'Independent', '["Rock","Blues Rock"]'::jsonb, 6, true, true),
        ('Tour 2026', 'The Drinkers', '2026-03-01', '/images/albums/tour-2026.jpg', 'Najnovejši album.', 'Independent', '["Rock","Alternative"]'::jsonb, 6, true, true)
    `;
    console.log("✅ 3 albums seeded\n");

    // 4. Seed VIP Tiers
    console.log("👑  Seeding VIP tiers...");
    await sql`
      INSERT INTO "vip_tier" ("name", "display_name", "price", "price_yearly", "benefits", "discount_percentage", "active")
      VALUES 
        ('bronze', 'Bronze Member', '9.99', '99.99', '["Early access","10% discount"]'::jsonb, 10, true),
        ('silver', 'Silver Member', '19.99', '199.99', '["Early access","20% discount","Meet & greet"]'::jsonb, 20, true),
        ('gold', 'Gold Member', '29.99', '299.99', '["All perks","30% discount","Backstage"]'::jsonb, 30, true)
    `;
    console.log("✅ 3 VIP tiers seeded\n");

    // 5. Seed Fan Art
    console.log("🎨  Seeding fan art...");
    await sql`
      INSERT INTO "fan_art" ("image_url", "thumbnail_url", "title", "description", "approved", "featured", "likes")
      VALUES 
        ('/images/fan-art/drawing-1.jpg', '/images/fan-art/thumbs/drawing-1.jpg', 'The Drinkers Live', 'Drawing from concert', true, true, 234),
        ('/images/fan-art/painting-1.jpg', '/images/fan-art/thumbs/painting-1.jpg', 'Band Portrait', 'Oil painting', true, true, 189)
    `;
    console.log("✅ 2 fan art pieces seeded\n");

    console.log("\n🎉 Seed completed successfully!");
    console.log("════════════════════════════════════════");
    console.log("Summary:");
    console.log("  - Products:     3");
    console.log("  - Tour Dates:   3");
    console.log("  - Albums:       3");
    console.log("  - VIP Tiers:    3");
    console.log("  - Fan Art:      2");
    console.log("════════════════════════════════════════\n");
    console.log("🍺 Your database is ready for The Drinkers! 🎸\n");
  } catch (error: any) {
    console.error("❌ Seed failed:", error.message);
    if (error.cause) {
      console.error("Cause:", error.cause.message);
    }
    process.exit(1);
  }
}

seed();
