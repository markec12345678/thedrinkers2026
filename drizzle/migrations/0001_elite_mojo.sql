-- Migration: 0001_add_music_merchant_features.sql
-- Description: Add complete music artist platform features - merch store, tour dates, music catalog, community, VIP memberships
-- Created: 2026-03-25

-- ============================================
-- 🛍️ MERCH STORE TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "product" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(255) NOT NULL,
  "description" text NOT NULL,
  "price" decimal(10, 2) NOT NULL,
  "compare_at_price" decimal(10, 2),
  "stock" integer DEFAULT 0 NOT NULL,
  "sku" varchar(100) UNIQUE,
  "category" varchar(100),
  "images" jsonb,
  "sizes" jsonb,
  "colors" jsonb,
  "featured" boolean DEFAULT false,
  "active" boolean DEFAULT true,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "order" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "email" varchar(255) NOT NULL,
  "order_number" varchar(50) UNIQUE NOT NULL,
  "subtotal" decimal(10, 2) NOT NULL,
  "tax" decimal(10, 2) DEFAULT '0',
  "shipping" decimal(10, 2) DEFAULT '0',
  "total" decimal(10, 2) NOT NULL,
  "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
  "status" varchar(50) NOT NULL DEFAULT 'pending',
  "payment_intent_id" varchar(255),
  "payment_method" varchar(50),
  "payment_status" varchar(50) DEFAULT 'pending',
  "shipping_address" jsonb,
  "billing_address" jsonb,
  "shipping_method" varchar(100),
  "tracking_number" varchar(255),
  "tracking_url" text,
  "carrier" varchar(100),
  "notes" text,
  "discount_code" varchar(50),
  "discount_amount" decimal(10, 2),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "paid_at" timestamp,
  "shipped_at" timestamp,
  "delivered_at" timestamp,
  "cancelled_at" timestamp
);

CREATE TABLE IF NOT EXISTS "order_item" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" uuid NOT NULL REFERENCES "order"("id") ON DELETE cascade,
  "product_id" uuid NOT NULL REFERENCES "product"("id") ON DELETE restrict,
  "quantity" integer NOT NULL,
  "price" decimal(10, 2) NOT NULL,
  "size" varchar(20),
  "color" varchar(50),
  "sku" varchar(100)
);

-- ============================================
-- 🎵 TOUR DATES TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "tour_date" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "tour_name" varchar(255),
  "venue" varchar(255) NOT NULL,
  "city" varchar(255) NOT NULL,
  "state" varchar(100),
  "country" varchar(100) NOT NULL,
  "date" date NOT NULL,
  "time" time,
  "doors" time,
  "ticket_url" text,
  "ticket_url_local" text,
  "ticket_price" decimal(10, 2),
  "ticket_price_min" decimal(10, 2),
  "ticket_price_max" decimal(10, 2),
  "status" varchar(50) NOT NULL DEFAULT 'announced',
  "capacity" integer,
  "sold_tickets" integer DEFAULT 0,
  "support_acts" jsonb,
  "age_restriction" varchar(50),
  "vip_available" boolean DEFAULT false,
  "vip_description" text,
  "featured" boolean DEFAULT false,
  "active" boolean DEFAULT true,
  "notes" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ============================================
