require('dotenv').config();
const { Client } = require('pg');
const articles = require('./seeds/articles.json');

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === 'false' ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
  });

  await client.connect();

  const { rows } = await client.query('SELECT COUNT(*) FROM articles');
  if (parseInt(rows[0].count) > 0) {
    console.log('Articles table already has data, skipping seed.');
    await client.end();
    return;
  }

  console.log(`Inserting ${articles.length} articles...`);
  for (const article of articles) {
    await client.query(
      'INSERT INTO articles (category, title, intro, body) VALUES ($1, $2, $3, $4)',
      [article.category, article.title, article.intro, article.body]
    );
  }

  await client.end();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
