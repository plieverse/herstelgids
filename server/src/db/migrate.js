require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  await client.connect();
  console.log('Connected to database, running migrations...');

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Running ${file}...`);
    await client.query(sql);
  }

  await client.end();
  console.log('Migrations complete.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
