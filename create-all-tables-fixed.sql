-- Manually create missing tables with lowercase names
-- Run this to fix the table naming issue

-- Drop uppercase tables if they exist
DROP TABLE IF EXISTS "Account" CASCADE;
DROP TABLE IF EXISTS "Session" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Verification" CASCADE;
DROP TABLE IF EXISTS "Mcp_server" CASCADE;
DROP TABLE IF EXISTS "Thread" CASCADE;
DROP TABLE IF EXISTS "Message" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "Order_item" CASCADE;
DROP TABLE IF EXISTS "Tour_date" CASCADE;
DROP TABLE IF EXISTS "Album" CASCADE;
DROP TABLE IF EXISTS "Song" CASCADE;
DROP TABLE IF EXISTS "Fan_art" CASCADE;
DROP TABLE IF EXISTS "Fan_art_like" CASCADE;
DROP TABLE IF EXISTS "Vip_membership" CASCADE;
DROP TABLE IF EXISTS "User_reward" CASCADE;
DROP TABLE IF EXISTS "User_points" CASCADE;
DROP TABLE IF EXISTS "Points_transaction" CASCADE;

-- Now create tables with proper lowercase names (from migration)
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"expires_at" timestamp,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);

CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"membership_tier" text DEFAULT 'free',
	"display_name" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);

CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "mcp_server" (
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

CREATE TABLE "thread" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" uuid NOT NULL,
	"role" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"tool_calls" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"compare_at_price" numeric(10, 2),
	"stock" integer DEFAULT 0 NOT NULL,
	"sku" varchar(100),
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

CREATE TABLE "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"order_number" varchar(50),
	"subtotal" numeric(10, 2) NOT NULL,
	"tax" numeric(10, 2) DEFAULT 0,
	"shipping" numeric(10, 2) DEFAULT 0,
	"total" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'EUR',
	"status" varchar(50) DEFAULT 'pending',
	"payment_intent_id" varchar(255),
	"payment_method" varchar(50),
	"payment_status" varchar(50) DEFAULT 'pending',
	"shipping_address" jsonb,
	"billing_address" jsonb,
	"shipping_method" varchar(100),
	"tracking_number" varchar(255),
	"tracking_url" text,
	"carrier" varchar(100),
	"discount_code" varchar(50),
	"discount_amount" numeric(10, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp,
	"shipped_at" timestamp,
	"delivered_at" timestamp,
	"cancelled_at" timestamp
);

CREATE TABLE "order_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"size" varchar(20),
	"color" varchar(50),
	"sku" varchar(100)
);

CREATE TABLE "tour_date" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"status" varchar(50) DEFAULT 'announced',
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

CREATE TABLE "album" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"artist" varchar(255),
	"artist_id" uuid,
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

CREATE TABLE "song" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" uuid,
	"title" varchar(255) NOT NULL,
	"artist" varchar(255),
	"artist_id" uuid,
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

CREATE TABLE "fan_art" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
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
	"approved_by" uuid
);

CREATE TABLE "fan_art_like" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fan_art_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "vip_membership" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tier" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'active',
	"start_date" date NOT NULL,
	"expires_at" date NOT NULL,
	"cancelled_at" timestamp,
	"paused_at" timestamp,
	"resumed_at" timestamp,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"stripe_price_id" varchar(255),
	"benefits" jsonb,
	"discount_code" varchar(50),
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

CREATE TABLE "user_reward" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"value" numeric(10, 2),
	"metadata" jsonb,
	"earned_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"used_at" timestamp,
	"status" varchar(50) DEFAULT 'active'
);

