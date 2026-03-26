-- First Limited Drop Setup
-- Created: 2026-03-25
-- Description: Setup for the first limited edition drop

-- ============================================
-- STEP 1: Get Product UUID
-- ============================================
-- First, find a product to use for the drop
-- Run this query to get product UUIDs:

SELECT id, name, price, stock 
FROM product 
WHERE active = true 
ORDER BY created_at DESC 
LIMIT 10;

-- ============================================
-- STEP 2: Create First Drop
-- ============================================
-- Replace 'YOUR_PRODUCT_UUID_HERE' with actual product UUID from above

INSERT INTO limited_drop (
  name,
  description,
  product_id,
  quantity,
  quantity_remaining,
  price,
  original_price,
  start_date,
  end_date,
  vip_early_access,
  vip_early_access_hours,
  is_active,
  is_sold_out
) VALUES (
  'Tour 2026 Limited T-Shirt',
  'Exclusive limited edition t-shirt for The Drinkers Tour 2026. Features exclusive tour artwork on front and band logo on back. Only 100 available worldwide!',
  'YOUR_PRODUCT_UUID_HERE', -- Replace with actual UUID
  100,
  100,
  '25.00',
  '35.00',
  '2026-04-01 00:00:00', -- Start date (VIP early access)
  '2026-04-03 23:59:59', -- End date (48 hours)
  true, -- VIP early access enabled
  24, -- 24 hours early access for VIP
  true, -- Active
  false -- Not sold out
);

-- ============================================
-- STEP 3: Verify Drop Created
-- ============================================
-- Check if drop was created successfully

SELECT 
  id,
  name,
  quantity,
  quantity_remaining,
  price,
  original_price,
  start_date,
  end_date,
  vip_early_access,
  is_active,
  CASE 
    WHEN quantity_remaining = 0 THEN 'Sold Out'
    WHEN start_date > NOW() THEN 'Not Started'
    WHEN end_date < NOW() THEN 'Ended'
    ELSE 'Active'
  END as status
FROM limited_drop
ORDER BY created_at DESC
LIMIT 1;

-- ============================================
-- STEP 4: Add Product Images (Optional)
-- ============================================
-- Make sure product has images in /public/images/drops/
-- File should be named: {product_id}.jpg

-- Example folder structure:
-- /public/images/drops/
--   ├── prod_uuid_1.jpg
--   ├── prod_uuid_2.jpg
--   └── ...

-- ============================================
-- STEP 5: Test Drop API
-- ============================================
-- Test that the drop appears in API

-- Run: curl http://localhost:3000/api/drops/active
-- Expected: JSON response with the new drop

-- ============================================
-- NOTES:
-- ============================================
-- 1. Replace YOUR_PRODUCT_UUID_HERE with actual UUID
-- 2. Adjust dates as needed
-- 3. Make sure product exists and is active
-- 4. Add product images to /public/images/drops/
-- 5. Test in browser at /drops
-- 6. Test purchase flow
-- 7. Test waitlist functionality
