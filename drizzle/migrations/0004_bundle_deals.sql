-- Bundle Deals Schema
-- Created: 2026-03-25
-- Description: Database schema for merch + music bundles

-- ============================================
-- BUNDLES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS bundle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  items JSONB NOT NULL, -- Array of { productId, quantity }
  bundle_price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2),
  savings_percent INTEGER,
  quantity INTEGER DEFAULT -1, -- -1 = unlimited
  quantity_remaining INTEGER,
  is_active BOOLEAN DEFAULT true,
  is_limited BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

-- ============================================
-- BUNDLE PURCHASES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS bundle_purchase (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id UUID REFERENCES bundle(id) ON DELETE SET NULL,
  user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
  order_id UUID REFERENCES "order"(id) ON DELETE SET NULL,
  purchased_at TIMESTAMP DEFAULT now(),
  items_received JSONB -- Track which items were fulfilled
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_bundle_active ON bundle(is_active);
CREATE INDEX IF NOT EXISTS idx_bundle_limited ON bundle(is_limited);
CREATE INDEX IF NOT EXISTS idx_bundle_purchase_bundle ON bundle_purchase(bundle_id);
CREATE INDEX IF NOT EXISTS idx_bundle_purchase_user ON bundle_purchase(user_id);
CREATE INDEX IF NOT EXISTS idx_bundle_purchase_order ON bundle_purchase(order_id);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE bundle IS 'Merch + music bundles with discounted pricing';
COMMENT ON COLUMN bundle.items IS 'JSON array of bundle items: [{ productId, quantity }]';
COMMENT ON COLUMN bundle.savings IS 'Amount saved compared to buying items individually';
COMMENT ON COLUMN bundle.savings_percent IS 'Percentage saved (0-100)';
COMMENT ON TABLE bundle_purchase IS 'Records of bundle purchases';
COMMENT ON COLUMN bundle_purchase.items_received IS 'JSON array of fulfilled items';

-- ============================================
-- SAMPLE DATA (Bundle Examples)
-- ============================================

-- Uncomment to create sample bundles:
/*
-- Bundle 1: Tour 2026 Bundle
INSERT INTO bundle (
  name, description, items, bundle_price, original_price,
  savings, savings_percent, is_limited
) VALUES (
  'Tour 2026 Bundle',
  'Complete Tour 2026 experience - Vinyl + T-Shirt + Signed Poster',
  '[{"productId": "VINYL_UUID", "quantity": 1}, {"productId": "TSHIRT_UUID", "quantity": 1}, {"productId": "POSTER_UUID", "quantity": 1}]',
  '65.00',
  '80.00',
  '15.00',
  19,
  false
);

-- Bundle 2: VIP Fan Bundle
INSERT INTO bundle (
  name, description, items, bundle_price, original_price,
  savings, savings_percent, is_limited
) VALUES (
  'VIP Fan Bundle',
  'Ultimate VIP experience - Membership + Signed Album + Exclusive Hoodie',
  '[{"productId": "VIP_UUID", "quantity": 1}, {"productId": "ALBUM_UUID", "quantity": 1}, {"productId": "HOODIE_UUID", "quantity": 1}]',
  '349.00',
  '410.00',
  '61.00',
  15,
  true
);
*/
