const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function fullSeed() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🎸 THE DRINKERS - FULL DATABASE SEED\n");
  console.log("═".repeat(70));

  try {
    // Clear existing data
    console.log("\n🗑️  Clearing existing data...");
    await sql`DELETE FROM fan_art`;
    await sql`DELETE FROM song`;
    await sql`DELETE FROM album`;
    await sql`DELETE FROM tour_date`;
    await sql`DELETE FROM order_item`;
    await sql`DELETE FROM "order"`;
    await sql`DELETE FROM product`;
    await sql`DELETE FROM vip_tier`;
    console.log("✅ Tables cleared\n");

    // ============================================
    // 1. PRODUCTS (12 items)
    // ============================================
    console.log("🛍️  Seeding 12 products...");
    await sql`
      INSERT INTO product (name, description, price, compare_at_price, stock, sku, category, images, sizes, colors, featured, active)
      VALUES 
        ('The Drinkers Classic T-Shirt', '100% bombažna majica z logotipom.', 29.99, 39.99, 150, 'TD-TSHIRT-001', 't-shirt', '["/images/merch/tshirt-classic.jpg"]'::jsonb, '["S", "M", "L", "XL", "XXL"]'::jsonb, '["black", "white"]'::jsonb, true, true),
        ('The Drinkers Hoodie Black', 'Premium pulover s kapuco.', 59.99, 79.99, 75, 'TD-HOODIE-001', 'hoodie', '["/images/merch/hoodie-black.jpg"]'::jsonb, '["S", "M", "L", "XL", "XXL"]'::jsonb, '["black", "grey"]'::jsonb, true, true),
        ('Tour 2026 Poster', 'Limitirana edicija tour posterja.', 19.99, NULL, 200, 'TD-POSTER-2026', 'poster', '["/images/merch/poster-2026.jpg"]'::jsonb, NULL, NULL, true, true),
        ('The Drinkers Vinyl LP', 'Vinilna plošča z najboljšimi hiti.', 34.99, 44.99, 50, 'TD-VINYL-001', 'vinyl', '["/images/merch/vinyl-lp.jpg"]'::jsonb, NULL, '["black"]'::jsonb, true, true),
        ('Beer Pint Glass', 'Uradni The Drinkers pivski kozarec.', 14.99, NULL, 300, 'TD-GLASS-001', 'accessories', '["/images/merch/glass-pint.jpg"]'::jsonb, NULL, '["clear"]'::jsonb, false, true),
        ('Snapback Cap', 'The Drinkers logotip kapa.', 24.99, NULL, 100, 'TD-CAP-001', 'accessories', '["/images/merch/cap-snapback.jpg"]'::jsonb, '["One Size"]'::jsonb, '["black", "navy"]'::jsonb, false, true),
        ('Tote Bag', 'Eko platnena torba z motivom.', 12.99, NULL, 150, 'TD-BAG-001', 'accessories', '["/images/merch/tote-bag.jpg"]'::jsonb, NULL, '["natural", "black"]'::jsonb, false, true),
        ('Long Sleeve Shirt', 'Dolga majica z album artworkom.', 39.99, 49.99, 80, 'TD-LONG-001', 't-shirt', '["/images/merch/longsleeve.jpg"]'::jsonb, '["S", "M", "L", "XL"]'::jsonb, '["black", "white"]'::jsonb, false, true),
        ('Enamel Pin Set', 'Set 5 The Drinkers emajliranih značk.', 16.99, NULL, 200, 'TD-PIN-SET-001', 'accessories', '["/images/merch/pin-set.jpg"]'::jsonb, NULL, '["multi"]'::jsonb, false, true),
        ('Tour 2026 CD', 'Live album s tour 2026.', 14.99, NULL, 100, 'TD-CD-2026', 'music', '["/images/merch/cd-2026.jpg"]'::jsonb, NULL, NULL, false, true),
        ('Zip-Up Hoodie', 'Premium zip-up pulover z žepi.', 64.99, 84.99, 60, 'TD-ZIP-001', 'hoodie', '["/images/merch/hoodie-zip.jpg"]'::jsonb, '["S", "M", "L", "XL", "XXL"]'::jsonb, '["black", "grey"]'::jsonb, true, true),
        ('Sticker Pack', 'Pack 10 The Drinkers nalepk.', 7.99, NULL, 500, 'TD-STICKER-001', 'accessories', '["/images/merch/sticker-pack.jpg"]'::jsonb, NULL, '["multi"]'::jsonb, false, true)
    `;
    console.log("✅ 12 products seeded\n");

    // ============================================
    // 2. TOUR DATES (15 concerts)
    // ============================================
    console.log("🎫  Seeding 15 tour dates...");
    await sql`
      INSERT INTO tour_date (tour_name, venue, city, country, date, time, ticket_url, ticket_price, status, capacity, sold_tickets, featured, active)
      VALUES 
        ('Spring Tour 2026', 'Orto Bar', 'Ljubljana', 'Slovenia', '2026-04-15', '21:00', 'https://eventim.si/the-drinkers-ljubljana-1', 25.00, 'on_sale', 300, 187, true, true),
        ('Spring Tour 2026', 'Kino Šiška', 'Ljubljana', 'Slovenia', '2026-04-20', '20:00', 'https://kinosiska.si/the-drinkers', 30.00, 'on_sale', 500, 342, true, true),
        ('Spring Tour 2026', 'Galerija Vžigalica', 'Ljubljana', 'Slovenia', '2026-05-01', '19:00', 'https://vzigalica.si/the-drinkers', 20.00, 'on_sale', 200, 95, false, true),
        ('Spring Tour 2026', 'Metelkova Mesto', 'Ljubljana', 'Slovenia', '2026-05-15', '22:00', 'https://metelkova.org/the-drinkers', 15.00, 'on_sale', 400, 267, false, true),
        ('Summer Festival 2026', 'Cankarjev Dom', 'Ljubljana', 'Slovenia', '2026-06-01', '20:00', 'https://cd.si/the-drinkers', 35.00, 'on_sale', 800, 523, true, true),
        ('Summer Tour 2026', 'Club Gromka', 'Maribor', 'Slovenia', '2026-06-10', '21:00', 'https://gromka.si/the-drinkers', 22.00, 'on_sale', 250, 156, false, true),
        ('Summer Tour 2026', 'Kino Union', 'Maribor', 'Slovenia', '2026-06-11', '20:00', 'https://kinounion.si/the-drinkers', 25.00, 'on_sale', 300, 198, false, true),
        ('Summer Tour 2026', 'Pekarna', 'Maribor', 'Slovenia', '2026-06-12', '19:00', 'https://pekarna.si/the-drinkers', 18.00, 'on_sale', 150, 87, false, true),
        ('European Tour 2026', 'Palace Theatre', 'Vienna', 'Austria', '2026-07-01', '20:00', 'https://palacetheatre.at/the-drinkers', 35.00, 'on_sale', 600, 234, true, true),
        ('European Tour 2026', 'Flex Club', 'Vienna', 'Austria', '2026-07-02', '21:00', 'https://flex.at/the-drinkers', 28.00, 'on_sale', 400, 312, false, true),
        ('European Tour 2026', 'Muffatwerk', 'Munich', 'Germany', '2026-07-10', '20:00', 'https://muffatwerk.de/the-drinkers', 32.00, 'on_sale', 500, 287, false, true),
        ('European Tour 2026', 'Prater Club', 'Berlin', 'Germany', '2026-07-15', '21:00', 'https://praterclub.de/the-drinkers', 30.00, 'on_sale', 450, 356, false, true),
        ('European Tour 2026', 'Melkweg', 'Amsterdam', 'Netherlands', '2026-07-20', '20:00', 'https://melkweg.nl/the-drinkers', 35.00, 'on_sale', 700, 423, true, true),
        ('European Tour 2026', 'La Cigale', 'Paris', 'France', '2026-07-25', '20:00', 'https://lacigale.fr/the-drinkers', 38.00, 'on_sale', 1200, 567, true, true),
        ('European Tour 2026', 'O2 Academy', 'London', 'UK', '2026-08-01', '19:00', 'https://o2academy.co.uk/the-drinkers', 40.00, 'announced', 1500, 0, true, true)
    `;
    console.log("✅ 15 tour dates seeded\n");

    // ============================================
    // 3. ALBUMS (4 albums)
    // ============================================
    console.log("💿  Seeding 4 albums...");
    await sql`
      INSERT INTO album (title, release_date, cover_image, description, label, genre, total_tracks, featured, active)
      VALUES 
        ('First Round', '2020-03-15', '/images/albums/first-round.jpg', 'Debitantski album The Drinkers.', 'Independent', '["Rock", "Alternative"]'::jsonb, 7, true, true),
        ('Midnight Sessions', '2022-06-20', '/images/albums/midnight-sessions.jpg', 'Drugi album. Temnejši zvok.', 'Independent', '["Rock", "Blues Rock"]'::jsonb, 6, true, true),
        ('Live at Orto Bar', '2024-01-10', '/images/albums/live-orto.jpg', 'Live album posnet v Orto Baru.', 'Independent', '["Rock", "Live"]'::jsonb, 5, false, true),
        ('Tour 2026', '2026-03-01', '/images/albums/tour-2026.jpg', 'Najnovejši album.', 'Independent', '["Rock", "Alternative"]'::jsonb, 6, true, true)
    `;
    console.log("✅ 4 albums seeded\n");

    // ============================================
    // 4. SONGS (9 songs)
    // ============================================
    console.log("🎵  Seeding 9 songs...");
    // Get album IDs first
    const albums = await sql`SELECT id, title FROM album ORDER BY release_date`;
    const albumMap = {};
    albums.forEach((a) => {
      if (a.title.includes("First Round")) albumMap["first"] = a.id;
      if (a.title.includes("Midnight")) albumMap["midnight"] = a.id;
      if (a.title.includes("Tour 2026")) albumMap["tour"] = a.id;
    });

    await sql`
      INSERT INTO song (album_id, title, duration, track_number, featured, active)
      VALUES 
        (${albumMap["first"]}, 'Opening Shot', 245, 1, true, true),
        (${albumMap["first"]}, 'Last Call', 198, 2, true, true),
        (${albumMap["first"]}, 'Bottoms Up', 223, 3, false, true),
        (${albumMap["midnight"]}, 'Midnight Train', 278, 1, true, true),
        (${albumMap["midnight"]}, 'Neon Lights', 234, 2, true, true),
        (${albumMap["midnight"]}, 'Empty Glass', 256, 3, false, true),
        (${albumMap["tour"]}, 'New Beginnings', 234, 1, true, true),
        (${albumMap["tour"]}, 'Road Trip', 256, 2, false, true),
        (${albumMap["tour"]}, 'Stage Lights', 289, 3, true, true)
    `;
    console.log("✅ 9 songs seeded\n");

    // ============================================
    // 5. VIP TIERS (3 tiers)
    // ============================================
    console.log("👑  Seeding 3 VIP tiers...");
    await sql`
      INSERT INTO vip_tier (name, display_name, description, price, price_yearly, currency, benefits, discount_percentage, early_access, exclusive_content, meet_and_greet, active, priority)
      VALUES 
        ('basic', 'Basic Member', 'Entry-level VIP membership', 9.99, 99.99, 'EUR', '["Early access to tickets", "10% merch discount", "Exclusive newsletter"]'::jsonb, 10, true, false, false, true, 1),
        ('premium', 'Premium Member', 'Enhanced VIP experience', 19.99, 199.99, 'EUR', '["Early access to tickets", "20% merch discount", "Exclusive newsletter", "Meet & greet entry", "Signed poster"]'::jsonb, 20, true, true, true, true, 2),
        ('vip', 'VIP Elite', 'Ultimate VIP experience', 29.99, 299.99, 'EUR', '["Early access to tickets", "30% merch discount", "Exclusive newsletter", "Meet & greet guaranteed", "Signed poster", "Backstage access", "Free drinks at shows"]'::jsonb, 30, true, true, true, true, 3)
    `;
    console.log("✅ 3 VIP tiers seeded\n");

    // ============================================
    // VERIFICATION
    // ============================================
    console.log("🔍 Verifying seed...\n");
    const verification = await sql`
      SELECT 'product' as table_name, COUNT(*) as count FROM product
      UNION ALL SELECT 'tour_date', COUNT(*) FROM tour_date
      UNION ALL SELECT 'album', COUNT(*) FROM album
      UNION ALL SELECT 'song', COUNT(*) FROM song
      UNION ALL SELECT 'vip_tier', COUNT(*) FROM vip_tier
      ORDER BY table_name
    `;

    console.log("📊 Seed Results:");
    console.log("─".repeat(70));
    verification.forEach((row) => {
      console.log(
        `  ${row.table_name.padEnd(15)} ${row.count.toString().padStart(3)} rows`,
      );
    });

    const expectedTotal = 12 + 15 + 4 + 9 + 3;
    const actualTotal = verification.reduce(
      (sum, row) => sum + parseInt(row.count),
      0,
    );

    console.log("\n" + "═".repeat(70));
    if (actualTotal === expectedTotal) {
      console.log(`✅ FULL SEED COMPLETE! ${expectedTotal} rows inserted`);
      console.log("\n🍺 Database is FULLY ready for The Drinkers! 🎸");
    } else {
      console.log(`⚠️  Expected ${expectedTotal} rows, got ${actualTotal}`);
    }
    console.log("═".repeat(70));
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    if (err.cause) {
      console.error("Cause:", err.cause.message);
    }
    process.exit(1);
  }
}

fullSeed();
