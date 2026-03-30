// lib/db/schema/bundles.ts
// Bundle deals schema for The Drinkers merch store

import {
  pgTable,
  uuid,
  varchar,
  decimal,
  boolean,
  jsonb,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { product } from "./index";

export const bundle = pgTable("bundle", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  discountPercentage: integer("discount_percentage").default(0),
  products: jsonb("products").$type<string[]>(), // Array of product IDs
  active: boolean("active").default(true),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bundlePurchase = pgTable("bundle_purchase", {
  id: uuid("id").primaryKey().defaultRandom(),
  bundleId: uuid("bundle_id")
    .notNull()
    .references(() => bundle.id),
  userId: uuid("user_id").notNull(),
  orderId: uuid("order_id").notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
});

export const bundleRelations = relations(bundle, ({ many }) => ({
  purchases: many(bundlePurchase),
}));

export const bundlePurchaseRelations = relations(bundlePurchase, ({ one }) => ({
  bundle: one(bundle, {
    fields: [bundlePurchase.bundleId],
    references: [bundle.id],
  }),
}));
