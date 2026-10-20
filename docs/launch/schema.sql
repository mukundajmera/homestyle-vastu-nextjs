CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  type ENUM('residential', 'commercial') NOT NULL,
  format ENUM('onsite', 'online') NOT NULL,
  inquiry TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
