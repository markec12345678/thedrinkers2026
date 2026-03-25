-- ============================================
-- VERIFIKACIJA BAZE PODATKOV
-- The Drinkers - Music Artist Platform
-- ============================================
-- Uporabi to skripto za preverjanje ustvarjenih tabel
-- Po uspešnem "npm run db:migrate" ali "npm run db:push"

-- ============================================
-- 1. PRIKAŽI VSE TABELE
-- ============================================
\dt

-- Pričakovani output (20 tabel):
-- ✅ user
-- ✅ session
-- ✅ account
-- ✅ verification
-- ✅ mcp_server
-- ✅ thread
-- ✅ message
-- ✅ product
-- ✅ order
-- ✅ order_item
-- ✅ tour_date
-- ✅ album
-- ✅ song
-- ✅ fan_art
-- ✅ fan_art_like
-- ✅ vip_membership
-- ✅ vip_tier
-- ✅ user_reward
-- ✅ user_points
-- ✅ points_transaction

-- ============================================
-- 2. PREVERI STRUKTURO TABELE
-- ============================================

-- Preveri user tabelo
\d user

-- Preveri product tabelo
\d product

-- Preveri order tabelo
\d order

-- Preveri vip_membership tabelo
\d vip_membership

-- ============================================
-- 3. PREVERI ŠTEVILO VRSTIC
-- ============================================

SELECT 
    'user' AS table_name, COUNT(*) AS row_count FROM "user"
UNION ALL
SELECT 'session', COUNT(*) FROM session
UNION ALL
SELECT 'account', COUNT(*) FROM account
UNION ALL
SELECT 'verification', COUNT(*) FROM verification
UNION ALL
SELECT 'mcp_server', COUNT(*) FROM mcp_server
UNION ALL
SELECT 'thread', COUNT(*) FROM thread
UNION ALL
SELECT 'message', COUNT(*) FROM message
UNION ALL
SELECT 'product', COUNT(*) FROM product
UNION ALL
SELECT 'order', COUNT(*) FROM "order"
UNION ALL
SELECT 'order_item', COUNT(*) FROM order_item
UNION ALL
SELECT 'tour_date', COUNT(*) FROM tour_date
UNION ALL
SELECT 'album', COUNT(*) FROM album
UNION ALL
SELECT 'song', COUNT(*) FROM song
UNION ALL
SELECT 'fan_art', COUNT(*) FROM fan_art
UNION ALL
SELECT 'fan_art_like', COUNT(*) FROM fan_art_like
UNION ALL
SELECT 'vip_membership', COUNT(*) FROM vip_membership
UNION ALL
SELECT 'vip_tier', COUNT(*) FROM vip_tier
UNION ALL
SELECT 'user_reward', COUNT(*) FROM user_reward
UNION ALL
SELECT 'user_points', COUNT(*) FROM user_points
UNION ALL
SELECT 'points_transaction', COUNT(*) FROM points_transaction
ORDER BY table_name;

-- ============================================
-- 4. PREVERI VIP TIERJE (SEED DATA)
-- ============================================

SELECT 
    name,
    display_name,
    price,
    price_yearly,
    discount_percentage,
    early_access,
    exclusive_content,
    meet_and_greet
FROM vip_tier
ORDER BY priority;

-- Pričakovani output (4 tierji):
-- | name       | display_name     | price | price_yearly | discount_percentage |
-- |------------|------------------|-------|--------------|---------------------|
-- | bronze     | Bronze Fan       | 9.99  | 99.99        | 10                  |
-- | silver     | Silver Supporter | 19.99 | 199.99       | 15                  |
-- | gold       | Gold Member      | 49.99 | 499.99       | 20                  |
-- | platinum   | Platinum VIP     | 99.99 | 999.99       | 25                  |

-- ============================================
-- 5. PREVERI INDEXE
-- ============================================

-- Prikaži vse indexe v shemi
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Pričakovano: 50+ indexov za performance

-- ============================================
-- 6. PREVERI FOREIGN KEYS
-- ============================================

SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    JOIN information_schema.referential_constraints AS rc
      ON rc.constraint_name = tc.constraint_name
      AND rc.constraint_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name;

