// lib/db/schema/index.ts
// Complete database schema for The Drinkers - Music Artist Platform
// Includes: Auth, MCP, AI Chat, Merch Store, Tour Dates, Music Catalog, Community, VIP

import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  integer,
  timestamp,
  date,
  time,
  jsonb,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Import bundle and drops schemas
import { bundle, bundlePurchase } from "./bundles";
import { limitedDrop, dropEntry, dropWaitlist } from "./limited-drops";

// ============================================
// ✅ BETTER AUTH TABELE (OSNOVA)
// ============================================

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    // Custom fields
    membershipTier: varchar("membership_tier", { length: 50 }).default("free"),
    displayName: varchar("display_name", { length: 255 }),
  },
  (table) => ({
    emailIdx: index("user_email_idx").on(table.email),
    membershipTierIdx: index("user_membership_tier_idx").on(
      table.membershipTier,
    ),
  }),
);

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 45 }), // IPv6 max length
  userAgent: text("user_agent"),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  expiresAt: timestamp("expires_at"),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// ✅ MCP SERVERS
// ============================================

export const mcpServer = pgTable("mcp_server", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  type: varchar("type", { length: 50 }).notNull(), // stdio, http
  command: text("command"),
  args: jsonb("args").$type<string[]>(),
  env: jsonb("env").$type<Record<string, string>>(),
  enabled: boolean("enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// ✅ AI CONVERSATIONS
// ============================================

export const thread = pgTable("thread", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const message = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  threadId: uuid("thread_id")
    .notNull()
    .references(() => thread.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).notNull(), // user, assistant, tool
  content: text("content").notNull(),
  toolCalls: jsonb("tool_calls").$type<any[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// 🛍️ MERCH STORE (PRIORITETA #1)
// ============================================

export const product = pgTable(
  "product",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }), // Original price for sales
    stock: integer("stock").default(0).notNull(),
    sku: varchar("sku", { length: 100 }).unique(), // Stock keeping unit
    category: varchar("category", { length: 100 }), // tshirt, hoodie, poster, vinyl, cap, mug
    images: jsonb("images").$type<string[]>(), // Multiple image URLs
    sizes: jsonb("sizes").$type<string[]>(), // ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    colors: jsonb("colors").$type<string[]>(), // ['black', 'white', 'navy']
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    metadata: jsonb("metadata").$type<Record<string, any>>(), // Extra data
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index("product_category_idx").on(table.category),
    featuredIdx: index("product_featured_idx").on(table.featured),
    activeIdx: index("product_active_idx").on(table.active),
    priceIdx: index("product_price_idx").on(table.price),
  }),
);

export const order = pgTable(
  "order",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }).notNull(), // Backup if user deleted
    orderNumber: varchar("order_number", { length: 50 }).unique().notNull(), // Human-readable: ORD-2026-0001
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
    shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0"),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, paid, processing, shipped, delivered, cancelled, refunded
    paymentIntentId: varchar("payment_intent_id", { length: 255 }), // Stripe
    paymentMethod: varchar("payment_method", { length: 50 }), // card, paypal, bank_transfer
    paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // pending, paid, failed, refunded
    shippingAddress: jsonb("shipping_address").$type<{
      name: string;
      address: string;
      address2?: string;
      city: string;
      postalCode: string;
      state?: string;
      country: string;
      phone?: string;
    }>(),
    billingAddress: jsonb("billing_address").$type<{
      name: string;
      address: string;
      address2?: string;
      city: string;
      postalCode: string;
      state?: string;
      country: string;
    }>(),
    shippingMethod: varchar("shipping_method", { length: 100 }), // standard, express, overnight
    trackingNumber: varchar("tracking_number", { length: 255 }),
    trackingUrl: text("tracking_url"),
    carrier: varchar("carrier", { length: 100 }), // post, dhl, fedex, ups
    notes: text("notes"), // Customer notes
    discountCode: varchar("discount_code", { length: 50 }),
    discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    paidAt: timestamp("paid_at"),
    shippedAt: timestamp("shipped_at"),
    deliveredAt: timestamp("delivered_at"),
    cancelledAt: timestamp("cancelled_at"),
  },
  (table) => ({
    userIdIdx: index("order_user_id_idx").on(table.userId),
    statusIdx: index("order_status_idx").on(table.status),
    orderNumberIdx: index("order_order_number_idx").on(table.orderNumber),
    createdAtIdx: index("order_created_at_idx").on(table.createdAt),
    paymentStatusIdx: index("order_payment_status_idx").on(table.paymentStatus),
  }),
);

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "restrict" }), // Prevent delete if has orders
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Price at purchase
  size: varchar("size", { length: 20 }),
  color: varchar("color", { length: 50 }),
  sku: varchar("sku", { length: 100 }), // Snapshot of product SKU
});

