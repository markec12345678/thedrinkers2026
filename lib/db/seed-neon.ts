// lib/db/seed-neon.ts
// 🎸 THE DRINKERS - SEED using Neon REST API
// Usage: npx tsx lib/db/seed-neon.ts

import axios from "axios";
require("dotenv").config();

const NEON_API_URL =
  "https://ep-fragrant-hill-amwub3uk.apirest.c-5.us-east-1.aws.neon.tech/neondb/rest/v1";
const API_KEY = process.env.NEON_API_KEY!;

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

console.log("🎸 Starting The Drinkers Database Seed (Neon REST API)...\n");

async function seed() {
  try {
    // 1. Seed Products
    console.log("🛍️  Seeding products...");
    const products = [
      {
        name: "The Drinkers Classic T-Shirt",
        description: "100% bombažna majica z logotipom The Drinkers.",
        price: "29.99",
        compare_at_price: "39.99",
        stock: 150,
        sku: "TD-TSHIRT-001",
        category: "t-shirt",
        images: ["/images/merch/tshirt-front.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["black", "white"],
        featured: true,
        active: true,
      },
      {
        name: "The Drinkers Hoodie Black",
        description: "Premium pulover s kapuco.",
        price: "59.99",
        compare_at_price: "79.99",
        stock: 75,
        sku: "TD-HOODIE-001",
        category: "hoodie",
        images: ["/images/merch/hoodie-front.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["black", "grey"],
        featured: true,
        active: true,
      },
      {
        name: "Tour 2026 Poster",
        description: "Limitirana edicija tour posterja.",
        price: "19.99",
        stock: 200,
        sku: "TD-POSTER-2026",
        category: "poster",
        images: ["/images/merch/poster-2026.jpg"],
        featured: true,
        active: true,
      },
    ];

    const productResponse = await axios.post(
      `${NEON_API_URL}/product`,
      products,
      { headers },
    );
    console.log(
      `✅ ${productResponse.data?.length || products.length} products seeded\n`,
    );

    // 2. Seed Tour Dates
    console.log("🎫  Seeding tour dates...");
    const tourDates = [
      {
        venue: "Orto Bar",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-04-15",
        time: "21:00",
        doors: "20:00",
        ticket_url: "https://eventim.si/the-drinkers-ljubljana",
        ticket_price: "25.00",
        status: "on_sale",
        capacity: 300,
        sold_tickets: 187,
        featured: true,
        active: true,
      },
      {
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

    const tourResponse = await axios.post(
      `${NEON_API_URL}/tour_date`,
      tourDates,
      { headers },
    );
    console.log(
      `✅ ${tourResponse.data?.length || tourDates.length} tour dates seeded\n`,
    );

    // 3. Seed Albums
    console.log("💿  Seeding albums...");
    const albums = [
      {
        title: "First Round",
        artist: "The Drinkers",
        release_date: "2020-03-15",
        cover_image: "/images/albums/first-round.jpg",
        description: "Debitantski album The Drinkers.",
        label: "Independent",
        genre: ["Rock", "Alternative"],
        total_tracks: 7,
        featured: true,
        active: true,
      },
      {
        title: "Midnight Sessions",
        artist: "The Drinkers",
        release_date: "2022-06-20",
        cover_image: "/images/albums/midnight-sessions.jpg",
        description: "Drugi album. Temnejši zvok.",
        label: "Independent",
        genre: ["Rock", "Blues Rock"],
        total_tracks: 6,
        featured: true,
        active: true,
      },
      {
        title: "Tour 2026",
        artist: "The Drinkers",
        release_date: "2026-03-01",
        cover_image: "/images/albums/tour-2026.jpg",
        description: "Najnovejši album.",
        label: "Independent",
        genre: ["Rock", "Alternative"],
        total_tracks: 6,
        featured: true,
        active: true,
      },
    ];

    const albumResponse = await axios.post(`${NEON_API_URL}/album`, albums, {
      headers,
    });
    console.log(
      `✅ ${albumResponse.data?.length || albums.length} albums seeded\n`,
    );

    // 4. Seed VIP Tiers
    console.log("👑  Seeding VIP tiers...");
    const vipTiers = [
      {
        name: "bronze",
        display_name: "Bronze Member",
        price: "9.99",
        price_yearly: "99.99",
        benefits: ["Early access", "10% discount"],
        discount_percentage: 10,
        active: true,
      },
      {
        name: "silver",
        display_name: "Silver Member",
        price: "19.99",
        price_yearly: "199.99",
        benefits: ["Early access", "20% discount", "Meet & greet"],
        discount_percentage: 20,
        active: true,
      },
      {
        name: "gold",
        display_name: "Gold Member",
        price: "29.99",
        price_yearly: "299.99",
        benefits: ["All perks", "30% discount", "Backstage"],
        discount_percentage: 30,
        active: true,
      },
    ];

    const vipResponse = await axios.post(`${NEON_API_URL}/vip_tier`, vipTiers, {
      headers,
    });
    console.log(
      `✅ ${vipResponse.data?.length || vipTiers.length} VIP tiers seeded\n`,
    );

    // 5. Seed Fan Art
    console.log("🎨  Seeding fan art...");
    const fanArt = [
      {
        image_url: "/images/fan-art/drawing-1.jpg",
        thumbnail_url: "/images/fan-art/thumbs/drawing-1.jpg",
        title: "The Drinkers Live",
        description: "Drawing from concert",
        approved: true,
        featured: true,
        likes: 234,
      },
      {
        image_url: "/images/fan-art/painting-1.jpg",
        thumbnail_url: "/images/fan-art/thumbs/painting-1.jpg",
        title: "Band Portrait",
        description: "Oil painting",
        approved: true,
        featured: true,
        likes: 189,
      },
    ];

    const fanArtResponse = await axios.post(`${NEON_API_URL}/fan_art`, fanArt, {
      headers,
    });
    console.log(
      `✅ ${fanArtResponse.data?.length || fanArt.length} fan art pieces seeded\n`,
    );

    console.log("\n🎉 Seed completed successfully!");
    console.log("════════════════════════════════════════");
    console.log("Summary:");
    console.log(`  - Products:     ${products.length}`);
    console.log(`  - Tour Dates:   ${tourDates.length}`);
    console.log(`  - Albums:       ${albums.length}`);
    console.log(`  - VIP Tiers:    ${vipTiers.length}`);
    console.log(`  - Fan Art:      ${fanArt.length}`);
    console.log("════════════════════════════════════════\n");
    console.log("🍺 Your database is ready for The Drinkers! 🎸\n");
  } catch (error: any) {
    console.error("❌ Seed failed:", error.response?.data || error.message);
    process.exit(1);
  }
}

seed();
