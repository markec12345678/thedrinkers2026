// lib/db/seed.ts
// 🎸 THE DRINKERS - COMPLETE DATABASE SEED DATA
// Usage: npm run db:seed

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { config } from "dotenv";

config();

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

console.log("🎸 Starting The Drinkers Database Seed...\n");

async function seed() {
  console.log("🌱 Starting seed...\n");

  try {
    // 1. Seed Products
    console.log("🛍️  Seeding products...");
    await db.insert(schema.product).values([
      {
        name: "The Drinkers Classic T-Shirt",
        description: "100% bombažna majica z logotipom The Drinkers.",
        price: "29.99",
        compareAtPrice: "39.99",
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
        compareAtPrice: "79.99",
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
    ]);
    console.log(`✅ 3 products seeded\n`);

    // 2. Seed Tour Dates
    console.log("🎫  Seeding tour dates...");
    await db.insert(schema.tourDate).values([
      {
        venue: "Orto Bar",
        city: "Ljubljana",
        country: "Slovenia",
        date: "2026-04-15",
        time: "21:00",
        doors: "20:00",
        ticketUrl: "https://eventim.si/the-drinkers-ljubljana",
        ticketPrice: "25.00",
        status: "on_sale",
        capacity: 300,
        soldTickets: 187,
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
        ticketUrl: "https://kinosiska.si/the-drinkers",
        ticketPrice: "30.00",
        status: "on_sale",
        capacity: 500,
        soldTickets: 342,
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
        ticketUrl: "https://o2academy.co.uk/the-drinkers",
        ticketPrice: "40.00",
        status: "announced",
        capacity: 1500,
        featured: true,
        active: true,
      },
    ]);
    console.log(`✅ 3 tour dates seeded\n`);

    // 3. Seed Albums
    console.log("💿  Seeding albums...");
    const insertedAlbums = await db
      .insert(schema.album)
      .values([
        {
          title: "First Round",
          artist: "The Drinkers",
          releaseDate: "2020-03-15",
          coverImage: "/images/albums/first-round.jpg",
          description: "Debitantski album The Drinkers.",
          label: "Independent",
          genre: ["Rock", "Alternative"],
          totalTracks: 7,
          featured: true,
          active: true,
        },
        {
          title: "Midnight Sessions",
          artist: "The Drinkers",
          releaseDate: "2022-06-20",
          coverImage: "/images/albums/midnight-sessions.jpg",
          description: "Drugi album. Temnejši zvok.",
          label: "Independent",
          genre: ["Rock", "Blues Rock"],
          totalTracks: 6,
          featured: true,
          active: true,
        },
        {
          title: "Tour 2026",
          artist: "The Drinkers",
          releaseDate: "2026-03-01",
          coverImage: "/images/albums/tour-2026.jpg",
          description: "Najnovejši album.",
          label: "Independent",
          genre: ["Rock", "Alternative"],
          totalTracks: 6,
          featured: true,
          active: true,
        },
      ])
      .returning();
    console.log(`✅ 3 albums seeded\n`);

    // 4. Seed Songs
    console.log("🎵  Seeding songs...");
    await db.insert(schema.song).values([
      {
        albumId: insertedAlbums[0]?.id,
        title: "Opening Shot",
        duration: 245,
        trackNumber: 1,
        featured: true,
        active: true,
      },
      {
        albumId: insertedAlbums[0]?.id,
        title: "Last Call",
        duration: 198,
        trackNumber: 2,
        featured: true,
        active: true,
      },
      {
        albumId: insertedAlbums[1]?.id,
        title: "Midnight Train",
        duration: 278,
        trackNumber: 1,
        featured: true,
        active: true,
      },
    ]);
    console.log(`✅ 3 songs seeded\n`);

    // 5. Seed VIP Tiers
    console.log("👑  Seeding VIP tiers...");
    await db.insert(schema.vipTier).values([
      {
        name: "bronze",
        displayName: "Bronze Member",
        price: "9.99",
        priceYearly: "99.99",
        benefits: ["Early access", "10% discount"],
        discountPercentage: 10,
        active: true,
      },
      {
        name: "silver",
        displayName: "Silver Member",
        price: "19.99",
        priceYearly: "199.99",
        benefits: ["Early access", "20% discount", "Meet & greet"],
        discountPercentage: 20,
        active: true,
      },
      {
        name: "gold",
        displayName: "Gold Member",
        price: "29.99",
        priceYearly: "299.99",
        benefits: ["All perks", "30% discount", "Backstage"],
        discountPercentage: 30,
        active: true,
      },
    ]);
    console.log(`✅ 3 VIP tiers seeded\n`);

    // 6. Seed Fan Art
    console.log("🎨  Seeding fan art...");
    await db.insert(schema.fanArt).values([
      {
        imageUrl: "/images/fan-art/drawing-1.jpg",
        thumbnailUrl: "/images/fan-art/thumbs/drawing-1.jpg",
        title: "The Drinkers Live",
        description: "Drawing from concert",
        approved: true,
        featured: true,
        likes: 234,
      },
      {
        imageUrl: "/images/fan-art/painting-1.jpg",
        thumbnailUrl: "/images/fan-art/thumbs/painting-1.jpg",
        title: "Band Portrait",
        description: "Oil painting",
        approved: true,
        featured: true,
        likes: 189,
      },
    ]);
    console.log(`✅ 2 fan art pieces seeded\n`);

    console.log("\n🎉 Seed completed successfully!");
    console.log("════════════════════════════════════════");
    console.log("Summary:");
    console.log("  - Products:     3");
    console.log("  - Tour Dates:   3");
    console.log("  - Albums:       3");
    console.log("  - Songs:        3");
    console.log("  - VIP Tiers:    3");
    console.log("  - Fan Art:      2");
    console.log("════════════════════════════════════════\n");
    console.log("🍺 Your database is ready for The Drinkers! 🎸\n");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
