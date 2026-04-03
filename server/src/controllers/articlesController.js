const pool = require('../config/database');

async function list(req, res, next) {
  try {
    const { category, q } = req.query;
    let query = 'SELECT id, category, title, intro FROM articles';
    const params = [];
    const conditions = [];

    if (category) conditions.push(`category = $${params.push(category)}`);
    if (q) conditions.push(`(title ILIKE $${params.push('%' + q + '%')} OR intro ILIKE $${params.length})`);

    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY category, id';

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Artikel niet gevonden.' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne };
