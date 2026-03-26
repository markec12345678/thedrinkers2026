-- Limited Edition Drops Schema
-- Created: 2026-03-25
-- Description: Database schema for limited edition merch drops

-- ============================================
-- LIMITED DROPS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS limited_drop (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  quantity_remaining INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  vip_early_access BOOLEAN DEFAULT false,
  vip_early_access_hours INTEGER,
  is_active BOOLEAN DEFAULT true,
  is_sold_out BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

-- ============================================
-- DROP ENTRIES TABLE (Purchases)
-- ============================================

CREATE TABLE IF NOT EXISTS drop_entry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id UUID REFERENCES limited_drop(id) ON DELETE CASCADE,
  user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
  purchased_at TIMESTAMP DEFAULT now(),
  quantity INTEGER DEFAULT 1
);

-- ============================================
-- DROP WAITLIST TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS drop_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id UUID REFERENCES limited_drop(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
  notified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_limited_drop_active ON limited_drop(is_active);
CREATE INDEX IF NOT EXISTS idx_limited_drop_dates ON limited_drop(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_limited_drop_product ON limited_drop(product_id);
CREATE INDEX IF NOT EXISTS idx_drop_entry_drop ON drop_entry(drop_id);
CREATE INDEX IF NOT EXISTS idx_drop_entry_user ON drop_entry(user_id);
CREATE INDEX IF NOT EXISTS idx_drop_waitlist_drop ON drop_waitlist(drop_id);
CREATE INDEX IF NOT EXISTS idx_drop_waitlist_email ON drop_waitlist(email);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE limited_drop IS 'Limited edition merch drops with time-limited availability';
COMMENT ON COLUMN limited_drop.vip_early_access IS 'Whether VIP members get early access';
COMMENT ON COLUMN limited_drop.vip_early_access_hours IS 'Hours of early access before public launch';
COMMENT ON TABLE drop_entry IS 'Records of purchases from limited drops';
COMMENT ON TABLE drop_waitlist IS 'Users waiting for sold-out drops';

-- ============================================
-- SAMPLE DATA (First Drop Example)
-- ============================================

-- Uncomment and update product_id to create your first drop:
/*
INSERT INTO limited_drop (
  name, description, product_id, quantity, quantity_remaining,
  price, original_price, start_date, end_date,
  vip_early_access, vip_early_access_hours
) VALUES (
  'Tour 2026 Limited T-Shirt',
  'Limited edition t-shirt for Tour 2026. Only 100 available!',
  'YOUR_PRODUCT_UUID_HERE', -- Replace with actual product UUID
  100,
  100,
  '25.00',
  '30.00',
  '2026-04-01 00:00:00',
  '2026-04-03 00:00:00',
  true,
  24
);
*/