CREATE TABLE "user_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"lifetime_points" integer DEFAULT 0,
	"last_updated" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "points_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"reference" varchar(255),
	"balance" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign keys
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "thread" ADD CONSTRAINT "thread_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "message" ADD CONSTRAINT "message_thread_id_thread_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."thread"("id") ON DELETE cascade;
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE cascade;
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE restrict;
ALTER TABLE "song" ADD CONSTRAINT "song_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."album"("id") ON DELETE set null;
ALTER TABLE "fan_art" ADD CONSTRAINT "fan_art_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "fan_art_like" ADD CONSTRAINT "fan_art_like_fan_art_id_fan_art_fk" FOREIGN KEY ("fan_art_id") REFERENCES "public"."fan_art"("id") ON DELETE cascade;
ALTER TABLE "fan_art_like" ADD CONSTRAINT "fan_art_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "vip_membership" ADD CONSTRAINT "vip_membership_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "user_reward" ADD CONSTRAINT "user_reward_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "user_points" ADD CONSTRAINT "user_points_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
ALTER TABLE "points_transaction" ADD CONSTRAINT "points_transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;

-- Add indexes
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");
CREATE INDEX "user_membership_tier_idx" ON "user" USING btree ("membership_tier");
CREATE INDEX "product_category_idx" ON "product" USING btree ("category");
CREATE INDEX "product_featured_idx" ON "product" USING btree ("featured");
CREATE INDEX "product_active_idx" ON "product" USING btree ("active");
CREATE INDEX "order_user_id_idx" ON "order" USING btree ("user_id");
CREATE INDEX "order_status_idx" ON "order" USING btree ("status");
CREATE INDEX "order_created_at_idx" ON "order" USING btree ("created_at");
CREATE INDEX "tour_date_date_idx" ON "tour_date" USING btree ("date");
CREATE INDEX "tour_date_city_idx" ON "tour_date" USING btree ("city");
CREATE INDEX "tour_date_country_idx" ON "tour_date" USING btree ("country");
CREATE INDEX "tour_date_status_idx" ON "tour_date" USING btree ("status");
CREATE INDEX "tour_date_featured_idx" ON "tour_date" USING btree ("featured");
CREATE INDEX "tour_date_active_idx" ON "tour_date" USING btree ("active");
CREATE INDEX "album_release_date_idx" ON "album" USING btree ("release_date");
CREATE INDEX "album_featured_idx" ON "album" USING btree ("featured");
CREATE INDEX "album_active_idx" ON "album" USING btree ("active");
CREATE INDEX "song_album_id_idx" ON "song" USING btree ("album_id");
CREATE INDEX "song_track_number_idx" ON "song" USING btree ("track_number");
CREATE INDEX "song_featured_idx" ON "song" USING btree ("featured");
CREATE INDEX "fan_art_user_id_idx" ON "fan_art" USING btree ("user_id");
CREATE INDEX "fan_art_approved_idx" ON "fan_art" USING btree ("approved");
CREATE INDEX "fan_art_featured_idx" ON "fan_art" USING btree ("featured");
CREATE INDEX "fan_art_created_at_idx" ON "fan_art" USING btree ("created_at");
CREATE INDEX "fan_art_category_idx" ON "fan_art" USING btree ("category");
CREATE INDEX "fan_art_like_fan_art_id_idx" ON "fan_art_like" USING btree ("fan_art_id");
CREATE INDEX "fan_art_like_user_id_idx" ON "fan_art_like" USING btree ("user_id");
CREATE INDEX "fan_art_like_unique_idx" ON "fan_art_like" USING btree ("fan_art_id", "user_id");
CREATE INDEX "vip_membership_user_id_idx" ON "vip_membership" USING btree ("user_id");
CREATE INDEX "vip_membership_tier_idx" ON "vip_membership" USING btree ("tier");
CREATE INDEX "vip_membership_status_idx" ON "vip_membership" USING btree ("status");
CREATE INDEX "vip_membership_expires_at_idx" ON "vip_membership" USING btree ("expires_at");
CREATE INDEX "vip_membership_discount_code_idx" ON "vip_membership" USING btree ("discount_code");
CREATE INDEX "user_reward_user_id_idx" ON "user_reward" USING btree ("user_id");
CREATE INDEX "user_points_user_id_idx" ON "user_points" USING btree ("user_id");
CREATE INDEX "points_transaction_user_id_idx" ON "points_transaction" USING btree ("user_id");
