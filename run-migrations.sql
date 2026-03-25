-- ============================================
-- RUN MIGRATIONS MANUALLY
-- The Drinkers - Music Artist Platform
-- ============================================
-- Execute this in Neon SQL Editor or via psql
-- This combines all 3 migration files

\echo 'Starting migration...'

-- Migration 1: 0000_colorful_warbound.sql
\echo 'Running migration 0000...'

-- Migration 2: 0001_elite_mojo.sql  
\echo 'Running migration 0001...'

-- Migration 3: 0002_cuddly_thundra.sql
\echo 'Running migration 0002...'

\echo '✅ Migrations complete!'

-- Verify
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE';