// ============================================
// 🎵 TOUR DATES (PRIORITETA #2)
// ============================================

export const tourDate = pgTable(
  "tour_date",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tourName: varchar("tour_name", { length: 255 }), // "Summer Tour 2026"
    venue: varchar("venue", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    state: varchar("state", { length: 100 }), // For US/Canada
    country: varchar("country", { length: 100 }).notNull(),
    date: date("date").notNull(),
    time: time("time"), // Show start time
    doors: time("doors"), // Doors open time
    ticketUrl: text("ticket_url"),
    ticketUrlLocal: text("ticket_url_local"), // Local ticket vendor
    ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }),
    ticketPriceMin: decimal("ticket_price_min", { precision: 10, scale: 2 }), // Price range
    ticketPriceMax: decimal("ticket_price_max", { precision: 10, scale: 2 }),
    status: varchar("status", { length: 50 }).notNull().default("announced"), // announced, on_sale, sold_out, completed, cancelled, postponed
    capacity: integer("capacity"),
    soldTickets: integer("sold_tickets").default(0),
    supportActs: jsonb("support_acts").$type<string[]>(), // Opening acts
    ageRestriction: varchar("age_restriction", { length: 50 }), // all_ages, 16+, 18+, 21+
    vipAvailable: boolean("vip_available").default(false),
    vipDescription: text("vip_description"),
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    notes: text("notes"), // Additional info
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    dateIdx: index("tour_date_date_idx").on(table.date),
    cityIdx: index("tour_date_city_idx").on(table.city),
    countryIdx: index("tour_date_country_idx").on(table.country),
    statusIdx: index("tour_date_status_idx").on(table.status),
    featuredIdx: index("tour_date_featured_idx").on(table.featured),
    activeIdx: index("tour_date_active_idx").on(table.active),
  }),
);

// ============================================
// 💿 MUSIC CATALOG (PRIORITETA #3)
// ============================================

export const album = pgTable(
  "album",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    artist: varchar("artist", { length: 255 }), // Featured artist
    artistId: uuid("artist_id").references(() => user.id), // If user is artist
    releaseDate: date("release_date").notNull(),
    coverImage: text("cover_image"),
    coverImageThumbnail: text("cover_image_thumbnail"),
    description: text("description"),
    label: varchar("label", { length: 255 }), // Record label
    genre: jsonb("genre").$type<string[]>(), // Multiple genres
    totalTracks: integer("total_tracks").default(0),
    duration: integer("duration").default(0), // Total duration in seconds
    tracks: jsonb("tracks").$type<
      {
        id: string;
        title: string;
        duration: number;
        trackNumber: number;
        lyrics?: string;
      }[]
    >(), // Embedded tracklist
    spotifyUrl: text("spotify_url"),
    spotifyId: varchar("spotify_id", { length: 100 }),
    appleMusicUrl: text("apple_music_url"),
    appleMusicId: varchar("apple_music_id", { length: 100 }),
    youtubeUrl: text("youtube_url"),
    youtubeId: varchar("youtube_id", { length: 100 }),
    bandcampUrl: text("bandcamp_url"),
    soundcloudUrl: text("soundcloud_url"),
    tidalUrl: text("tidal_url"),
    deezerUrl: text("deezer_url"),
    amazonMusicUrl: text("amazon_music_url"),
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    albumType: varchar("album_type", { length: 50 }).default("album"), // album, ep, single, compilation, live
    upc: varchar("upc", { length: 50 }), // Barcode
    catalogNumber: varchar("catalog_number", { length: 100 }),
    copyright: text("copyright"),
    producers: jsonb("producers").$type<string[]>(),
    engineers: jsonb("engineers").$type<string[]>(),
    studios: jsonb("studios").$type<string[]>(),
    metadata: jsonb("metadata").$type<Record<string, any>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    releaseDateIdx: index("album_release_date_idx").on(table.releaseDate),
    featuredIdx: index("album_featured_idx").on(table.featured),
    activeIdx: index("album_active_idx").on(table.active),
    albumTypeIdx: index("album_type_idx").on(table.albumType),
    artistIdx: index("album_artist_idx").on(table.artist),
  }),
);

