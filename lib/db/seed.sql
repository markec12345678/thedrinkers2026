-- ============================================
-- THE DRINKERS - DATABASE SEED DATA
-- ============================================
-- To datoteko zaženi v Neon Dashboardu:
-- https://console.neon.tech
-- ============================================

-- ============================================
-- 1. MERCHANDISE PRODUCTS (5 products)
-- ============================================
INSERT INTO product (name, description, price, stock, images, category, sizes, colors, featured, active) VALUES
('The Drinkers - Pijemo Ga Radi T-Shirt', 'Uradna The Drinkers majica z legendarnim napisom "Pijemo Ga Radi". 100% bombaž, visoka kakovost.', 24.99, 100, '["https://thedrinkers.si/images/merch/tshirt-pijemo.jpg"]', 'tshirt', '["S", "M", "L", "XL", "XXL"]', '["black", "white"]', true, true),
('The Drinkers - Alkohol Idol Hoodie', 'Udoben hoodie z motivom Alkohol Idol. Toplo in stilsko oblačilo za prave fane.', 49.99, 50, '["https://thedrinkers.si/images/merch/alkohol-idol-hoodie.jpg"]', 'hoodie', '["M", "L", "XL", "XXL"]', '["black", "grey"]', true, true),
('The Drinkers - Pivski Vršček', 'Uradni pivski vršček The Drinkers. Popoln dodatek za vsakega pravega fana.', 14.99, 200, '["https://thedrinkers.si/images/merch/pivski-vrcek.jpg"]', 'cap', '["one-size"]', '["black", "blue"]', false, true),
('The Drinkers - Vinyl Album', 'Limited edition vinyl album z najboljšimi hiti. Zbirateljski predmet za prave ljubitelje.', 39.99, 25, '["https://thedrinkers.si/images/merch/vinyl-album.jpg"]', 'vinyl', '["standard"]', '["black"]', true, true),
('The Drinkers - Keramična Kruška', 'Kvalitetna keramična kruška z logotipom The Drinkers. Popolna za dom ali službo.', 12.99, 150, '["https://thedrinkers.si/images/merch/mug.jpg"]', 'mug', '["standard"]', '["white", "black"]', false, true);

-- ============================================
-- 2. ALBUMS (3 albums)
-- ============================================
INSERT INTO album (title, releaseDate, coverImage, description, label, genre, totalTracks, featured, active) VALUES
('Prohibicija', '2020-01-15', 'https://thedrinkers.si/images/albums/prohibicija.jpg', 'Legendarni album Prohibicija z največjimi hiti.', 'The Drinkers Records', 'Rock', 12, true, true),
('Pivolucija', '2018-06-20', 'https://thedrinkers.si/images/albums/pivolucija.jpg', 'Revolucionaren album posvečen pivu in dobri glasbi.', 'The Drinkers Records', 'Rock', 10, true, true),
('Žeja', '2015-03-10', 'https://thedrinkers.si/images/albums/zeja.jpg', 'Album Žeja - začetek naše glasbene poti.', 'The Drinkers Records', 'Rock', 8, false, true);

-- ============================================
-- 3. SONGS (10 songs)
-- ============================================
INSERT INTO song (albumId, title, duration, trackNumber, lyrics, featured, active) VALUES
((SELECT id FROM album WHERE title = 'Prohibicija'), 'Prohibicija', 245, 1, '...', true, true),
((SELECT id FROM album WHERE title = 'Prohibicija'), 'Pijemo Ga Radi', 198, 2, '...', true, true),
((SELECT id FROM album WHERE title = 'Prohibicija'), 'Alkohol Idol', 212, 3, '...', true, true),
((SELECT id FROM album WHERE title = 'Prohibicija'), 'Na Zdravje', 187, 4, '...', true, true),
((SELECT id FROM album WHERE title = 'Pivolucija'), 'Pivolucija', 234, 1, '...', true, true),
((SELECT id FROM album WHERE title = 'Pivolucija'), 'Pivo Je Krivo', 201, 2, '...', true, true),
((SELECT id FROM album WHERE title = 'Pivolucija'), 'Žejna Grla', 189, 3, '...', true, true),
((SELECT id FROM album WHERE title = 'Žeja'), 'Žeja', 223, 1, '...', true, true),
((SELECT id FROM album WHERE title = 'Žeja'), 'Dvižem Kozarec', 195, 2, '...', true, true),
((SELECT id FROM album WHERE title = 'Žeja'), 'Zadnja Runda', 267, 3, '...', true, true);

