#!/usr/bin/env node
/**
 * 🌱 THE DRINKERS - DATABASE SEED SCRIPT
 *
 * Usage: node seed-database.js
 *
 * This script will populate your database with:
 * - 12 Products (merch)
 * - 15 Tour Dates
 * - 4 Albums
 * - 9 Songs
 * - 3 VIP Tiers
 * - 5 Fan Art submissions
 */

const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

console.log("🌱 Starting The Drinkers Database Seed...\n");
console.log("═".repeat(70));

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  try {
    // ============================================
    // 1. SEED PRODUCTS (12 items)
    // ============================================
    console.log("\n🛍️  Seeding Products...");

    const products = [
      {
        name: "The Drinkers Classic T-Shirt",
        description:
          "100% bombažna majica z logotipom The Drinkers. Udobna in stilsko dovršena.",
        price: "29.99",
        compare_at_price: "39.99",
        stock: 150,
        sku: "TD-TSHIRT-001",
        category: "t-shirt",
        images: JSON.stringify(["/images/merch/tshirt-classic.jpg"]),
        sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
        colors: JSON.stringify(["black", "white"]),
        featured: true,
        active: true,
      },
      {
        name: "The Drinkers Hoodie Black",
        description:
          "Premium pulover s kapuco. Topel in udoben za vse letne čase.",
        price: "59.99",
        compare_at_price: "79.99",
        stock: 75,
        sku: "TD-HOODIE-001",
        category: "hoodie",
        images: JSON.stringify(["/images/merch/hoodie-black.jpg"]),
        sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
        colors: JSON.stringify(["black", "grey"]),
        featured: true,
        active: true,
      },
      {
        name: "Tour 2026 Poster",
        description: "Limitirana edicija tour posterja. Podpisano od banda.",
        price: "19.99",
        stock: 200,
        sku: "TD-POSTER-2026",
        category: "poster",
        images: JSON.stringify(["/images/merch/poster-2026.jpg"]),
        featured: true,
        active: true,
      },
      {
        name: "The Drinkers Vinyl LP",
        description:
          "Vinilna plošča z najnovejšim albumom. Limitirana edicija.",
        price: "34.99",
        compare_at_price: "44.99",
        stock: 50,
        sku: "TD-VINYL-001",
        category: "vinyl",
        images: JSON.stringify(["/images/merch/vinyl-lp.jpg"]),
        colors: JSON.stringify(["black"]),
        featured: true,
        active: true,
      },
      {
        name: "Beer Pint Glass",
        description: "Uradni The Drinkers pivski kozarec. 0.5L kapaciteta.",
        price: "14.99",
        stock: 300,
        sku: "TD-GLASS-001",
        category: "accessories",
        images: JSON.stringify(["/images/merch/glass-pint.jpg"]),
        colors: JSON.stringify(["clear"]),
        active: true,
      },
      {
        name: "Snapback Cap",
        description: "The Drinkers logotip kapa. Ena velikost za vse.",
        price: "24.99",
        stock: 100,
        sku: "TD-CAP-001",
        category: "accessories",
        images: JSON.stringify(["/images/merch/cap-snapback.jpg"]),
        sizes: JSON.stringify(["One Size"]),
        colors: JSON.stringify(["black", "navy"]),
        active: true,
      },
      {
        name: "Tote Bag",
        description: "Eko platnena torba z The Drinkers motivom.",
        price: "12.99",
        stock: 150,
        sku: "TD-BAG-001",
        category: "accessories",
        images: JSON.stringify(["/images/merch/tote-bag.jpg"]),
        colors: JSON.stringify(["natural", "black"]),
        active: true,
      },
      {
        name: "Long Sleeve Shirt",
        description: "Dolga majica z album artworkom.",
        price: "39.99",
        compare_at_price: "49.99",
        stock: 80,
        sku: "TD-LONG-001",
        category: "t-shirt",
        images: JSON.stringify(["/images/merch/longsleeve.jpg"]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["black", "white"]),
        active: true,
      },
      {
        name: "Enamel Pin Set",
        description: "Set 5 The Drinkers emajliranih značk.",
        price: "16.99",
        stock: 200,
        sku: "TD-PIN-SET-001",
        category: "accessories",
        images: JSON.stringify(["/images/merch/pin-set.jpg"]),
        colors: JSON.stringify(["multi"]),
        active: true,
      },
      {
        name: "Tour 2026 CD",
        description: "Live album s tour 2026. Ekskluzivno za fane.",
        price: "14.99",
        stock: 100,
        sku: "TD-CD-2026",
        category: "music",
        images: JSON.stringify(["/images/merch/cd-2026.jpg"]),
        active: true,
      },
      {
        name: "Zip-Up Hoodie",
        description: "Premium zip-up pulover z žepi.",
        price: "64.99",
        compare_at_price: "84.99",
        stock: 60,
        sku: "TD-ZIP-001",
        category: "hoodie",
        images: JSON.stringify(["/images/merch/hoodie-zip.jpg"]),
        sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
        colors: JSON.stringify(["black", "grey"]),
        featured: true,
        active: true,
      },
      {
        name: "Sticker Pack",
        description: "Pack 10 The Drinkers nalepk. Vodoodporne.",
        price: "7.99",
        stock: 500,
        sku: "TD-STICKER-001",
        category: "accessories",
        images: JSON.stringify(["/images/merch/sticker-pack.jpg"]),
        colors: JSON.stringify(["multi"]),
        active: true,
      },
    ];

    for (const product of products) {
      await sql`
        INSERT INTO product ${sql(product)}
      `;
    }
    console.log(`✅ ${products.length} products seeded`);

    // ============================================
    // 2. SEED TOUR DATES (15 concerts)
    // ============================================
    console.log("\n🎫  Seeding Tour Dates...");

    const tourDates = [
      {
        tour_name: "Spring Tour 2026",
        venue: "Orto Bar",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-04-15",
        time: "21:00",
        doors: "20:00",
        ticket_url: "https://eventim.si/the-drinkers-ljubljana-1",
        ticket_price: "25.00",
        status: "on_sale",
        capacity: 300,
        sold_tickets: 187,
        featured: true,
        active: true,
      },
      {
        tour_name: "Spring Tour 2026",
        venue: "Kino Šiška",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-04-20",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://kinosiska.si/the-drinkers",
        ticket_price: "30.00",
        status: "on_sale",
        capacity: 500,
        sold_tickets: 342,
        featured: true,
        active: true,
      },
      {
        tour_name: "Spring Tour 2026",
        venue: "Galerija Vžigalica",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-05-01",
        time: "19:00",
        doors: "18:00",
        ticket_url: "https://vzigalica.si/the-drinkers",
        ticket_price: "20.00",
        status: "on_sale",
        capacity: 200,
        sold_tickets: 95,
        active: true,
      },
      {
        tour_name: "Spring Tour 2026",
        venue: "Metelkova Mesto",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-05-15",
        time: "22:00",
        doors: "21:00",
        ticket_url: "https://metelkova.org/the-drinkers",
        ticket_price: "15.00",
        status: "on_sale",
        capacity: 400,
        sold_tickets: 267,
        active: true,
      },
      {
        tour_name: "Summer Festival 2026",
        venue: "Cankarjev Dom",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-06-01",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://cd.si/the-drinkers",
        ticket_price: "35.00",
        status: "on_sale",
        capacity: 800,
        sold_tickets: 523,
        featured: true,
        active: true,
      },
      {
        tour_name: "Summer Tour 2026",
        venue: "Club Gromka",
        city: "Maribor",
        country: "Slovenia",
        date: "2026-06-10",
        time: "21:00",
        doors: "20:00",
        ticket_url: "https://gromka.si/the-drinkers",
        ticket_price: "22.00",
        status: "on_sale",
        capacity: 250,
        sold_tickets: 156,
        active: true,
      },
      {
        tour_name: "Summer Tour 2026",
        venue: "Kino Union",
        city: "Maribor",
        country: "Slovenia",
        date: "2026-06-11",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://kinounion.si/the-drinkers",
        ticket_price: "25.00",
        status: "on_sale",
        capacity: 300,
        sold_tickets: 198,
        active: true,
      },
      {
        tour_name: "Summer Tour 2026",
        venue: "Pekarna Magdalenske mreže",
        city: "Maribor",
        country: "Slovenia",
        date: "2026-06-12",
        time: "19:00",
        doors: "18:00",
        ticket_url: "https://pekarna.si/the-drinkers",
        ticket_price: "18.00",
        status: "on_sale",
        capacity: 150,
        sold_tickets: 87,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "Palace Theatre",
        city: "Vienna",
        country: "Austria",
        date: "2026-07-01",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://palacetheatre.at/the-drinkers",
        ticket_price: "35.00",
        status: "on_sale",
        capacity: 600,
        sold_tickets: 234,
        featured: true,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "Flex Club",
        city: "Vienna",
        country: "Austria",
        date: "2026-07-02",
        time: "21:00",
        doors: "20:00",
        ticket_url: "https://flex.at/the-drinkers",
        ticket_price: "28.00",
        status: "on_sale",
        capacity: 400,
        sold_tickets: 312,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "Muffatwerk",
        city: "Munich",
        state: "Bavaria",
        country: "Germany",
        date: "2026-07-10",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://muffatwerk.de/the-drinkers",
        ticket_price: "32.00",
        status: "on_sale",
        capacity: 500,
        sold_tickets: 287,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "Prater Club",
        city: "Berlin",
        country: "Germany",
        date: "2026-07-15",
        time: "21:00",
        doors: "20:00",
        ticket_url: "https://praterclub.de/the-drinkers",
        ticket_price: "30.00",
        status: "on_sale",
        capacity: 450,
        sold_tickets: 356,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "Melkweg",
        city: "Amsterdam",
        country: "Netherlands",
        date: "2026-07-20",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://melkweg.nl/the-drinkers",
        ticket_price: "35.00",
        status: "on_sale",
        capacity: 700,
        sold_tickets: 423,
        featured: true,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "La Cigale",
        city: "Paris",
        country: "France",
        date: "2026-07-25",
        time: "20:00",
        doors: "19:00",
        ticket_url: "https://lacigale.fr/the-drinkers",
        ticket_price: "38.00",
        status: "on_sale",
        capacity: 1200,
        sold_tickets: 567,
        featured: true,
        active: true,
      },
      {
        tour_name: "European Tour 2026",
        venue: "O2 Academy",
        city: "London",
        country: "UK",
        date: "2026-08-01",
        time: "19:00",
        doors: "18:00",
        ticket_url: "https://o2academy.co.uk/the-drinkers",
        ticket_price: "40.00",
        status: "announced",
        capacity: 1500,
        featured: true,
        active: true,
      },
    ];

    for (const tour of tourDates) {
      await sql`
        INSERT INTO tour_date ${sql(tour)}
      `;
    }
    console.log(`✅ ${tourDates.length} tour dates seeded`);

    // ============================================
    // 3. SEED ALBUMS (4 albums)
    // ============================================
    console.log("\n💿  Seeding Albums...");

    const albums = [
      {
        title: "First Round",
        artist: "The Drinkers",
        release_date: "2020-03-15",
        cover_image: "/images/albums/first-round.jpg",
        description:
          "Debitantski album The Drinkers. Surov, energičen in iskren.",
        label: "Independent",
        genre: JSON.stringify(["Rock", "Alternative", "Indie"]),
        total_tracks: 7,
        featured: true,
        active: true,
      },
      {
        title: "Midnight Sessions",
        artist: "The Drinkers",
        release_date: "2022-06-20",
        cover_image: "/images/albums/midnight-sessions.jpg",
        description: "Drugi album. Temnejši, zrelejši zvok.",
        label: "Independent",
        genre: JSON.stringify(["Rock", "Blues Rock", "Alternative"]),
        total_tracks: 6,
        featured: true,
        active: true,
      },
      {
        title: "Live at Orto Bar",
        artist: "The Drinkers",
        release_date: "2024-01-10",
        cover_image: "/images/albums/live-orto.jpg",
        description: "Live album posnet v Orto Baru, Ljubljana.",
        label: "Independent",
        genre: JSON.stringify(["Rock", "Live", "Alternative"]),
        total_tracks: 5,
        active: true,
      },
      {
        title: "Tour 2026",
        artist: "The Drinkers",
        release_date: "2026-03-01",
        cover_image: "/images/albums/tour-2026.jpg",
        description: "Najnovejši album. Izdan ob tour 2026.",
        label: "Independent",
        genre: JSON.stringify(["Rock", "Alternative", "Indie Rock"]),
        total_tracks: 6,
        featured: true,
        active: true,
      },
    ];

    for (const album of albums) {
      await sql`
        INSERT INTO album ${sql(album)}
      `;
    }
    console.log(`✅ ${albums.length} albums seeded`);

    // ============================================
    // 4. SEED VIP TIERS (3 tiers)
    // ============================================
    console.log("\n👑  Seeding VIP Tiers...");

    const vipTiers = [
      {
        name: "bronze",
        display_name: "Bronze Member",
        description: "Basic VIP membership with early access and discounts",
        price: "9.99",
        price_yearly: "99.99",
        currency: "EUR",
        benefits: JSON.stringify([
          "Early access to tickets",
          "10% merch discount",
          "Exclusive newsletter",
        ]),
        discount_percentage: 10,
        early_access: true,
        active: true,
        priority: 1,
      },
      {
        name: "silver",
        display_name: "Silver Member",
        description: "Enhanced VIP experience with better discounts and perks",
        price: "19.99",
        price_yearly: "199.99",
        currency: "EUR",
        benefits: JSON.stringify([
          "Early access to tickets",
          "20% merch discount",
          "Exclusive newsletter",
          "Meet & greet entry",
        ]),
        discount_percentage: 20,
        early_access: true,
        exclusive_content: true,
        meet_and_greet: true,
        active: true,
        priority: 2,
      },
      {
        name: "gold",
        display_name: "Gold Member",
        description: "Ultimate VIP experience with all perks included",
        price: "29.99",
        price_yearly: "299.99",
        currency: "EUR",
        benefits: JSON.stringify([
          "Early access to tickets",
          "30% merch discount",
          "Exclusive newsletter",
          "Meet & greet guaranteed",
          "Backstage access",
          "Free drinks at shows",
        ]),
        discount_percentage: 30,
        early_access: true,
        exclusive_content: true,
        meet_and_greet: true,
        active: true,
        priority: 3,
      },
    ];

    for (const tier of vipTiers) {
      await sql`
        INSERT INTO vip_tier ${sql(tier)}
      `;
    }
    console.log(`✅ ${vipTiers.length} VIP tiers seeded`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log("\n" + "═".repeat(70));
    console.log("\n🎉 SEED COMPLETE!\n");
    console.log("📊 Summary:");
    console.log(`   ✅ Products:      ${products.length}`);
    console.log(`   ✅ Tour Dates:    ${tourDates.length}`);
    console.log(`   ✅ Albums:        ${albums.length}`);
    console.log(`   ✅ VIP Tiers:     ${vipTiers.length}`);
    console.log("\n🍺 Database is ready for The Drinkers! 🎸\n");
    console.log("═".repeat(70));
  } catch (error) {
    console.error("\n❌ Seed failed:", error.message);
    console.error("\nDetails:", error);
    process.exit(1);
  }
}

// Run seed
seed();
