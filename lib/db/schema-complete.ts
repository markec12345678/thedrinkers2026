import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  index,
  integer,
  decimal,
  date,
  time,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================
// Better Auth Tables (OBSTOJEČE)
// ============================================

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    // Custom fields
    membershipTier: text("membership_tier").default("free"),
    displayName: text("display_name"),
  },
  (table) => ({
    emailIdx: index("user_email_idx").on(table.email),
  }),
);

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  expiresAt: timestamp("expires_at"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// MCP Servers (OBSTOJEČE)
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
// AI Conversations (OBSTOJEČE)
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
// Merchandise Store (NOVO - PRIORITETA #1)
// ============================================

export const product = pgTable(
  "product",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    stock: integer("stock").default(0).notNull(),
    images: jsonb("images").$type<string[]>(),
    category: varchar("category", { length: 100 }), // tshirt, hoodie, cap, mug, vinyl, etc.
    sizes: jsonb("sizes").$type<string[]>(), // S, M, L, XL, XXL
    colors: jsonb("colors").$type<string[]>(),
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index("product_category_idx").on(table.category),
    featuredIdx: index("product_featured_idx").on(table.featured),
    activeIdx: index("product_active_idx").on(table.active),
  }),
);

export const order = pgTable(
  "order",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, paid, shipped, delivered, cancelled
    shippingAddress: jsonb("shipping_address").$type<{
      street: string;
      city: string;
      postalCode: string;
      country: string;
    }>(),
    billingAddress: jsonb("billing_address").$type<{
      street: string;
      city: string;
      postalCode: string;
      country: string;
    }>(),
    paymentIntentId: varchar("payment_intent_id", { length: 255 }), // Stripe payment intent
    trackingNumber: varchar("tracking_number", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("order_user_id_idx").on(table.userId),
    statusIdx: index("order_status_idx").on(table.status),
    createdAtIdx: index("order_created_at_idx").on(table.createdAt),
  }),
);

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "restrict" }),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  size: varchar("size", { length: 20 }),
  color: varchar("color", { length: 50 }),
});

// ============================================
// Tour Dates & Concerts (NOVO - PRIORITETA #2)
// ============================================

export const tourDate = pgTable(
  "tour_date",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    venue: varchar("venue", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    date: date("date").notNull(),
    time: time("time"),
    ticketUrl: text("ticket_url"),
    ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }),
    status: varchar("status", { length: 50 }).notNull().default("announced"), // announced, on_sale, sold_out, completed, cancelled
    capacity: integer("capacity"),
    soldTickets: integer("sold_tickets").default(0),
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    dateIdx: index("tour_date_date_idx").on(table.date),
    cityIdx: index("tour_date_city_idx").on(table.city),
    countryIdx: index("tour_date_country_idx").on(table.country),
    statusIdx: index("tour_date_status_idx").on(table.status),
    featuredIdx: index("tour_date_featured_idx").on(table.featured),
  }),
);

// ============================================
// Music Catalog - Albums & Songs (NOVO - PRIORITETA #3)
// ============================================

export const album = pgTable(
  "album",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    releaseDate: date("release_date").notNull(),
    coverImage: text("cover_image"),
    description: text("description"),
    label: varchar("label", { length: 255 }),
    genre: varchar("genre", { length: 100 }),
    totalTracks: integer("total_tracks").default(0),
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    releaseDateIdx: index("album_release_date_idx").on(table.releaseDate),
    featuredIdx: index("album_featured_idx").on(table.featured),
    activeIdx: index("album_active_idx").on(table.active),
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
    duration: integer("duration").notNull(), // in seconds
    lyrics: text("lyrics"),
    trackNumber: integer("track_number"),
    featured: boolean("featured").default(false),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    albumIdIdx: index("song_album_id_idx").on(table.albumId),
    trackNumberIdx: index("song_track_number_idx").on(table.trackNumber),
    featuredIdx: index("song_featured_idx").on(table.featured),
  }),
);

// ============================================
// Fan Art & Community (NOVO - PRIORITETA #4)
// ============================================

export const fanArt = pgTable(
  "fan_art",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    imageUrl: text("image_url").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    approved: boolean("approved").default(false),
    featured: boolean("featured").default(false),
    likes: integer("likes").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("fan_art_user_id_idx").on(table.userId),
    approvedIdx: index("fan_art_approved_idx").on(table.approved),
    featuredIdx: index("fan_art_featured_idx").on(table.featured),
    createdAtIdx: index("fan_art_created_at_idx").on(table.createdAt),
  }),
);

// ============================================
// VIP Memberships (NOVO - PRIORITETA #5)
// ============================================

export const vipMembership = pgTable(
  "vip_membership",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    tier: varchar("tier", { length: 50 }).notNull(), // bronze, silver, gold, platinum
    status: varchar("status", { length: 50 }).notNull().default("active"), // active, expired, cancelled
    startDate: date("start_date").notNull(),
    expiresAt: date("expires_at").notNull(),
    benefits: jsonb("benefits").$type<string[]>(),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("vip_membership_user_id_idx").on(table.userId),
    tierIdx: index("vip_membership_tier_idx").on(table.tier),
    statusIdx: index("vip_membership_status_idx").on(table.status),
    expiresAtIdx: index("vip_membership_expires_at_idx").on(table.expiresAt),
  }),
);

// ============================================
// Database Relations
// ============================================

// Better Auth Relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  threads: many(thread),
  orders: many(order),
  fanArts: many(fanArt),
  vipMemberships: many(vipMembership),
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
export const fanArtRelations = relations(fanArt, ({ one }) => ({
  user: one(user, {
    fields: [fanArt.userId],
    references: [user.id],
  }),
}));

export const vipMembershipRelations = relations(vipMembership, ({ one }) => ({
  user: one(user, {
    fields: [vipMembership.userId],
    references: [user.id],
  }),
}));

// ============================================
// TypeScript Types
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
export type VIPMembership = typeof vipMembership.$inferSelect;
export type NewVIPMembership = typeof vipMembership.$inferInsert;
