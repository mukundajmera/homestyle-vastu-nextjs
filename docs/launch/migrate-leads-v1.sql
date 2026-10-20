-- Run once, after taking a backup, only when upgrading the earlier leads schema.
-- Do not run this against a fresh database created from schema.sql.

ALTER TABLE leads
  ADD COLUMN submission_id CHAR(36) NULL,
  ADD COLUMN payload_hash CHAR(64) NULL,
  ADD COLUMN service_interest VARCHAR(80) NOT NULL DEFAULT 'general_vastu',
  ADD COLUMN consent TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN consent_timestamp DATETIME NULL,
  ADD COLUMN privacy_policy_version VARCHAR(20) NOT NULL DEFAULT 'legacy';

UPDATE leads
SET submission_id = UUID()
WHERE submission_id IS NULL;

UPDATE leads
SET payload_hash = SHA2(CONCAT_WS('|', id, name, phone, email, location, type, format, inquiry), 256)
WHERE payload_hash IS NULL;

UPDATE leads
SET consent_timestamp = created_at
WHERE consent_timestamp IS NULL AND created_at IS NOT NULL;

ALTER TABLE leads
  MODIFY COLUMN submission_id CHAR(36) NOT NULL,
  MODIFY COLUMN payload_hash CHAR(64) NOT NULL,
  ADD UNIQUE KEY uq_leads_submission_id (submission_id);
