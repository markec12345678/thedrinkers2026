-- 🎸 THE DRINKERS - CLEAN SEED
-- Run this in Neon SQL Editor
-- 
-- This will DELETE existing data and insert fresh seed data
-- ✅ Safe to run multiple times

-- ============================================
-- 1. CLEAR EXISTING DATA
-- ============================================

-- Clear VIP tiers (will be re-added)
DELETE FROM vip_tier;

-- Clear fan art (will be re-added)
DELETE FROM fan_art;

-- Clear albums (will be re-added, cascades to songs)
DELETE FROM album;

-- Clear tour dates (will be re-added)
DELETE FROM tour_date;

-- Clear products (will be re-added)
DELETE FROM product;

-- Verify deletion
SELECT 'Cleared all tables' as status;

-- ============================================
-- 2. SEED PRODUCTS
-- ============================================
INSERT INTO product (name, description, price, compare_at_price, stock, sku, category, images, sizes, colors, featured, active)
VALUES 
  ('The Drinkers Classic T-Shirt', '100% bombažna majica z logotipom The Drinkers. Udobna in stilsko dovršena.', 29.99, 39.99, 150, 'TD-TSHIRT-001', 't-shirt', '["/images/merch/tshirt-front.jpg", "/images/merch/tshirt-back.jpg"]'::jsonb, '["S", "M", "L", "XL", "XXL"]'::jsonb, '["black", "white"]'::jsonb, true, true),
  ('The Drinkers Hoodie Black', 'Premium pulover s kapuco. Topel in udoben za vse letne čase.', 59.99, 79.99, 75, 'TD-HOODIE-001', 'hoodie', '["/images/merch/hoodie-front.jpg"]'::jsonb, '["S", "M", "L", "XL", "XXL"]'::jsonb, '["black", "grey"]'::jsonb, true, true),
  ('Tour 2026 Poster', 'Limitirana edicija tour posterja. Podpisano od banda.', 19.99, NULL, 200, 'TD-POSTER-2026', 'poster', '["/images/merch/poster-2026.jpg"]'::jsonb, NULL, NULL, true, true);

-- ============================================
-- 3. SEED TOUR DATES
-- ============================================
INSERT INTO tour_date (venue, city, country, date, time, doors, ticket_url, ticket_price, status, capacity, sold_tickets, featured, active)
VALUES 
  ('Orto Bar', 'Ljubljana', 'Slovenia', '2026-04-15', '21:00', '20:00', 'https://eventim.si/the-drinkers-ljubljana', 25.00, 'on_sale', 300, 187, true, true),
  ('Kino Šiška', 'Ljubljana', 'Slovenia', '2026-04-20', '20:00', '19:00', 'https://kinosiska.si/the-drinkers', 30.00, 'on_sale', 500, 342, true, true),
  ('O2 Academy', 'London', 'UK', '2026-08-01', '19:00', '18:00', 'https://o2academy.co.uk/the-drinkers', 40.00, 'announced', 1500, 0, true, true);

-- ============================================
-- 4. SEED ALBUMS
-- ============================================
INSERT INTO album (title, artist, release_date, cover_image, description, label, genre, total_tracks, featured, active)
VALUES 
  ('First Round', 'The Drinkers', '2020-03-15', '/images/albums/first-round.jpg', 'Debitantski album The Drinkers.', 'Independent', '["Rock", "Alternative"]'::jsonb, 7, true, true),
  ('Midnight Sessions', 'The Drinkers', '2022-06-20', '/images/albums/midnight-sessions.jpg', 'Drugi album. Temnejši zvok.', 'Independent', '["Rock", "Blues Rock"]'::jsonb, 6, true, true),
  ('Tour 2026', 'The Drinkers', '2026-03-01', '/images/albums/tour-2026.jpg', 'Najnovejši album.', 'Independent', '["Rock", "Alternative"]'::jsonb, 6, true, true);

-- ============================================
-- 5. SEED VIP TIERS (Standard 3 tiers)
-- ============================================
INSERT INTO vip_tier (name, display_name, price, price_yearly, benefits, discount_percentage, active)
VALUES 
  ('bronze', 'Bronze Member', 9.99, 99.99, '["Early access", "10% discount"]'::jsonb, 10, true),
  ('silver', 'Silver Member', 19.99, 199.99, '["Early access", "20% discount", "Meet & greet"]'::jsonb, 20, true),
  ('gold', 'Gold Member', 29.99, 299.99, '["All perks", "30% discount", "Backstage"]'::jsonb, 30, true);

-- ============================================
-- 6. SEED FAN ART
-- ============================================
INSERT INTO fan_art (image_url, thumbnail_url, title, description, approved, featured, likes)
VALUES 
  ('/images/fan-art/drawing-1.jpg', '/images/fan-art/thumbs/drawing-1.jpg', 'The Drinkers Live', 'Drawing from concert', true, true, 234),
  ('/images/fan-art/painting-1.jpg', '/images/fan-art/thumbs/painting-1.jpg', 'Band Portrait', 'Oil painting', true, true, 189);

-- ============================================
-- 7. VERIFICATION
-- ============================================
SELECT 'product' as table_name, COUNT(*) as count FROM product
UNION ALL
SELECT 'tour_date', COUNT(*) FROM tour_date
UNION ALL
SELECT 'album', COUNT(*) FROM album
UNION ALL
SELECT 'vip_tier', COUNT(*) FROM vip_tier
UNION ALL
SELECT 'fan_art', COUNT(*) FROM fan_art
ORDER BY table_name;

-- Expected output:
-- table_name  | count
-- ------------+-------
-- album       |   3
-- fan_art     |   2
-- product     |   3
-- tour_date   |   3
-- vip_tier    |   3
