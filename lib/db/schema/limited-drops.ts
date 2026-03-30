// lib/db/schema/limited-drops.ts
// Limited edition drops schema for The Drinkers merch store

import {
  pgTable,
  uuid,
  varchar,
  decimal,
  boolean,
  integer,
  timestamp,
  date,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./index";

export const limitedDrop = pgTable("limited_drop", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantityTotal: integer("quantity_total").notNull(),
  quantityRemaining: integer("quantity_remaining").notNull(),
  releaseDate: timestamp("release_date").notNull(),
  endDate: timestamp("end_date"),
  active: boolean("active").default(true),
  soldOut: boolean("sold_out").default(false),
  vipEarlyAccess: boolean("vip_early_access").default(false),
  vipEarlyAccessDate: timestamp("vip_early_access_date"),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dropEntry = pgTable("drop_entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  dropId: uuid("drop_id")
    .notNull()
    .references(() => limitedDrop.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  quantity: integer("quantity").default(1),
  status: varchar("status", { length: 50 }).default("pending"), // pending, confirmed, cancelled
  enteredAt: timestamp("entered_at").defaultNow().notNull(),
});

export const dropWaitlist = pgTable("drop_waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  dropId: uuid("drop_id")
    .notNull()
    .references(() => limitedDrop.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  email: varchar("email", { length: 255 }).notNull(),
  notified: boolean("notified").default(false),
  addedToCart: boolean("added_to_cart").default(false),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const limitedDropRelations = relations(limitedDrop, ({ many }) => ({
  entries: many(dropEntry),
  waitlist: many(dropWaitlist),
}));

export const dropEntryRelations = relations(dropEntry, ({ one }) => ({
  drop: one(limitedDrop, {
    fields: [dropEntry.dropId],
    references: [limitedDrop.id],
  }),
  user: one(user, {
    fields: [dropEntry.userId],
    references: [user.id],
  }),
}));

export const dropWaitlistRelations = relations(dropWaitlist, ({ one }) => ({
  drop: one(limitedDrop, {
    fields: [dropWaitlist.dropId],
    references: [limitedDrop.id],
  }),
  user: one(user, {
    fields: [dropWaitlist.userId],
    references: [user.id],
  }),
}));
