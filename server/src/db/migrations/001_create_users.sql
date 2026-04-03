CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  surgery_date  DATE,
  refresh_token_hash VARCHAR(255),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
