-- Run after migrate-leads-v1.sql, or on a database that already completed v1.
-- Back up the database before running this migration. MySQL DDL auto-commits.
-- Do not run against a fresh database created from schema.sql.

-- Temporarily accept both legacy and current values so existing rows can be mapped.
ALTER TABLE leads
  MODIFY COLUMN type ENUM(
    'residential',
    'commercial',
    'home',
    'business',
    'plot_land',
    'construction_renovation',
    'industrial_factory',
    'other'
  ) NOT NULL;

UPDATE leads SET type = 'home' WHERE type = 'residential';
UPDATE leads SET type = 'business' WHERE type = 'commercial';

ALTER TABLE leads
  MODIFY COLUMN type ENUM(
    'home',
    'business',
    'plot_land',
    'construction_renovation',
    'industrial_factory',
    'other'
  ) NOT NULL;