-- ============================================
-- 4. TOUR DATES (5 concerts)
-- ============================================
INSERT INTO tour_date (venue, city, country, date, time, ticketUrl, ticketPrice, status, capacity, soldTickets, featured) VALUES
('Cankarjev Dom', 'Ljubljana', 'Slovenija', '2026-06-15', '20:00', 'https://eventim.si/the-drinkers-ljubljana', 25.00, 'on_sale', 1500, 850, true),
('Gledališče Glej', 'Maribor', 'Slovenija', '2026-06-20', '21:00', 'https://eventim.si/the-drinkers-maribor', 22.00, 'on_sale', 800, 420, true),
('Kino Šiška', 'Koper', 'Slovenija', '2026-06-25', '20:30', 'https://eventim.si/the-drinkers-koper', 20.00, 'on_sale', 600, 380, false),
('Arena Stožice', 'Ljubljana', 'Slovenija', '2026-12-31', '22:00', 'https://eventim.si/the-drinkers-novo-leto', 35.00, 'announced', 5000, 0, true),
('Vienna Arena', 'Vienna', 'Austria', '2027-02-14', '19:00', 'https://oeticket.com/the-drinkers-vienna', 30.00, 'announced', 3000, 0, true);

-- ============================================
-- 5. FAN ART (10 submissions)
-- ============================================
-- NOTE: You'll need to replace 'USER_ID_HERE' with an actual user ID from your database
INSERT INTO fan_art (userId, imageUrl, title, description, approved, featured, likes) VALUES
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart1.jpg', 'The Drinkers Live', 'Moja ilustracija koncerta', true, true, 42),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart2.jpg', 'Pivo in Rock', 'Digitalna umetnost', true, false, 28),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart3.jpg', 'Alkohol Idol Fan Art', 'Risba mojega najljubšega hita', true, true, 56),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart4.jpg', 'Prohibicija Album Cover', 'Moja verzija album coverja', true, false, 33),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart5.jpg', 'The Drinkers Logo', 'Nov dizajn logotipa', false, false, 12),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart6.jpg', 'Koncertni Spomini', 'Fotografija s koncerta', true, false, 67),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart7.jpg', 'Pivolucija Plakat', 'Plakat za album Pivolucija', true, true, 89),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart8.jpg', 'Žeja Vinyl', 'Ilustracija vinyl albuma', true, false, 23),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart9.jpg', 'The Drinkers Band', 'Portret celotne zasedbe', true, true, 104),
('00000000-0000-0000-0000-000000000000', 'https://example.com/fanart10.jpg', 'Na Zdravje!', 'Umetniška interpretacija', false, false, 8);

-- ============================================
-- 6. VIP MEMBERSHIPS (3 tiers)
-- ============================================
-- NOTE: You'll need to replace 'USER_ID_HERE' with an actual user ID from your database
INSERT INTO vip_membership (userId, tier, status, startDate, expiresAt, benefits, stripeSubscriptionId) VALUES
('00000000-0000-0000-0000-000000000000', 'bronze', 'active', '2026-01-01', '2027-01-01', '["Early access to tickets", "10% merch discount", "Exclusive newsletter"]', 'sub_bronze_001'),
('00000000-0000-0000-0000-000000000000', 'silver', 'active', '2026-01-01', '2027-01-01', '["Early access to tickets", "15% merch discount", "Exclusive newsletter", "Meet & greet access", "Signed posters"]', 'sub_silver_001'),
('00000000-0000-0000-0000-000000000000', 'gold', 'active', '2026-01-01', '2027-01-01', '["Early access to tickets", "20% merch discount", "Exclusive newsletter", "Meet & greet access", "Signed albums", "Backstage access", "VIP lounge access"]', 'sub_gold_001');

-- ============================================
-- SUMMARY
-- ============================================
-- ✅ Products:        5
-- ✅ Albums:          3
-- ✅ Songs:          10
-- ✅ Tour Dates:      5
-- ✅ Fan Art:        10 (requires user ID)
-- ✅ VIP Memberships: 3 (requires user ID)
-- ============================================
-- 🎉 DATABASE SEED COMPLETE!
-- ============================================