-- 💿 MUSIC CATALOG TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "album" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" varchar(255) NOT NULL,
  "artist" varchar(255),
  "artist_id" uuid REFERENCES "user"("id"),
  "release_date" date NOT NULL,
  "cover_image" text,
  "cover_image_thumbnail" text,
  "description" text,
  "label" varchar(255),
  "genre" jsonb,
  "total_tracks" integer DEFAULT 0,
  "duration" integer DEFAULT 0,
  "tracks" jsonb,
  "spotify_url" text,
  "spotify_id" varchar(100),
  "apple_music_url" text,
  "apple_music_id" varchar(100),
  "youtube_url" text,
  "youtube_id" varchar(100),
  "bandcamp_url" text,
  "soundcloud_url" text,
  "tidal_url" text,
  "deezer_url" text,
  "amazon_music_url" text,
  "featured" boolean DEFAULT false,
  "active" boolean DEFAULT true,
  "album_type" varchar(50) DEFAULT 'album',
  "upc" varchar(50),
  "catalog_number" varchar(100),
  "copyright" text,
  "producers" jsonb,
  "engineers" jsonb,
  "studios" jsonb,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "song" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "album_id" uuid REFERENCES "album"("id") ON DELETE set null,
  "title" varchar(255) NOT NULL,
  "artist" varchar(255),
  "artist_id" uuid REFERENCES "user"("id"),
  "duration" integer NOT NULL,
  "lyrics" text,
  "track_number" integer,
  "disc_number" integer DEFAULT 1,
  "isrc" varchar(50),
  "spotify_url" text,
  "spotify_id" varchar(100),
  "apple_music_url" text,
  "apple_music_id" varchar(100),
  "youtube_url" text,
  "youtube_id" varchar(100),
  "soundcloud_url" text,
  "bandcamp_url" text,
  "tidal_url" text,
  "audio_file" text,
  "audio_file_preview" text,
  "instrumental" boolean DEFAULT false,
  "explicit" boolean DEFAULT false,
  "bpm" integer,
  "key" varchar(20),
  "featured" boolean DEFAULT false,
  "active" boolean DEFAULT true,
  "play_count" integer DEFAULT 0,
  "writers" jsonb,
  "producers" jsonb,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ============================================
-- 🎨 FAN ART & COMMUNITY TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "fan_art" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "email" varchar(255),
  "image_url" text NOT NULL,
  "thumbnail_url" text,
  "title" varchar(255) NOT NULL,
  "description" text,
  "medium" varchar(100),
  "category" varchar(100),
  "approved" boolean DEFAULT false NOT NULL,
  "featured" boolean DEFAULT false,
  "likes" integer DEFAULT 0,
  "views" integer DEFAULT 0,
  "tags" jsonb,
  "nsfw" boolean DEFAULT false,
  "rejection_reason" text,
  "moderator_notes" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "approved_at" timestamp,
  "approved_by" uuid REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "fan_art_like" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "fan_art_id" uuid NOT NULL REFERENCES "fan_art"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- ============================================
-- 👑 VIP MEMBERSHIP TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "vip_membership" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "tier" varchar(50) NOT NULL,
  "status" varchar(50) NOT NULL DEFAULT 'active',
  "start_date" date NOT NULL,
  "expires_at" date NOT NULL,
  "cancelled_at" timestamp,
  "paused_at" timestamp,
  "resumed_at" timestamp,
  "stripe_customer_id" varchar(255),
  "stripe_subscription_id" varchar(255),
  "stripe_price_id" varchar(255),
  "benefits" jsonb,
  "discount_code" varchar(50) UNIQUE,
  "discount_percentage" integer DEFAULT 10,
  "early_access" boolean DEFAULT false,
  "exclusive_content" boolean DEFAULT false,
  "meet_and_greet" boolean DEFAULT false,
  "lifetime_access" boolean DEFAULT false,
  "notes" text,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "vip_tier" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(50) NOT NULL UNIQUE,
  "display_name" varchar(100) NOT NULL,
  "description" text,
  "price" decimal(10, 2) NOT NULL,
  "price_yearly" decimal(10, 2),
  "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
  "benefits" jsonb,
  "discount_percentage" integer DEFAULT 0,
  "early_access" boolean DEFAULT false,
  "exclusive_content" boolean DEFAULT false,
  "meet_and_greet" boolean DEFAULT false,
  "lifetime_access" boolean DEFAULT false,
  "max_discounts" integer,
  "active" boolean DEFAULT true,
  "priority" integer DEFAULT 0,
  "stripe_price_id" varchar(255),
  "stripe_price_id_yearly" varchar(255),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ============================================
