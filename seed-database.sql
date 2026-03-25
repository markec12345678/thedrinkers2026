-- The Drinkers Database Seed
-- Run this SQL directly in Neon SQL Editor or via psql

-- Clear existing data (optional)
-- DELETE FROM "Product";
-- DELETE FROM "TourDate";
-- DELETE FROM "Album";
-- DELETE FROM "VipTier";
-- DELETE FROM "FanArt";

-- ============================================
-- 1. PRODUCTS
-- ============================================
INSERT INTO "Product" ("name", "description", "price", "compare_at_price", "stock", "sku", "category", "images", "sizes", "colors", "featured", "active")
VALUES 
  ('The Drinkers Classic T-Shirt', '100% bombažna majica z logotipom The Drinkers. Udobna in stilsko dovršena.', 29.99, 39.99, 150, 'TD-TSHIRT-001', 't-shirt', ARRAY['/images/merch/tshirt-front.jpg', '/images/merch/tshirt-back.jpg'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['black', 'white'], true, true),
  ('The Drinkers Hoodie Black', 'Premium pulover s kapuco. Topel in udoben za vse letne čase.', 59.99, 79.99, 75, 'TD-HOODIE-001', 'hoodie', ARRAY['/images/merch/hoodie-front.jpg'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['black', 'grey'], true, true),
  ('Tour 2026 Poster', 'Limitirana edicija tour posterja. Podpisano od banda.', 19.99, NULL, 200, 'TD-POSTER-2026', 'poster', ARRAY['/images/merch/poster-2026.jpg'], NULL, NULL, true, true);

-- ============================================
-- 2. TOUR DATES
-- ============================================
INSERT INTO "TourDate" ("venue", "city", "country", "date", "time", "doors", "ticket_url", "ticket_price", "status", "capacity", "sold_tickets", "featured", "active")
VALUES 
  ('Orto Bar', 'Ljubljana', 'Slovenia', '2026-04-15', '21:00', '20:00', 'https://eventim.si/the-drinkers-ljubljana', 25.00, 'on_sale', 300, 187, true, true),
  ('Kino Šiška', 'Ljubljana', 'Slovenia', '2026-04-20', '20:00', '19:00', 'https://kinosiska.si/the-drinkers', 30.00, 'on_sale', 500, 342, true, true),
  ('O2 Academy', 'London', 'UK', '2026-08-01', '19:00', '18:00', 'https://o2academy.co.uk/the-drinkers', 40.00, 'announced', 1500, 0, true, true);

-- ============================================
-- 3. ALBUMS
-- ============================================
INSERT INTO "Album" ("title", "artist", "release_date", "cover_image", "description", "label", "genre", "total_tracks", "featured", "active")
VALUES 
  ('First Round', 'The Drinkers', '2020-03-15', '/images/albums/first-round.jpg', 'Debitantski album The Drinkers.', 'Independent', ARRAY['Rock', 'Alternative'], 7, true, true),
  ('Midnight Sessions', 'The Drinkers', '2022-06-20', '/images/albums/midnight-sessions.jpg', 'Drugi album. Temnejši zvok.', 'Independent', ARRAY['Rock', 'Blues Rock'], 6, true, true),
  ('Tour 2026', 'The Drinkers', '2026-03-01', '/images/albums/tour-2026.jpg', 'Najnovejši album.', 'Independent', ARRAY['Rock', 'Alternative'], 6, true, true);

-- ============================================
-- 4. VIP TIERS
-- ============================================
INSERT INTO "VipTier" ("name", "display_name", "price", "price_yearly", "benefits", "discount_percentage", "active")
VALUES 
  ('bronze', 'Bronze Member', 9.99, 99.99, ARRAY['Early access', '10% discount'], 10, true),
  ('silver', 'Silver Member', 19.99, 199.99, ARRAY['Early access', '20% discount', 'Meet & greet'], 20, true),
  ('gold', 'Gold Member', 29.99, 299.99, ARRAY['All perks', '30% discount', 'Backstage'], 30, true);

-- ============================================
-- 5. FAN ART
-- ============================================
INSERT INTO "FanArt" ("image_url", "thumbnail_url", "title", "description", "approved", "featured", "likes")
VALUES 
  ('/images/fan-art/drawing-1.jpg', '/images/fan-art/thumbs/drawing-1.jpg', 'The Drinkers Live', 'Drawing from concert', true, true, 234),
  ('/images/fan-art/painting-1.jpg', '/images/fan-art/thumbs/painting-1.jpg', 'Band Portrait', 'Oil painting', true, true, 189);

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Products' as table_name, COUNT(*) as count FROM "Product"
UNION ALL
SELECT 'Tour Dates', COUNT(*) FROM "TourDate"
UNION ALL
SELECT 'Albums', COUNT(*) FROM "Album"
UNION ALL
SELECT 'VIP Tiers', COUNT(*) FROM "VipTier"
UNION ALL
SELECT 'Fan Art', COUNT(*) FROM "FanArt";
