-- ============================================
-- CREATE ALL TABLES IN thedrinkers SCHEMA
-- ============================================

SET search_path TO thedrinkers, public;

-- User table
CREATE TABLE IF NOT EXISTS thedrinkers."user" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "email_verified" boolean DEFAULT false,
  "image" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "membership_tier" varchar(50) DEFAULT 'free',
  "display_name" varchar(255)
);

-- Session
CREATE TABLE IF NOT EXISTS thedrinkers."session" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "expires_at" timestamp NOT NULL,
  "token" varchar(255) NOT NULL UNIQUE,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "ip_address" varchar(45),
  "user_agent" text
);

-- Account
CREATE TABLE IF NOT EXISTS thedrinkers."account" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "account_id" varchar(255) NOT NULL,
  "provider_id" varchar(255) NOT NULL,
  "access_token" text,
  "refresh_token" text,
  "id_token" text,
  "expires_at" timestamp,
  "password" varchar(255),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Verification
CREATE TABLE IF NOT EXISTS thedrinkers."verification" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "identifier" varchar(255) NOT NULL,
  "value" varchar(255) NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- MCP Server
CREATE TABLE IF NOT EXISTS thedrinkers."mcp_server" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(255) NOT NULL UNIQUE,
  "type" varchar(50) NOT NULL,
  "command" text,
  "args" jsonb,
  "env" jsonb,
  "enabled" boolean DEFAULT true,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Thread
CREATE TABLE IF NOT EXISTS thedrinkers."thread" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "title" varchar(255) NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Message
CREATE TABLE IF NOT EXISTS thedrinkers."message" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "thread_id" uuid NOT NULL REFERENCES thedrinkers."thread"("id") ON DELETE cascade,
  "role" varchar(50) NOT NULL,
  "content" text NOT NULL,
  "tool_calls" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Product
CREATE TABLE IF NOT EXISTS thedrinkers."product" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(255) NOT NULL,
  "description" text NOT NULL,
  "price" numeric(10, 2) NOT NULL,
  "compare_at_price" numeric(10, 2),
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

-- Order
CREATE TABLE IF NOT EXISTS thedrinkers."order" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "email" varchar(255) NOT NULL,
  "order_number" varchar(50) UNIQUE NOT NULL,
  "subtotal" numeric(10, 2) NOT NULL,
  "tax" numeric(10, 2) DEFAULT 0,
  "shipping" numeric(10, 2) DEFAULT 0,
  "total" numeric(10, 2) NOT NULL,
  "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
  "status" varchar(50) DEFAULT 'pending' NOT NULL,
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
  "discount_amount" numeric(10, 2),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "paid_at" timestamp,
  "shipped_at" timestamp,
  "delivered_at" timestamp,
  "cancelled_at" timestamp
);

-- Order Item
CREATE TABLE IF NOT EXISTS thedrinkers."order_item" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" uuid NOT NULL REFERENCES thedrinkers."order"("id") ON DELETE cascade,
  "product_id" uuid NOT NULL REFERENCES thedrinkers."product"("id") ON DELETE restrict,
  "quantity" integer NOT NULL,
  "price" numeric(10, 2) NOT NULL,
  "size" varchar(20),
  "color" varchar(50),
  "sku" varchar(100)
);

-- Tour Date
CREATE TABLE IF NOT EXISTS thedrinkers."tour_date" (
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
  "ticket_price" numeric(10, 2),
  "ticket_price_min" numeric(10, 2),
  "ticket_price_max" numeric(10, 2),
  "status" varchar(50) DEFAULT 'announced' NOT NULL,
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

-- Album
CREATE TABLE IF NOT EXISTS thedrinkers."album" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" varchar(255) NOT NULL,
  "artist" varchar(255),
  "artist_id" uuid REFERENCES thedrinkers."user"("id"),
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

-- Song
CREATE TABLE IF NOT EXISTS thedrinkers."song" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "album_id" uuid REFERENCES thedrinkers."album"("id") ON DELETE set null,
  "title" varchar(255) NOT NULL,
  "artist" varchar(255),
  "artist_id" uuid REFERENCES thedrinkers."user"("id"),
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

-- Fan Art
CREATE TABLE IF NOT EXISTS thedrinkers."fan_art" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
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
  "approved_by" uuid REFERENCES thedrinkers."user"("id")
);

-- Fan Art Like
CREATE TABLE IF NOT EXISTS thedrinkers."fan_art_like" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "fan_art_id" uuid NOT NULL REFERENCES thedrinkers."fan_art"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- VIP Membership
CREATE TABLE IF NOT EXISTS thedrinkers."vip_membership" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
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

