#!/usr/bin/env node
/**
 * 🧪 SEED TEST DATA - Products, Tours, Albums
 */

require("dotenv").config();
const { Pool } = require("pg");

async function seedTestData() {
  console.log("🧪 Seeding TEST data...\n");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const client = await pool.connect();

  try {
    // Set search path to test
    await client.query("SET search_path TO test");

    // 1. Seed Products
    console.log("📦 Seeding products...");
    await client.query(`
      INSERT INTO product (name, description, price, compare_at_price, stock, sku, category, images, sizes, colors, featured, active) VALUES
      ('Test T-Shirt', 'Official test band t-shirt', '29.99', '39.99', 100, 'TEST-TSH-001', 'tshirt', '["https://via.placeholder.com/500"]', '["S", "M", "L", "XL"]', '["black", "white"]', true, true),
      ('Test Hoodie', 'Comfortable test hoodie', '59.99', '79.99', 50, 'TEST-HOOD-001', 'hoodie', '["https://via.placeholder.com/500"]', '["S", "M", "L", "XL", "XXL"]', '["black", "gray"]', true, true),
      ('Test Poster', 'Limited edition test poster', '19.99', NULL, 200, 'TEST-POST-001', 'poster', '["https://via.placeholder.com/500"]', NULL, NULL, false, true),
      ('Test Vinyl', 'Test album on vinyl', '34.99', NULL, 30, 'TEST-VINYL-001', 'vinyl', '["https://via.placeholder.com/500"]', NULL, NULL, true, true),
      ('Test Cap', 'Embroidered test cap', '24.99', '29.99', 75, 'TEST-CAP-001', 'cap', '["https://via.placeholder.com/500"]', '["one-size"]', '["black", "navy"]', false, true)
    `);
    const products = await client.query("SELECT COUNT(*) FROM product");
    console.log(`✅ Products: ${products.rows[0].count}\n`);

    // 2. Seed Tour Dates
    console.log("🎤 Seeding tour dates...");
    await client.query(`
      INSERT INTO tour_date (tour_name, venue, city, country, date, time, ticket_url, ticket_price, status, capacity, sold_tickets, featured, active) VALUES
      ('Test Tour 2026', 'Test Arena', 'Ljubljana', 'Slovenia', '2026-06-15', '20:00', 'https://tickets.example.com', '45.00', 'on_sale', 5000, 1250, true, true),
      ('Test Tour 2026', 'Test Hall', 'Maribor', 'Slovenia', '2026-06-20', '20:00', 'https://tickets.example.com', '40.00', 'on_sale', 3000, 800, true, true),
      ('Test Tour 2026', 'Test Club', 'Koper', 'Slovenia', '2026-06-25', '21:00', 'https://tickets.example.com', '35.00', 'on_sale', 1000, 450, false, true),
      ('Test Tour 2026', 'Test Stadium', 'Vienna', 'Austria', '2026-07-01', '19:00', 'https://tickets.example.com', '55.00', 'announced', 10000, 0, true, true),
      ('Test Tour 2026', 'Test Arena', 'Zagreb', 'Croatia', '2026-07-05', '20:00', 'https://tickets.example.com', '50.00', 'announced', 8000, 0, true, true)
      ON CONFLICT DO NOTHING
    `);
    const tours = await client.query("SELECT COUNT(*) FROM tour_date");
    console.log(`✅ Tour dates: ${tours.rows[0].count}\n`);

    // 3. Seed Albums
    console.log("💿 Seeding albums...");
    await client.query(`
      INSERT INTO album (title, release_date, cover_image, description, label, genre, total_tracks, featured, active) VALUES
      ('Test Album Vol. 1', '2025-01-15', 'https://via.placeholder.com/500', 'First test album', 'Test Records', '["rock", "alternative"]', 12, true, true),
      ('Test Album Vol. 2', '2025-06-20', 'https://via.placeholder.com/500', 'Second test album', 'Test Records', '["rock", "indie"]', 10, true, true),
      ('Test EP', '2025-11-01', 'https://via.placeholder.com/500', 'Test EP release', 'Independent', '["alternative", "indie"]', 5, false, true)
      ON CONFLICT DO NOTHING
    `);
    const albums = await client.query("SELECT COUNT(*) FROM album");
    console.log(`✅ Albums: ${albums.rows[0].count}\n`);

    // 4. Seed Songs
    console.log("🎵 Seeding songs...");
    const albumResult = await client.query(
      "SELECT id FROM album WHERE title = $1",
      ["Test Album Vol. 1"],
    );
    if (albumResult.rows.length > 0) {
      const albumId = albumResult.rows[0].id;
      await client.query(
        `
        INSERT INTO song (album_id, title, duration, lyrics, track_number, featured, active) VALUES
        ($1, 'Test Song One', 245, 'Test lyrics here...', 1, true, true),
        ($1, 'Test Song Two', 198, 'More test lyrics...', 2, false, true),
        ($1, 'Test Song Three', 312, 'Even more lyrics...', 3, false, true),
        ($1, 'Test Ballad', 287, 'Beautiful ballad lyrics...', 4, true, true),
        ($1, 'Test Rock Anthem', 223, 'Rock on!', 5, true, true)
        ON CONFLICT DO NOTHING
      `,
        [albumId],
      );
    }
    const songs = await client.query("SELECT COUNT(*) FROM song");
    console.log(`✅ Songs: ${songs.rows[0].count}\n`);

    // 5. Create Test User
    console.log("👤 Creating test user...");
    await client.query(`
      INSERT INTO "user" (name, email, email_verified, membership_tier, display_name) VALUES
      ('Test User', 'test@test.com', true, 'free', 'Testy')
      ON CONFLICT (email) DO NOTHING
    `);
    const users = await client.query('SELECT COUNT(*) FROM "user"');
    console.log(`✅ Users: ${users.rows[0].count}\n`);

    // Summary
    console.log("═".repeat(60));
    console.log("🧪 TEST DATA SEEDED!");
    console.log("═".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`   👤 Users: ${users.rows[0].count}`);
    console.log(`   📦 Products: ${products.rows[0].count}`);
    console.log(`   🎤 Tour Dates: ${tours.rows[0].count}`);
    console.log(`   💿 Albums: ${albums.rows[0].count}`);
    console.log(`   🎵 Songs: ${songs.rows[0].count}`);
    console.log(`   👑 VIP Tiers: 4`);
    console.log("\n✅ Test database ready!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedTestData();
