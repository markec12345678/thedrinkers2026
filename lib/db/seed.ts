/**
 * 🎸 THE DRINKERS - DATABASE SEED DATA
 * Generira testne podatke za development
 *
 * Usage: node lib/db/seed.ts
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql = neon(process.env.DATABASE_URL!);

console.log("🎸 Starting The Drinkers Database Seed...\n");

async function seed() {
  try {
    // ============================================
    // 1. MERCHANDISE PRODUCTS (5 products)
    // ============================================
    console.log("👕 Seeding Merchandise Products...");

    const products = [
      {
        name: "The Drinkers - Pijemo Ga Radi T-Shirt",
        description:
          'Uradna The Drinkers majica z legendarnim napisom "Pijemo Ga Radi". 100% bombaž, visoka kakovost.',
        price: "24.99",
        stock: 100,
        images: ["https://thedrinkers.si/images/merch/tshirt-pijemo.jpg"],
        category: "tshirt",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["black", "white"],
        featured: true,
        active: true,
      },
      {
        name: "The Drinkers - Alkohol Idol Hoodie",
        description:
          "Udoben hoodie z motivom Alkohol Idol. Toplo in stilsko oblačilo za prave fane.",
        price: "49.99",
        stock: 50,
        images: ["https://thedrinkers.si/images/merch/alkohol-idol-hoodie.jpg"],
        category: "hoodie",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["black", "grey"],
        featured: true,
        active: true,
      },
      {
        name: "The Drinkers - Pivski Vršček",
        description:
          "Uradni pivski vršček The Drinkers. Popoln dodatek za vsakega pravega fana.",
        price: "14.99",
        stock: 200,
        images: ["https://thedrinkers.si/images/merch/pivski-vrcek.jpg"],
        category: "cap",
        sizes: ["one-size"],
        colors: ["black", "blue"],
        featured: false,
        active: true,
      },
      {
        name: "The Drinkers - Vinyl Album",
        description:
          "Limited edition vinyl album z najboljšimi hiti. Zbirateljski predmet za prave ljubitelje.",
        price: "39.99",
        stock: 25,
        images: ["https://thedrinkers.si/images/merch/vinyl-album.jpg"],
        category: "vinyl",
        sizes: ["standard"],
        colors: ["black"],
        featured: true,
        active: true,
      },
      {
        name: "The Drinkers - Keramična Kruška",
        description:
          "Kvalitetna keramična kruška z logotipom The Drinkers. Popolna za dom ali službo.",
        price: "12.99",
        stock: 150,
        images: ["https://thedrinkers.si/images/merch/mug.jpg"],
        category: "mug",
        sizes: ["standard"],
        colors: ["white", "black"],
        featured: false,
        active: true,
      },
    ];

    for (const product of products) {
      await sql`
        INSERT INTO product (name, description, price, stock, images, category, sizes, colors, featured, active)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.stock}, 
                ${JSON.stringify(product.images)}, ${product.category}, ${JSON.stringify(product.sizes)}, 
                ${JSON.stringify(product.colors)}, ${product.featured}, ${product.active})
      `;
    }
    console.log(`✅ Seeded ${products.length} products\n`);

    // ============================================
    // 2. ALBUMS (3 albums)
    // ============================================
    console.log("💿 Seeding Albums...");

    const albums = [
      {
        title: "Prohibicija",
        releaseDate: "2020-01-15",
        coverImage: "https://thedrinkers.si/images/albums/prohibicija.jpg",
        description: "Legendarni album Prohibicija z največjimi hiti.",
        label: "The Drinkers Records",
        genre: "Rock",
        totalTracks: 12,
        featured: true,
        active: true,
      },
      {
        title: "Pivolucija",
        releaseDate: "2018-06-20",
        coverImage: "https://thedrinkers.si/images/albums/pivolucija.jpg",
        description: "Revolucionaren album posvečen pivu in dobri glasbi.",
        label: "The Drinkers Records",
        genre: "Rock",
        totalTracks: 10,
        featured: true,
        active: true,
      },
      {
        title: "Žeja",
        releaseDate: "2015-03-10",
        coverImage: "https://thedrinkers.si/images/albums/zeja.jpg",
        description: "Album Žeja - začetek naše glasbene poti.",
        label: "The Drinkers Records",
        genre: "Rock",
        totalTracks: 8,
        featured: false,
        active: true,
      },
    ];

    for (const album of albums) {
      await sql`
        INSERT INTO album (title, releaseDate, coverImage, description, label, genre, totalTracks, featured, active)
        VALUES (${album.title}, ${album.releaseDate}, ${album.coverImage}, ${album.description}, 
                ${album.label}, ${album.genre}, ${album.totalTracks}, ${album.featured}, ${album.active})
      `;
    }
    console.log(`✅ Seeded ${albums.length} albums\n`);

    // ============================================
    // 3. SONGS (10 songs)
    // ============================================
    console.log("🎵 Seeding Songs...");

    const songs = [
      {
        albumTitle: "Prohibicija",
        title: "Prohibicija",
        duration: 245,
        trackNumber: 1,
        lyrics: "...",
      },
      {
        albumTitle: "Prohibicija",
        title: "Pijemo Ga Radi",
        duration: 198,
        trackNumber: 2,
        lyrics: "...",
      },
      {
        albumTitle: "Prohibicija",
        title: "Alkohol Idol",
        duration: 212,
        trackNumber: 3,
        lyrics: "...",
      },
      {
        albumTitle: "Prohibicija",
        title: "Na Zdravje",
        duration: 187,
        trackNumber: 4,
        lyrics: "...",
      },
      {
        albumTitle: "Pivolucija",
        title: "Pivolucija",
        duration: 234,
        trackNumber: 1,
        lyrics: "...",
      },
      {
        albumTitle: "Pivolucija",
        title: "Pivo Je Krivo",
        duration: 201,
        trackNumber: 2,
        lyrics: "...",
      },
      {
        albumTitle: "Pivolucija",
        title: "Žejna Grla",
        duration: 189,
        trackNumber: 3,
        lyrics: "...",
      },
      {
        albumTitle: "Žeja",
        title: "Žeja",
        duration: 223,
        trackNumber: 1,
        lyrics: "...",
      },
      {
        albumTitle: "Žeja",
        title: "Dvižam Kozarec",
        duration: 195,
        trackNumber: 2,
        lyrics: "...",
      },
      {
        albumTitle: "Žeja",
        title: "Zadnja Runda",
        duration: 267,
        trackNumber: 3,
        lyrics: "...",
      },
    ];

    for (const song of songs) {
      const album =
        await sql`SELECT id FROM album WHERE title = ${song.albumTitle} LIMIT 1`;
      if (album.length > 0) {
        await sql`
          INSERT INTO song (albumId, title, duration, trackNumber, lyrics, featured, active)
          VALUES (${album[0].id}, ${song.title}, ${song.duration}, ${song.trackNumber}, 
                  ${song.lyrics}, true, true)
        `;
      }
    }
    console.log(`✅ Seeded ${songs.length} songs\n`);

    // ============================================
    // 4. TOUR DATES (5 concerts)
    // ============================================
    console.log("🎤 Seeding Tour Dates...");

    const tourDates = [
      {
        venue: "Cankarjev Dom",
        city: "Ljubljana",
        country: "Slovenija",
        date: "2026-06-15",
        time: "20:00",
        ticketUrl: "https://eventim.si/the-drinkers-ljubljana",
        ticketPrice: "25.00",
        status: "on_sale",
        capacity: 1500,
        soldTickets: 850,
        featured: true,
      },
      {
        venue: "Gledališče Glej",
        city: "Maribor",
        country: "Slovenija",
        date: "2026-06-20",
        time: "21:00",
        ticketUrl: "https://eventim.si/the-drinkers-maribor",
        ticketPrice: "22.00",
        status: "on_sale",
        capacity: 800,
        soldTickets: 420,
        featured: true,
      },
      {
        venue: "Kino Šiška",
        city: "Koper",
        country: "Slovenija",
        date: "2026-06-25",
        time: "20:30",
        ticketUrl: "https://eventim.si/the-drinkers-koper",
        ticketPrice: "20.00",
        status: "on_sale",
        capacity: 600,
        soldTickets: 380,
        featured: false,
      },
      {
        venue: "Arena Stožice",
        city: "Ljubljana",
        country: "Slovenija",
        date: "2026-12-31",
        time: "22:00",
        ticketUrl: "https://eventim.si/the-drinkers-novo-leto",
        ticketPrice: "35.00",
        status: "announced",
        capacity: 5000,
        soldTickets: 0,
        featured: true,
      },
      {
        venue: "Vienna Arena",
        city: "Vienna",
        country: "Austria",
        date: "2027-02-14",
        time: "19:00",
        ticketUrl: "https://oeticket.com/the-drinkers-vienna",
        ticketPrice: "30.00",
        status: "announced",
        capacity: 3000,
        soldTickets: 0,
        featured: true,
      },
    ];

    for (const tour of tourDates) {
      await sql`
        INSERT INTO tour_date (venue, city, country, date, time, ticketUrl, ticketPrice, status, capacity, soldTickets, featured)
        VALUES (${tour.venue}, ${tour.city}, ${tour.country}, ${tour.date}, ${tour.time}, 
                ${tour.ticketUrl}, ${tour.ticketPrice}, ${tour.status}, ${tour.capacity}, 
                ${tour.soldTickets}, ${tour.featured})
      `;
    }
    console.log(`✅ Seeded ${tourDates.length} tour dates\n`);

    // ============================================
    // 5. FAN ART (10 submissions)
    // ============================================
    console.log("🎨 Seeding Fan Art...");

    // Get a test user ID (first user or create one)
    const testUser = await sql`SELECT id FROM user LIMIT 1`;
    const userId =
      testUser.length > 0
        ? testUser[0].id
        : "00000000-0000-0000-0000-000000000000";

    const fanArts = [
      {
        title: "The Drinkers Live",
        description: "Moja ilustracija koncerta",
        imageUrl: "https://example.com/fanart1.jpg",
        approved: true,
        featured: true,
        likes: 42,
      },
      {
        title: "Pivo in Rock",
        description: "Digitalna umetnost",
        imageUrl: "https://example.com/fanart2.jpg",
        approved: true,
        featured: false,
        likes: 28,
      },
      {
        title: "Alkohol Idol Fan Art",
        description: "Risba mojega najljubšega hita",
        imageUrl: "https://example.com/fanart3.jpg",
        approved: true,
        featured: true,
        likes: 56,
      },
      {
        title: "Prohibicija Album Cover",
        description: "Moja verzija album coverja",
        imageUrl: "https://example.com/fanart4.jpg",
        approved: true,
        featured: false,
        likes: 33,
      },
      {
        title: "The Drinkers Logo",
        description: "Nov dizajn logotipa",
        imageUrl: "https://example.com/fanart5.jpg",
        approved: false,
        featured: false,
        likes: 12,
      },
      {
        title: "Koncertni Spomini",
        description: "Fotografija s koncerta",
        imageUrl: "https://example.com/fanart6.jpg",
        approved: true,
        featured: false,
        likes: 67,
      },
      {
        title: "Pivolucija Plakat",
        description: "Plakat za album Pivolucija",
        imageUrl: "https://example.com/fanart7.jpg",
        approved: true,
        featured: true,
        likes: 89,
      },
      {
        title: "Žeja Vinyl",
        description: "Ilustracija vinyl albuma",
        imageUrl: "https://example.com/fanart8.jpg",
        approved: true,
        featured: false,
        likes: 23,
      },
      {
        title: "The Drinkers Band",
        description: "Portret celotne zasedbe",
        imageUrl: "https://example.com/fanart9.jpg",
        approved: true,
        featured: true,
        likes: 104,
      },
      {
        title: "Na Zdravje!",
        description: "Umetniška interpretacija",
        imageUrl: "https://example.com/fanart10.jpg",
        approved: false,
        featured: false,
        likes: 8,
      },
    ];

    for (const art of fanArts) {
      await sql`
        INSERT INTO fan_art (userId, imageUrl, title, description, approved, featured, likes)
        VALUES (${userId}, ${art.imageUrl}, ${art.title}, ${art.description}, 
                ${art.approved}, ${art.featured}, ${art.likes})
      `;
    }
    console.log(`✅ Seeded ${fanArts.length} fan art submissions\n`);

    // ============================================
    // 6. VIP MEMBERSHIPS (3 tiers)
    // ============================================
    console.log("🌟 Seeding VIP Memberships...");

    const memberships = [
      {
        tier: "bronze",
        status: "active",
        startDate: "2026-01-01",
        expiresAt: "2027-01-01",
        benefits: [
          "Early access to tickets",
          "10% merch discount",
          "Exclusive newsletter",
        ],
        stripeSubscriptionId: "sub_bronze_001",
      },
      {
        tier: "silver",
        status: "active",
        startDate: "2026-01-01",
        expiresAt: "2027-01-01",
        benefits: [
          "Early access to tickets",
          "15% merch discount",
          "Exclusive newsletter",
          "Meet & greet access",
          "Signed posters",
        ],
        stripeSubscriptionId: "sub_silver_001",
      },
      {
        tier: "gold",
        status: "active",
        startDate: "2026-01-01",
        expiresAt: "2027-01-01",
        benefits: [
          "Early access to tickets",
          "20% merch discount",
          "Exclusive newsletter",
          "Meet & greet access",
          "Signed albums",
          "Backstage access",
          "VIP lounge access",
        ],
        stripeSubscriptionId: "sub_gold_001",
      },
    ];

    for (const membership of memberships) {
      await sql`
        INSERT INTO vip_membership (userId, tier, status, startDate, expiresAt, benefits, stripeSubscriptionId)
        VALUES (${userId}, ${membership.tier}, ${membership.status}, ${membership.startDate}, 
                ${membership.expiresAt}, ${JSON.stringify(membership.benefits)}, ${membership.stripeSubscriptionId})
      `;
    }
    console.log(`✅ Seeded ${memberships.length} VIP memberships\n`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log("═══════════════════════════════════════════");
    console.log("🎉 DATABASE SEED COMPLETE!");
    console.log("═══════════════════════════════════════════");
    console.log("✅ Products:        5");
    console.log("✅ Albums:          3");
    console.log("✅ Songs:          10");
    console.log("✅ Tour Dates:      5");
    console.log("✅ Fan Art:        10");
    console.log("✅ VIP Memberships: 3");
    console.log("═══════════════════════════════════════════");
    console.log("\n🍺 Your database is ready for The Drinkers! 🎸\n");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
