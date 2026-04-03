const { z } = require('zod');
const pool = require('../config/database');

const entrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pain_score: z.number().int().min(1).max(10),
  mood_score: z.number().int().min(1).max(10),
  meal_count: z.number().int().min(0),
  notes: z.string().optional(),
});

async function list(req, res, next) {
  try {
    const { from, to } = req.query;
    let query = 'SELECT * FROM diary_entries WHERE user_id = $1';
    const params = [req.user.id];

    if (from) { query += ` AND date >= $${params.push(from)}`; }
    if (to)   { query += ` AND date <= $${params.push(to)}`; }
    query += ' ORDER BY date DESC';

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const data = entrySchema.parse(req.body);

    const existing = await pool.query(
      'SELECT id FROM diary_entries WHERE user_id = $1 AND date = $2',
      [req.user.id, data.date]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Er bestaat al een invoer voor deze datum.' });
    }

    const { rows } = await pool.query(
      `INSERT INTO diary_entries (user_id, date, pain_score, mood_score, meal_count, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, data.date, data.pain_score, data.mood_score, data.meal_count, data.notes || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM diary_entries WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Invoer niet gevonden.' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const data = entrySchema.parse(req.body);
    const { rows } = await pool.query(
      `UPDATE diary_entries
       SET pain_score=$1, mood_score=$2, meal_count=$3, notes=$4
       WHERE id=$5 AND user_id=$6 RETURNING *`,
      [data.pain_score, data.mood_score, data.meal_count, data.notes || null, req.params.id, req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Invoer niet gevonden.' });
    res.json(rows[0]);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { rows } = await pool.query(
      'DELETE FROM diary_entries WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Invoer niet gevonden.' });
    res.json({ message: 'Verwijderd.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create, getOne, update, remove };