-- Pričakovani foreign keys:
-- ✅ session.user_id → user.id (cascade)
-- ✅ account.user_id → user.id (cascade)
-- ✅ thread.user_id → user.id (cascade)
-- ✅ message.thread_id → thread.id (cascade)
-- ✅ order.user_id → user.id (cascade)
-- ✅ order_item.order_id → order.id (cascade)
-- ✅ order_item.product_id → product.id (restrict)
-- ✅ tour_date.date_idx → (index)
-- ✅ song.album_id → album.id (set null)
-- ✅ fan_art.user_id → user.id (cascade)
-- ✅ fan_art_like.fan_art_id → fan_art.id (cascade)
-- ✅ fan_art_like.user_id → user.id (cascade)
-- ✅ vip_membership.user_id → user.id (cascade)

-- ============================================
-- 7. PREVERI RELACIJE (Drizzle ORM)
-- ============================================

-- Preveri število produktov na kategorijo
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price::numeric) AS avg_price
FROM product
WHERE active = true
GROUP BY category
ORDER BY product_count DESC;

-- Preveri število tour dates po statusu
SELECT 
    status,
    COUNT(*) AS tour_count,
    SUM(COALESCE(sold_tickets, 0)) AS total_tickets_sold
FROM tour_date
GROUP BY status
ORDER BY tour_count DESC;

-- Preveri albume z številom songov
SELECT 
    a.title,
    a.release_date,
    COUNT(s.id) AS song_count,
    SUM(s.duration) AS total_duration_seconds
FROM album a
LEFT JOIN song s ON s.album_id = a.id
WHERE a.active = true
GROUP BY a.id, a.title, a.release_date
ORDER BY a.release_date DESC;

-- ============================================
-- 8. PREVERI UPORABNIŠKE TOČKE (LOYALTY)
-- ============================================

SELECT 
    u.email,
    up.points,
    up.lifetime_points,
    COUNT(pt.id) AS transaction_count
FROM "user" u
LEFT JOIN user_points up ON up.user_id = u.id
LEFT JOIN points_transaction pt ON pt.user_id = u.id
GROUP BY u.id, u.email, up.points, up.lifetime_points
ORDER BY up.lifetime_points DESC
LIMIT 10;

-- ============================================
-- 9. PREVERI VIP ČLANSTVA
-- ============================================

SELECT 
    v.tier,
    v.status,
    COUNT(*) AS member_count,
    AVG(v.discount_percentage) AS avg_discount
FROM vip_membership v
GROUP BY v.tier, v.status
ORDER BY member_count DESC;

-- ============================================
-- 10. PREVERI FAN ART GALLERY
-- ============================================

SELECT 
    COUNT(*) AS total_submissions,
    SUM(CASE WHEN approved = true THEN 1 ELSE 0 END) AS approved_count,
    SUM(CASE WHEN featured = true THEN 1 ELSE 0 END) AS featured_count,
    SUM(likes) AS total_likes,
    SUM(views) AS total_views
FROM fan_art;

-- ============================================
-- 11. PREVERI NEDAVNE MIGRACIJE
-- ============================================

-- Če uporabljaš drizzle-kit, preveri migration history
SELECT * FROM drizzle__migrations ORDER BY id DESC LIMIT 10;

-- ============================================
-- 12. PREVERI VELIKOST TABELE
-- ============================================

SELECT
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS data_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- ============================================
-- KOMANDNE SKRATKE
-- ============================================

-- \dt          - Prikaži vse tabele
-- \d tablename - Prikaži strukturo tabele
-- \di          - Prikaži vse indexe
-- \df          - Prikaži vse funkcije
-- \dv          - Prikaži vse view
-- \q           - Izhod iz psql

-- ============================================
-- PRIMERI UPORABE
-- ============================================

-- 1. Ustvari novega uporabnika
-- INSERT INTO "user" (name, email, membership_tier)
-- VALUES ('John Doe', 'john@example.com', 'free');

-- 2. Dodaj nov produkt
-- INSERT INTO product (name, description, price, stock, category, active)
-- VALUES ('Tour T-Shirt 2026', 'Official tour merchandise', 29.99, 100, 'tshirt', true);

-- 3. Dodaj tour date
-- INSERT INTO tour_date (venue, city, country, date, status, ticket_url)
-- VALUES ('Arena Stožice', 'Ljubljana', 'Slovenia', '2026-07-15', 'on_sale', 'https://tickets.example.com');

-- 4. Ustvari VIP membership
-- INSERT INTO vip_membership (user_id, tier, status, start_date, expires_at, discount_code)
-- VALUES ('user-uuid', 'gold', 'active', NOW(), NOW() + INTERVAL '1 year', 'GOLD2026');

-- ============================================
-- KONEC VERIFIKACIJE
-- ============================================