-- 🎁 REWARDS & LOYALTY TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "user_reward" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "type" varchar(50) NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text,
  "value" decimal(10, 2),
  "metadata" jsonb,
  "earned_at" timestamp DEFAULT now() NOT NULL,
  "expires_at" timestamp,
  "used_at" timestamp,
  "status" varchar(50) NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS "user_points" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "points" integer DEFAULT 0 NOT NULL,
  "lifetime_points" integer DEFAULT 0,
  "last_updated" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "points_transaction" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "amount" integer NOT NULL,
  "type" varchar(50) NOT NULL,
  "description" text NOT NULL,
  "reference" varchar(255),
  "balance" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Product indexes
CREATE INDEX IF NOT EXISTS "product_category_idx" ON "product"("category");
CREATE INDEX IF NOT EXISTS "product_featured_idx" ON "product"("featured");
CREATE INDEX IF NOT EXISTS "product_active_idx" ON "product"("active");
CREATE INDEX IF NOT EXISTS "product_price_idx" ON "product"("price");

-- Order indexes
CREATE INDEX IF NOT EXISTS "order_user_id_idx" ON "order"("user_id");
CREATE INDEX IF NOT EXISTS "order_status_idx" ON "order"("status");
CREATE INDEX IF NOT EXISTS "order_order_number_idx" ON "order"("order_number");
CREATE INDEX IF NOT EXISTS "order_created_at_idx" ON "order"("created_at");
CREATE INDEX IF NOT EXISTS "order_payment_status_idx" ON "order"("payment_status");

-- Order item indexes
CREATE INDEX IF NOT EXISTS "order_item_order_id_idx" ON "order_item"("order_id");
CREATE INDEX IF NOT EXISTS "order_item_product_id_idx" ON "order_item"("product_id");

-- Tour date indexes
CREATE INDEX IF NOT EXISTS "tour_date_date_idx" ON "tour_date"("date");
CREATE INDEX IF NOT EXISTS "tour_date_city_idx" ON "tour_date"("city");
CREATE INDEX IF NOT EXISTS "tour_date_country_idx" ON "tour_date"("country");
CREATE INDEX IF NOT EXISTS "tour_date_status_idx" ON "tour_date"("status");
CREATE INDEX IF NOT EXISTS "tour_date_featured_idx" ON "tour_date"("featured");
CREATE INDEX IF NOT EXISTS "tour_date_active_idx" ON "tour_date"("active");

-- Album indexes
CREATE INDEX IF NOT EXISTS "album_release_date_idx" ON "album"("release_date");
CREATE INDEX IF NOT EXISTS "album_featured_idx" ON "album"("featured");
CREATE INDEX IF NOT EXISTS "album_active_idx" ON "album"("active");
CREATE INDEX IF NOT EXISTS "album_type_idx" ON "album"("album_type");
CREATE INDEX IF NOT EXISTS "album_artist_idx" ON "album"("artist");

-- Song indexes
CREATE INDEX IF NOT EXISTS "song_album_id_idx" ON "song"("album_id");
CREATE INDEX IF NOT EXISTS "song_track_number_idx" ON "song"("track_number");
CREATE INDEX IF NOT EXISTS "song_featured_idx" ON "song"("featured");
CREATE INDEX IF NOT EXISTS "song_active_idx" ON "song"("active");
CREATE INDEX IF NOT EXISTS "song_artist_idx" ON "song"("artist");

-- Fan art indexes
CREATE INDEX IF NOT EXISTS "fan_art_user_id_idx" ON "fan_art"("user_id");
CREATE INDEX IF NOT EXISTS "fan_art_approved_idx" ON "fan_art"("approved");
CREATE INDEX IF NOT EXISTS "fan_art_featured_idx" ON "fan_art"("featured");
CREATE INDEX IF NOT EXISTS "fan_art_created_at_idx" ON "fan_art"("created_at");
CREATE INDEX IF NOT EXISTS "fan_art_category_idx" ON "fan_art"("category");

