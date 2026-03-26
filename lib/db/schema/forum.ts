// lib/db/schema/forum.ts
// Forum & Community Schema

import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./index";

// ============================================
// FORUM CATEGORIES
// ============================================

export const forumCategory = pgTable(
  "forum_category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    icon: varchar("icon", { length: 50 }), // Emoji or icon name
    order: integer("order").default(0),
    threadCount: integer("thread_count").default(0),
    postCount: integer("post_count").default(0),
    vipOnly: boolean("vip_only").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("forum_category_order_idx").on(table.order),
  }),
);

// ============================================
// FORUM THREADS
// ============================================

export const forumThread = pgTable(
  "forum_thread",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => forumCategory.id, {
      onDelete: "cascade",
    }),
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 500 }).notNull(),
    content: text("content").notNull(),
    viewCount: integer("view_count").default(0),
    replyCount: integer("reply_count").default(0),
    likeCount: integer("like_count").default(0),
    isPinned: boolean("is_pinned").default(false),
    isLocked: boolean("is_locked").default(false),
    isSolved: boolean("is_solved").default(false),
    tags: jsonb("tags").$type<string[]>(),
    lastActivityAt: timestamp("last_activity_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    categoryIdIdx: index("forum_thread_category_id_idx").on(table.categoryId),
    userIdIdx: index("forum_thread_user_id_idx").on(table.userId),
    pinnedIdx: index("forum_thread_pinned_idx").on(table.isPinned),
    lastActivityIdx: index("forum_thread_last_activity_idx").on(
      table.lastActivityAt,
    ),
  }),
);

// ============================================
// FORUM POSTS (Replies)
// ============================================

export const forumPost = pgTable(
  "forum_post",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    threadId: uuid("thread_id").references(() => forumThread.id, {
      onDelete: "cascade",
    }),
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    likeCount: integer("like_count").default(0),
    isAccepted: boolean("is_accepted").default(false), // For solved threads
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    threadIdIdx: index("forum_post_thread_id_idx").on(table.threadId),
    userIdIdx: index("forum_post_user_id_idx").on(table.userId),
    createdAtIdx: index("forum_post_created_at_idx").on(table.createdAt),
  }),
);

// ============================================
// USER PROFILES
// ============================================

export const userProfile = pgTable(
  "user_profile",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    username: varchar("username", { length: 100 }).notNull().unique(),
    bio: text("bio"),
    avatar: text("avatar"),
    location: varchar("location", { length: 255 }),
    website: text("website"),
    socialLinks: jsonb("social_links").$type<{
      twitter?: string;
      instagram?: string;
      facebook?: string;
    }>(),
    favoriteAlbum: varchar("favorite_album", { length: 255 }),
    favoriteSong: varchar("favorite_song", { length: 255 }),
    attendedConcerts: integer("attended_concerts").default(0),
    vipMember: boolean("vip_member").default(false),
    fanArtSubmissions: integer("fan_art_submissions").default(0),
    postCount: integer("post_count").default(0),
    threadCount: integer("thread_count").default(0),
    reputation: integer("reputation").default(0),
    badges: jsonb("badges").$type<
      {
        id: string;
        name: string;
        icon: string;
        earnedAt: string;
      }[]
    >(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("user_profile_user_id_idx").on(table.userId),
    usernameIdx: index("user_profile_username_idx").on(table.username),
    reputationIdx: index("user_profile_reputation_idx").on(table.reputation),
  }),
);

// ============================================
// FORUM LIKES
// ============================================

export const forumLike = pgTable(
  "forum_like",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    threadId: uuid("thread_id").references(() => forumThread.id, {
      onDelete: "cascade",
    }),
    postId: uuid("post_id").references(() => forumPost.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("forum_like_user_id_idx").on(table.userId),
    threadIdIdx: index("forum_like_thread_id_idx").on(table.threadId),
    postIdIdx: index("forum_like_post_id_idx").on(table.postId),
    uniqueThreadLike: index("forum_like_unique_thread_idx").on(
      table.userId,
      table.threadId,
    ),
    uniquePostLike: index("forum_like_unique_post_idx").on(
      table.userId,
      table.postId,
    ),
  }),
);

// ============================================
// RELATIONS
// ============================================

export const forumCategoryRelations = relations(forumCategory, ({ many }) => ({
  threads: many(forumThread),
}));

export const forumThreadRelations = relations(forumThread, ({ one, many }) => ({
  category: one(forumCategory, {
    fields: [forumThread.categoryId],
    references: [forumCategory.id],
  }),
  user: one(user, {
    fields: [forumThread.userId],
    references: [user.id],
  }),
  posts: many(forumPost),
  likes: many(forumLike),
}));

export const forumPostRelations = relations(forumPost, ({ one, many }) => ({
  thread: one(forumThread, {
    fields: [forumPost.threadId],
    references: [forumThread.id],
  }),
  user: one(user, {
    fields: [forumPost.userId],
    references: [user.id],
  }),
  likes: many(forumLike),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));

export const forumLikeRelations = relations(forumLike, ({ one }) => ({
  user: one(user, {
    fields: [forumLike.userId],
    references: [user.id],
  }),
  thread: one(forumThread, {
    fields: [forumLike.threadId],
    references: [forumThread.id],
  }),
  post: one(forumPost, {
    fields: [forumLike.postId],
    references: [forumPost.id],
  }),
}));