export const song = pgTable(
  "song",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    albumId: uuid("album_id").references(() => album.id, {
      onDelete: "set null",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    artist: varchar("artist", { length: 255 }), // Featured artist
    artistId: uuid("artist_id").references(() => user.id),
    duration: integer("duration").notNull(), // in seconds
    lyrics: text("lyrics"),
    trackNumber: integer("track_number"),
    discNumber: integer("disc_number").default(1), // For multi-disc albums
    isrc: varchar("isrc", { length: 50 }), // International Standard Recording Code
    spotifyUrl: text("spotify_url"),
    spotifyId: varchar("spotify_id", { length: 100 }),
    appleMusicUrl: text("apple_music_url"),
    appleMusicId: varchar("apple_music_id", { length: 100 }),
    youtubeUrl: text("youtube_url"),
    youtubeId: varchar("youtube_id", { length: 100 }),
    soundcloudUrl: text("soundcloud_url"),
    bandcampUrl: text("bandcamp_url"),
    tidalUrl: text("tidal_url"),
    audioFile: text("audio_file"), // S3/Cloudflare R2 URL for preview
    audioFilePreview: text("audio_file_preview"), // 30s preview
    instrumental: boolean("instrumental").default(false),
    explicit: boolean("explicit").default(false),
    bpm: integer("bpm"), // Beats per minute
    key: varchar("key", { length: 20 }), // Musical key (e.g., "C major", "A minor")
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    playCount: integer("play_count").default(0),
    writers: jsonb("writers").$type<string[]>(), // Songwriters
    producers: jsonb("producers").$type<string[]>(),
    metadata: jsonb("metadata").$type<Record<string, any>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    albumIdIdx: index("song_album_id_idx").on(table.albumId),
    trackNumberIdx: index("song_track_number_idx").on(table.trackNumber),
    featuredIdx: index("song_featured_idx").on(table.featured),
    activeIdx: index("song_active_idx").on(table.active),
    artistIdx: index("song_artist_idx").on(table.artist),
  }),
);

// ============================================
// 🎨 FAN ART & COMMUNITY (PRIORITETA #4)
// ============================================

export const fanArt = pgTable(
  "fan_art",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }), // For non-logged-in submissions
    imageUrl: text("image_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    medium: varchar("medium", { length: 100 }), // digital, painting, drawing, sculpture, photo
    category: varchar("category", { length: 100 }), // artwork, photo, video, music_cover
    approved: boolean("approved").default(false).notNull(),
    featured: boolean("featured").default(false),
    likes: integer("likes").default(0),
    views: integer("views").default(0),
    tags: jsonb("tags").$type<string[]>(),
    nsfw: boolean("nsfw").default(false),
    rejectionReason: text("rejection_reason"), // Why rejected
    moderatorNotes: text("moderator_notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    approvedAt: timestamp("approved_at"),
    approvedBy: uuid("approved_by").references(() => user.id), // Moderator who approved
  },
  (table) => ({
    userIdIdx: index("fan_art_user_id_idx").on(table.userId),
    approvedIdx: index("fan_art_approved_idx").on(table.approved),
    featuredIdx: index("fan_art_featured_idx").on(table.featured),
    createdAtIdx: index("fan_art_created_at_idx").on(table.createdAt),
    categoryIdx: index("fan_art_category_idx").on(table.category),
  }),
);

// Fan art likes (separate table to prevent duplicate likes)
export const fanArtLike = pgTable(
  "fan_art_like",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fanArtId: uuid("fan_art_id")
      .notNull()
      .references(() => fanArt.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    fanArtIdIdx: index("fan_art_like_fan_art_id_idx").on(table.fanArtId),
    userIdIdx: index("fan_art_like_user_id_idx").on(table.userId),
    uniqueLike: index("fan_art_like_unique_idx").on(
      table.fanArtId,
      table.userId,
    ),
  }),
);

// ============================================
// 👑 VIP MEMBERSHIPS (PRIORITETA #5)
// ============================================

