CREATE TABLE IF NOT EXISTS articles (
  id         SERIAL PRIMARY KEY,
  category   VARCHAR(100) NOT NULL,
  title      VARCHAR(255) NOT NULL,
  intro      TEXT NOT NULL,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);