-- Fan art like indexes
CREATE INDEX IF NOT EXISTS "fan_art_like_fan_art_id_idx" ON "fan_art_like"("fan_art_id");
CREATE INDEX IF NOT EXISTS "fan_art_like_user_id_idx" ON "fan_art_like"("user_id");
CREATE INDEX IF NOT EXISTS "fan_art_like_unique_idx" ON "fan_art_like"("fan_art_id", "user_id");

-- VIP membership indexes
CREATE INDEX IF NOT EXISTS "vip_membership_user_id_idx" ON "vip_membership"("user_id");
CREATE INDEX IF NOT EXISTS "vip_membership_tier_idx" ON "vip_membership"("tier");
CREATE INDEX IF NOT EXISTS "vip_membership_status_idx" ON "vip_membership"("status");
CREATE INDEX IF NOT EXISTS "vip_membership_expires_at_idx" ON "vip_membership"("expires_at");
CREATE INDEX IF NOT EXISTS "vip_membership_discount_code_idx" ON "vip_membership"("discount_code");

-- User membership tier index (for better auth user table)
CREATE INDEX IF NOT EXISTS "user_membership_tier_idx" ON "user"("membership_tier");

-- ============================================
-- SEED DATA: DEFAULT VIP TIERS
-- ============================================

INSERT INTO "vip_tier" ("name", "display_name", "description", "price", "price_yearly", "benefits", "discount_percentage", "early_access", "exclusive_content", "meet_and_greet", "priority", "active")
VALUES 
  ('bronze', 'Bronze Fan', 'Basic membership with exclusive content and 10% merch discount', '9.99', '99.99', '["Exclusive content access", "10% merch discount", "Early newsletter"]', 10, false, true, false, 1, true),
  ('silver', 'Silver Supporter', 'Enhanced benefits with early ticket access and 15% discount', '19.99', '199.99', '["Everything in Bronze", "Early ticket access (24h)", "15% merch discount", "Monthly behind-the-scenes"]', 15, true, true, false, 2, true),
  ('gold', 'Gold Member', 'Premium experience with meet & greet opportunities', '49.99', '499.99', '["Everything in Silver", "Meet & greet lottery entries", "20% merch discount", "VIP-only live streams", "Signed merchandise previews"]', 20, true, true, true, 3, true),
  ('platinum', 'Platinum VIP', 'Ultimate fan experience with lifetime benefits', '99.99', '999.99', '["Everything in Gold", "Guaranteed meet & greet (1x/year)", "25% merch discount", "Backstage access", "Free shipping worldwide", "Birthday surprise"]', 25, true, true, true, 4, true)
ON CONFLICT ("name") DO NOTHING;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE "product" IS 'Merchandise products (t-shirts, hoodies, posters, vinyl, etc.)';
COMMENT ON TABLE "order" IS 'Customer orders with payment and shipping information';
COMMENT ON TABLE "order_item" IS 'Individual items within an order';
COMMENT ON TABLE "tour_date" IS 'Concert and tour dates with venue and ticket information';
COMMENT ON TABLE "album" IS 'Music albums with streaming links and metadata';
COMMENT ON TABLE "song" IS 'Individual songs with lyrics and streaming links';
COMMENT ON TABLE "fan_art" IS 'Fan-created artwork submissions for community gallery';
COMMENT ON TABLE "fan_art_like" IS 'User likes on fan art (prevents duplicate likes)';
COMMENT ON TABLE "vip_membership" IS 'VIP subscription memberships with tier benefits';
COMMENT ON TABLE "vip_tier" IS 'Configurable VIP membership tiers and pricing';
COMMENT ON TABLE "user_reward" IS 'User rewards earned through engagement';
COMMENT ON TABLE "user_points" IS 'User loyalty points balance';
COMMENT ON TABLE "points_transaction" IS 'Points earning and spending transaction history';