export const vipMembership = pgTable(
  "vip_membership",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    tier: varchar("tier", { length: 50 }).notNull(), // bronze, silver, gold, platinum, diamond
    status: varchar("status", { length: 50 }).notNull().default("active"), // active, expired, cancelled, paused
    startDate: date("start_date").notNull(),
    expiresAt: date("expires_at").notNull(),
    cancelledAt: timestamp("cancelled_at"),
    pausedAt: timestamp("paused_at"),
    resumedAt: timestamp("resumed_at"),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    benefits: jsonb("benefits").$type<string[]>(), // Active benefits at signup
    discountCode: varchar("discount_code", { length: 50 }).unique(),
    discountPercentage: integer("discount_percentage").default(10), // 10% off merch
    earlyAccess: boolean("early_access").default(false), // Early ticket access
    exclusiveContent: boolean("exclusive_content").default(false),
    meetAndGreet: boolean("meet_and_greet").default(false),
    lifetimeAccess: boolean("lifetime_access").default(false),
    notes: text("notes"), // Admin notes
    metadata: jsonb("metadata").$type<Record<string, any>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("vip_membership_user_id_idx").on(table.userId),
    tierIdx: index("vip_membership_tier_idx").on(table.tier),
    statusIdx: index("vip_membership_status_idx").on(table.status),
    expiresAtIdx: index("vip_membership_expires_at_idx").on(table.expiresAt),
    discountCodeIdx: index("vip_membership_discount_code_idx").on(
      table.discountCode,
    ),
  }),
);

// VIP membership tiers configuration
export const vipTier = pgTable("vip_tier", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(), // bronze, silver, gold
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Monthly price
  priceYearly: decimal("price_yearly", { precision: 10, scale: 2 }), // Yearly price (discounted)
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  benefits: jsonb("benefits").$type<string[]>(),
  discountPercentage: integer("discount_percentage").default(0),
  earlyAccess: boolean("early_access").default(false),
  exclusiveContent: boolean("exclusive_content").default(false),
  meetAndGreet: boolean("meet_and_greet").default(false),
  lifetimeAccess: boolean("lifetime_access").default(false),
  maxDiscounts: integer("max_discounts"), // Max uses per month
  active: boolean("active").default(true),
  priority: integer("priority").default(0), // Display order
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripePriceIdYearly: varchar("stripe_price_id_yearly", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// 🎁 REWARDS & LOYALTY PROGRAM
// ============================================

export const userReward = pgTable("user_reward", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // points, badge, discount, free_shipping
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  value: decimal("value", { precision: 10, scale: 2 }), // Points amount or discount value
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  usedAt: timestamp("used_at"),
  status: varchar("status", { length: 50 }).notNull().default("active"), // active, used, expired
});

export const userPoints = pgTable("user_points", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  points: integer("points").default(0).notNull(),
  lifetimePoints: integer("lifetime_points").default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const pointsTransaction = pgTable("points_transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // Positive = earned, negative = spent
  type: varchar("type", { length: 50 }).notNull(), // purchase, review, referral, redemption, bonus
  description: text("description").notNull(),
  reference: varchar("reference", { length: 255 }), // Order ID, etc.
  balance: integer("balance").notNull(), // Balance after transaction
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// DATABASE RELATIONS
// ============================================

// Better Auth Relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  threads: many(thread),
  orders: many(order),
  fanArts: many(fanArt),
  fanArtLikes: many(fanArtLike),
  vipMemberships: many(vipMembership),
  rewards: many(userReward),
  points: many(userPoints),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// AI Conversation Relations
export const threadRelations = relations(thread, ({ one, many }) => ({
  user: one(user, {
    fields: [thread.userId],
    references: [user.id],
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  thread: one(thread, {
    fields: [message.threadId],
    references: [thread.id],
  }),
}));

// Merchandise Relations
export const productRelations = relations(product, ({ many }) => ({
  orderItems: many(orderItem),
}));

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  items: many(orderItem),
}));

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(order, {
    fields: [orderItem.orderId],
    references: [order.id],
  }),
  product: one(product, {
    fields: [orderItem.productId],
    references: [product.id],
  }),
}));

// Music Catalog Relations
export const albumRelations = relations(album, ({ many }) => ({
  songs: many(song),
}));

export const songRelations = relations(song, ({ one }) => ({
  album: one(album, {
    fields: [song.albumId],
    references: [album.id],
  }),
}));

