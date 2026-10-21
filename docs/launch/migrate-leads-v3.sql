-- Migration: map deprecated property categories to the new 5-category enum
-- Run this AFTER migrate-leads-v2.sql if there are existing leads using the old categories.
-- This targets existing v2 leads only. Do not rerun on a fresh database.

-- Step 1: Widen the column definition to accept the new categories
ALTER TABLE leads MODIFY COLUMN type ENUM('home', 'business', 'plot_land', 'construction_renovation', 'industrial_factory', 'plot', 'industrial', 'other') NOT NULL;

-- Step 2: Map the deprecated values to standard values
UPDATE leads
SET type = CASE
    WHEN type = 'plot_land' THEN 'plot'
    WHEN type = 'construction_renovation' THEN 'other'
    WHEN type = 'industrial_factory' THEN 'industrial'
    ELSE type
END
WHERE type IN ('plot_land', 'construction_renovation', 'industrial_factory');

-- Step 3: Narrow the column definition to exactly the five supported categories
ALTER TABLE leads MODIFY COLUMN type ENUM('home', 'business', 'plot', 'industrial', 'other') NOT NULL;
