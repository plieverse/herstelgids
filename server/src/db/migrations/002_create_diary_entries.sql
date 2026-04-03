CREATE TABLE IF NOT EXISTS diary_entries (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  pain_score  SMALLINT NOT NULL CHECK (pain_score BETWEEN 1 AND 10),
  mood_score  SMALLINT NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
  meal_count  SMALLINT NOT NULL CHECK (meal_count >= 0),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date)
);