// Community Relations
export const fanArtRelations = relations(fanArt, ({ one, many }) => ({
  user: one(user, {
    fields: [fanArt.userId],
    references: [user.id],
  }),
  likes: many(fanArtLike),
}));

export const fanArtLikeRelations = relations(fanArtLike, ({ one }) => ({
  fanArt: one(fanArt, {
    fields: [fanArtLike.fanArtId],
    references: [fanArt.id],
  }),
  user: one(user, {
    fields: [fanArtLike.userId],
    references: [user.id],
  }),
}));

// VIP Relations
export const vipMembershipRelations = relations(vipMembership, ({ one }) => ({
  user: one(user, {
    fields: [vipMembership.userId],
    references: [user.id],
  }),
}));

export const vipTierRelations = relations(vipTier, ({ many }) => ({
  memberships: many(vipMembership),
}));

// Rewards Relations
export const userRewardRelations = relations(userReward, ({ one }) => ({
  user: one(user, {
    fields: [userReward.userId],
    references: [user.id],
  }),
}));

export const userPointsRelations = relations(userPoints, ({ one }) => ({
  user: one(user, {
    fields: [userPoints.userId],
    references: [user.id],
  }),
}));

export const pointsTransactionRelations = relations(
  pointsTransaction,
  ({ one }) => ({
    user: one(user, {
      fields: [pointsTransaction.userId],
      references: [user.id],
    }),
  }),
);

// ============================================
// TYPESCRIPT TYPES
// ============================================

// Better Auth Types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;

// MCP Types
export type MCPServer = typeof mcpServer.$inferSelect;
export type NewMCPServer = typeof mcpServer.$inferInsert;

// AI Conversation Types
export type Thread = typeof thread.$inferSelect;
export type NewThread = typeof thread.$inferInsert;
export type Message = typeof message.$inferSelect;
export type NewMessage = typeof message.$inferInsert;

// Merchandise Types
export type Product = typeof product.$inferSelect;
export type NewProduct = typeof product.$inferInsert;
export type Order = typeof order.$inferSelect;
export type NewOrder = typeof order.$inferInsert;
export type OrderItem = typeof orderItem.$inferSelect;
export type NewOrderItem = typeof orderItem.$inferInsert;

// Tour Types
export type TourDate = typeof tourDate.$inferSelect;
export type NewTourDate = typeof tourDate.$inferInsert;

// Music Catalog Types
export type Album = typeof album.$inferSelect;
export type NewAlbum = typeof album.$inferInsert;
export type Song = typeof song.$inferSelect;
export type NewSong = typeof song.$inferInsert;

// Community Types
export type FanArt = typeof fanArt.$inferSelect;
export type NewFanArt = typeof fanArt.$inferInsert;
export type FanArtLike = typeof fanArtLike.$inferSelect;
export type NewFanArtLike = typeof fanArtLike.$inferInsert;

// VIP Types
export type VIPMembership = typeof vipMembership.$inferSelect;
export type NewVIPMembership = typeof vipMembership.$inferInsert;
export type VIPTier = typeof vipTier.$inferSelect;
export type NewVIPTier = typeof vipTier.$inferInsert;

// Rewards Types
export type UserReward = typeof userReward.$inferSelect;
export type NewUserReward = typeof userReward.$inferInsert;
export type UserPoints = typeof userPoints.$inferSelect;
export type NewUserPoints = typeof userPoints.$inferInsert;
export type PointsTransaction = typeof pointsTransaction.$inferSelect;
export type NewPointsTransaction = typeof pointsTransaction.$inferInsert;

// Bundle Deals Types
export { bundle, bundlePurchase } from "./bundles";
export type Bundle = typeof bundle.$inferSelect;
export type NewBundle = typeof bundle.$inferInsert;
export type BundlePurchase = typeof bundlePurchase.$inferSelect;
export type NewBundlePurchase = typeof bundlePurchase.$inferInsert;

// Limited Drops Types
export { limitedDrop, dropEntry, dropWaitlist } from "./limited-drops";
export type LimitedDrop = typeof limitedDrop.$inferSelect;
export type NewLimitedDrop = typeof limitedDrop.$inferInsert;
export type DropEntry = typeof dropEntry.$inferSelect;
export type NewDropEntry = typeof dropEntry.$inferInsert;
export type DropWaitlist = typeof dropWaitlist.$inferSelect;
export type NewDropWaitlist = typeof dropWaitlist.$inferInsert;
