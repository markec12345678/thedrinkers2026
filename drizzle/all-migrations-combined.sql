-- ============================================
-- COMBINED MIGRATION - ALL TABLES
-- The Drinkers - Music Artist Platform
-- ============================================
-- Execute in Neon SQL Editor: https://console.neon.tech/
-- Or via psql: psql "connection-string" -f all-migrations.sql

SET statement_timeout = 0;

-- ============================================
-- MIGRATION 0000: colorful_warbound
-- ============================================

CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"membership_tier" varchar(50) DEFAULT 'free',
	"display_name" varchar(255)
);

CREATE TABLE IF NOT EXISTS "mcp_server" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"command" text,
	"args" jsonb,
	"env" jsonb,
	"enabled" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mcp_server_name_unique" UNIQUE("name")
);

CREATE TABLE IF NOT EXISTS "thread" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" uuid NOT NULL REFERENCES "thread"("id") ON DELETE cascade,
	"role" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"tool_calls" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"images" jsonb,
	"category" varchar(100),
	"sizes" jsonb,
	"colors" jsonb,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"total" numeric(10, 2) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"shipping_address" jsonb,
	"billing_address" jsonb,
	"payment_intent_id" varchar(255),
	"tracking_number" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "order_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL REFERENCES "order"("id") ON DELETE cascade,
	"product_id" uuid NOT NULL REFERENCES "product"("id") ON DELETE restrict,
	"quantity" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"size" varchar(20),
	"color" varchar(50)
);

CREATE TABLE IF NOT EXISTS "tour_date" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"country" varchar(100) NOT NULL,
	"date" date NOT NULL,
	"time" time,
	"ticket_url" text,
	"ticket_price" numeric(10, 2),
	"status" varchar(50) DEFAULT 'announced' NOT NULL,
	"capacity" integer,
	"sold_tickets" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "album" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"release_date" date NOT NULL,
	"cover_image" text,
	"description" text,
	"label" varchar(255),
	"genre" varchar(100),
	"total_tracks" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "song" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" uuid REFERENCES "album"("id") ON DELETE set null,
	"title" varchar(255) NOT NULL,
	"duration" integer NOT NULL,
	"lyrics" text,
	"track_number" integer,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "fan_art" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"image_url" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"approved" boolean DEFAULT false,
	"featured" boolean DEFAULT false,
	"likes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "user_email_idx" ON "user"("email");
CREATE INDEX IF NOT EXISTS "thread_user_id_idx" ON "thread"("user_id");
CREATE INDEX IF NOT EXISTS "message_thread_id_idx" ON "message"("thread_id");
CREATE INDEX IF NOT EXISTS "product_category_idx" ON "product"("category");
CREATE INDEX IF NOT EXISTS "product_featured_idx" ON "product"("featured");
CREATE INDEX IF NOT EXISTS "order_user_id_idx" ON "order"("user_id");
CREATE INDEX IF NOT EXISTS "order_status_idx" ON "order"("status");
CREATE INDEX IF NOT EXISTS "order_item_order_id_idx" ON "order_item"("order_id");
CREATE INDEX IF NOT EXISTS "tour_date_date_idx" ON "tour_date"("date");
CREATE INDEX IF NOT EXISTS "tour_date_city_idx" ON "tour_date"("city");
CREATE INDEX IF NOT EXISTS "album_release_date_idx" ON "album"("release_date");
CREATE INDEX IF NOT EXISTS "song_album_id_idx" ON "song"("album_id");
CREATE INDEX IF NOT EXISTS "fan_art_user_id_idx" ON "fan_art"("user_id");

-- ============================================
-- MIGRATION 0001: elite_mojo
-- ============================================

CREATE TABLE IF NOT EXISTS "fan_art_like" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fan_art_id" uuid NOT NULL REFERENCES "fan_art"("id") ON DELETE cascade,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"points" integer DEFAULT 0 NOT NULL,
	"lifetime_points" integer DEFAULT 0,
	"last_updated" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_reward" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"type" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"value" numeric(10, 2),
	"metadata" jsonb,
	"earned_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"used_at" timestamp,
	"status" varchar(50) DEFAULT 'active' NOT NULL
);

CREATE TABLE IF NOT EXISTS "points_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"amount" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"reference" varchar(255),
	"balance" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "vip_tier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"display_name" varchar(100) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"price_yearly" numeric(10, 2),
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
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vip_tier_name_unique" UNIQUE("name")
);

CREATE TABLE IF NOT EXISTS "vip_membership" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "user"("id") ON DELETE cascade,
	"tier" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
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

-- Indexes for migration 0001
CREATE INDEX IF NOT EXISTS "fan_art_like_fan_art_id_idx" ON "fan_art_like"("fan_art_id");
CREATE INDEX IF NOT EXISTS "fan_art_like_user_id_idx" ON "fan_art_like"("user_id");
CREATE INDEX IF NOT EXISTS "fan_art_like_unique_idx" ON "fan_art_like"("fan_art_id", "user_id");
CREATE INDEX IF NOT EXISTS "user_points_user_id_idx" ON "user_points"("user_id");
CREATE INDEX IF NOT EXISTS "user_reward_user_id_idx" ON "user_reward"("user_id");
CREATE INDEX IF NOT EXISTS "points_transaction_user_id_idx" ON "points_transaction"("user_id");
CREATE INDEX IF NOT EXISTS "vip_membership_user_id_idx" ON "vip_membership"("user_id");
CREATE INDEX IF NOT EXISTS "vip_membership_tier_idx" ON "vip_membership"("tier");
CREATE INDEX IF NOT EXISTS "vip_membership_status_idx" ON "vip_membership"("status");
CREATE INDEX IF NOT EXISTS "vip_tier_name_idx" ON "vip_tier"("name");

-- ============================================
-- SEED DATA: VIP TIERS
-- ============================================

INSERT INTO "vip_tier" ("name", "display_name", "description", "price", "price_yearly", "benefits", "discount_percentage", "early_access", "exclusive_content", "meet_and_greet", "priority", "active")
VALUES 
  ('bronze', 'Bronze Fan', 'Basic membership with exclusive content and 10% merch discount', '9.99', '99.99', '["Exclusive content access", "10% merch discount", "Early newsletter"]', 10, false, true, false, 1, true),
  ('silver', 'Silver Supporter', 'Enhanced benefits with early ticket access and 15% discount', '19.99', '199.99', '["Everything in Bronze", "Early ticket access (24h)", "15% merch discount", "Monthly behind-the-scenes"]', 15, true, true, false, 2, true),
  ('gold', 'Gold Member', 'Premium experience with meet & greet opportunities', '49.99', '499.99', '["Everything in Silver", "Meet & greet lottery entries", "20% merch discount", "VIP-only live streams", "Signed merchandise previews"]', 20, true, true, true, 3, true),
  ('platinum', 'Platinum VIP', 'Ultimate fan experience with lifetime benefits', '99.99', '999.99', '["Everything in Gold", "Guaranteed meet & greet (1x/year)", "25% merch discount", "Backstage access", "Free shipping worldwide", "Birthday surprise"]', 25, true, true, true, 4, true)
ON CONFLICT ("name") DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  'Migration Complete!' as status,
  COUNT(*) as tables_created
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'user', 'mcp_server', 'thread', 'message',
    'product', 'order', 'order_item', 'tour_date',
    'album', 'song', 'fan_art', 'fan_art_like',
    'vip_membership', 'vip_tier', 'user_points',
    'user_reward', 'points_transaction'
  );
