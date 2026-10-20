CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  submission_id CHAR(36) NOT NULL,
  payload_hash CHAR(64) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NULL,
  location VARCHAR(100) NOT NULL,
  type ENUM('residential', 'commercial') NOT NULL,
  service_interest VARCHAR(80) NOT NULL,
  format ENUM('onsite', 'online') NOT NULL,
  inquiry TEXT NULL,
  consent TINYINT(1) NOT NULL,
  consent_timestamp DATETIME NOT NULL,
  privacy_policy_version VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_leads_submission_id (submission_id),
  KEY ix_leads_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
