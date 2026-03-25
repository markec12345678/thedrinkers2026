CREATE TABLE "fan_art_like" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fan_art_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE "user_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"lifetime_points" integer DEFAULT 0,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	"status" varchar(50) DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vip_tier" (
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
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "account_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "provider_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "password" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "album" ALTER COLUMN "genre" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "fan_art" ALTER COLUMN "approved" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "token" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "ip_address" SET DATA TYPE varchar(45);--> statement-breakpoint
ALTER TABLE "tour_date" ALTER COLUMN "country" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "membership_tier" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "membership_tier" SET DEFAULT 'free';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "display_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "identifier" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "value" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "artist" varchar(255);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "artist_id" uuid;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "cover_image_thumbnail" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "duration" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "tracks" jsonb;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "spotify_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "spotify_id" varchar(100);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "apple_music_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "apple_music_id" varchar(100);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "youtube_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "youtube_id" varchar(100);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "bandcamp_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "soundcloud_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "tidal_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "deezer_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "amazon_music_url" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "album_type" varchar(50) DEFAULT 'album';--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "upc" varchar(50);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "catalog_number" varchar(100);--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "copyright" text;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "producers" jsonb;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "engineers" jsonb;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "studios" jsonb;--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "thumbnail_url" text;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "medium" varchar(100);--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "views" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "tags" jsonb;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "nsfw" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "rejection_reason" text;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "moderator_notes" text;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "approved_at" timestamp;--> statement-breakpoint
ALTER TABLE "fan_art" ADD COLUMN "approved_by" uuid;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "order_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "subtotal" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "tax" numeric(10, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping" numeric(10, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "currency" varchar(3) DEFAULT 'EUR' NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payment_method" varchar(50);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payment_status" varchar(50) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_method" varchar(100);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "tracking_url" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "carrier" varchar(100);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "discount_code" varchar(50);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "discount_amount" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "paid_at" timestamp;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipped_at" timestamp;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "delivered_at" timestamp;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "cancelled_at" timestamp;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN "sku" varchar(100);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "compare_at_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "sku" varchar(100);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "artist" varchar(255);--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "artist_id" uuid;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "disc_number" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "isrc" varchar(50);--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "spotify_url" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "spotify_id" varchar(100);--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "apple_music_url" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "apple_music_id" varchar(100);--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "youtube_url" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "youtube_id" varchar(100);--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "soundcloud_url" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "bandcamp_url" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "tidal_url" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "audio_file" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "audio_file_preview" text;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "instrumental" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "explicit" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "bpm" integer;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "key" varchar(20);--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "play_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "writers" jsonb;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "producers" jsonb;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "tour_name" varchar(255);--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "state" varchar(100);--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "doors" time;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "ticket_url_local" text;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "ticket_price_min" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "ticket_price_max" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "support_acts" jsonb;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "age_restriction" varchar(50);--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "vip_available" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "vip_description" text;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "tour_date" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "cancelled_at" timestamp;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "paused_at" timestamp;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "resumed_at" timestamp;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "stripe_customer_id" varchar(255);--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "stripe_price_id" varchar(255);--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "discount_code" varchar(50);--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "discount_percentage" integer DEFAULT 10;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "early_access" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "exclusive_content" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "meet_and_greet" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "lifetime_access" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "vip_membership" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "fan_art_like" ADD CONSTRAINT "fan_art_like_fan_art_id_fan_art_id_fk" FOREIGN KEY ("fan_art_id") REFERENCES "public"."fan_art"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fan_art_like" ADD CONSTRAINT "fan_art_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "points_transaction" ADD CONSTRAINT "points_transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_points" ADD CONSTRAINT "user_points_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_reward" ADD CONSTRAINT "user_reward_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "fan_art_like_fan_art_id_idx" ON "fan_art_like" USING btree ("fan_art_id");--> statement-breakpoint
CREATE INDEX "fan_art_like_user_id_idx" ON "fan_art_like" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "fan_art_like_unique_idx" ON "fan_art_like" USING btree ("fan_art_id","user_id");--> statement-breakpoint
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_user_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fan_art" ADD CONSTRAINT "fan_art_approved_by_user_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "song" ADD CONSTRAINT "song_artist_id_user_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "album_type_idx" ON "album" USING btree ("album_type");--> statement-breakpoint
CREATE INDEX "album_artist_idx" ON "album" USING btree ("artist");--> statement-breakpoint
CREATE INDEX "fan_art_category_idx" ON "fan_art" USING btree ("category");--> statement-breakpoint
CREATE INDEX "order_order_number_idx" ON "order" USING btree ("order_number");--> statement-breakpoint
CREATE INDEX "order_payment_status_idx" ON "order" USING btree ("payment_status");--> statement-breakpoint
CREATE INDEX "product_price_idx" ON "product" USING btree ("price");--> statement-breakpoint
CREATE INDEX "song_active_idx" ON "song" USING btree ("active");--> statement-breakpoint
CREATE INDEX "song_artist_idx" ON "song" USING btree ("artist");--> statement-breakpoint
CREATE INDEX "tour_date_active_idx" ON "tour_date" USING btree ("active");--> statement-breakpoint
CREATE INDEX "user_membership_tier_idx" ON "user" USING btree ("membership_tier");--> statement-breakpoint
CREATE INDEX "vip_membership_discount_code_idx" ON "vip_membership" USING btree ("discount_code");--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_order_number_unique" UNIQUE("order_number");--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_sku_unique" UNIQUE("sku");--> statement-breakpoint
ALTER TABLE "vip_membership" ADD CONSTRAINT "vip_membership_discount_code_unique" UNIQUE("discount_code");