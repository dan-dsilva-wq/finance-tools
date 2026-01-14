-- =============================================
-- FINANCE TOOLS - SUPABASE DATABASE SETUP
-- =============================================
-- Run this entire file in the Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Paste -> Run)

-- =============================================
-- TABLE: country
-- Stores country-specific defaults for calculators
-- =============================================
CREATE TABLE country (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  currency TEXT NOT NULL,
  currency_symbol TEXT NOT NULL,
  locale TEXT NOT NULL,
  default_mortgage_term_years INT DEFAULT 25,
  default_deposit_pct NUMERIC DEFAULT 10,
  default_rate NUMERIC DEFAULT 5.0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: scenario
-- Stores saved calculator scenarios for sharing
-- =============================================
CREATE TABLE scenario (
  id TEXT PRIMARY KEY,
  tool TEXT NOT NULL,
  country_code TEXT REFERENCES country(code),
  params JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  views INT DEFAULT 0
);

-- Index for faster lookups by tool type
CREATE INDEX idx_scenario_tool ON scenario(tool);

-- =============================================
-- INITIAL DATA: Countries
-- =============================================
INSERT INTO country (code, name, currency, currency_symbol, locale, default_mortgage_term_years, default_deposit_pct, default_rate) VALUES
  ('gb', 'United Kingdom', 'GBP', '£', 'en-GB', 25, 10, 4.5),
  ('us', 'United States', 'USD', '$', 'en-US', 30, 20, 6.5),
  ('ca', 'Canada', 'CAD', 'C$', 'en-CA', 25, 20, 5.0),
  ('au', 'Australia', 'AUD', 'A$', 'en-AU', 30, 20, 6.0);

-- =============================================
-- VERIFY SETUP
-- =============================================
-- After running, you should see 4 rows:
SELECT * FROM country;