-- VIP Tier
CREATE TABLE IF NOT EXISTS thedrinkers."vip_tier" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(50) NOT NULL UNIQUE,
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
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- User Reward
CREATE TABLE IF NOT EXISTS thedrinkers."user_reward" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
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

-- User Points
CREATE TABLE IF NOT EXISTS thedrinkers."user_points" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "points" integer DEFAULT 0 NOT NULL,
  "lifetime_points" integer DEFAULT 0,
  "last_updated" timestamp DEFAULT now() NOT NULL
);

-- Points Transaction
CREATE TABLE IF NOT EXISTS thedrinkers."points_transaction" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES thedrinkers."user"("id") ON DELETE cascade,
  "amount" integer NOT NULL,
  "type" varchar(50) NOT NULL,
  "description" text NOT NULL,
  "reference" varchar(255),
  "balance" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS thedrinkers."user_email_idx" ON thedrinkers."user"("email");
CREATE INDEX IF NOT EXISTS thedrinkers."session_user_id_idx" ON thedrinkers."session"("user_id");
CREATE INDEX IF NOT EXISTS thedrinkers."thread_user_id_idx" ON thedrinkers."thread"("user_id");
CREATE INDEX IF NOT EXISTS thedrinkers."message_thread_id_idx" ON thedrinkers."message"("thread_id");
CREATE INDEX IF NOT EXISTS thedrinkers."product_category_idx" ON thedrinkers."product"("category");
CREATE INDEX IF NOT EXISTS thedrinkers."product_featured_idx" ON thedrinkers."product"("featured");
CREATE INDEX IF NOT EXISTS thedrinkers."order_user_id_idx" ON thedrinkers."order"("user_id");
CREATE INDEX IF NOT EXISTS thedrinkers."order_status_idx" ON thedrinkers."order"("status");
CREATE INDEX IF NOT EXISTS thedrinkers."order_item_order_id_idx" ON thedrinkers."order_item"("order_id");
CREATE INDEX IF NOT EXISTS thedrinkers."tour_date_date_idx" ON thedrinkers."tour_date"("date");
CREATE INDEX IF NOT EXISTS thedrinkers."album_release_date_idx" ON thedrinkers."album"("release_date");
CREATE INDEX IF NOT EXISTS thedrinkers."song_album_id_idx" ON thedrinkers."song"("album_id");
CREATE INDEX IF NOT EXISTS thedrinkers."fan_art_user_id_idx" ON thedrinkers."fan_art"("user_id");
CREATE INDEX IF NOT EXISTS thedrinkers."fan_art_like_unique_idx" ON thedrinkers."fan_art_like"("fan_art_id", "user_id");
CREATE INDEX IF NOT EXISTS thedrinkers."vip_membership_user_id_idx" ON thedrinkers."vip_membership"("user_id");
CREATE INDEX IF NOT EXISTS thedrinkers."user_points_user_id_idx" ON thedrinkers."user_points"("user_id");

-- Seed VIP Tiers
INSERT INTO thedrinkers."vip_tier" ("name", "display_name", "description", "price", "price_yearly", "benefits", "discount_percentage", "early_access", "exclusive_content", "meet_and_greet", "priority", "active")
VALUES 
  ('bronze', 'Bronze Fan', 'Basic membership with exclusive content and 10% merch discount', '9.99', '99.99', '["Exclusive content access", "10% merch discount", "Early newsletter"]', 10, false, true, false, 1, true),
  ('silver', 'Silver Supporter', 'Enhanced benefits with early ticket access and 15% discount', '19.99', '199.99', '["Everything in Bronze", "Early ticket access (24h)", "15% merch discount", "Monthly behind-the-scenes"]', 15, true, true, false, 2, true),
  ('gold', 'Gold Member', 'Premium experience with meet & greet opportunities', '49.99', '499.99', '["Everything in Silver", "Meet & greet lottery entries", "20% merch discount", "VIP-only live streams", "Signed merchandise previews"]', 20, true, true, true, 3, true),
  ('platinum', 'Platinum VIP', 'Ultimate fan experience with lifetime benefits', '99.99', '999.99', '["Everything in Gold", "Guaranteed meet & greet (1x/year)", "25% merch discount", "Backstage access", "Free shipping worldwide", "Birthday surprise"]', 25, true, true, true, 4, true)
ON CONFLICT ("name") DO NOTHING;

-- Verification
SELECT 
  'Migration Complete!' as status,
  COUNT(*) as tables_count
FROM information_schema.tables 
WHERE table_schema = 'thedrinkers';
