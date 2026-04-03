const bcrypt = require('bcryptjs');
const { z } = require('zod');
const pool = require('../config/database');

async function getProfile(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, name, surgery_date, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const schema = z.object({
      name: z.string().min(1).optional(),
      surgery_date: z.string().optional(),
    });
    const data = schema.parse(req.body);

    const { rows } = await pool.query(
      `UPDATE users SET
        name = COALESCE($1, name),
        surgery_date = COALESCE($2, surgery_date)
       WHERE id = $3
       RETURNING id, email, name, surgery_date, created_at`,
      [data.name || null, data.surgery_date || null, req.user.id]
    );
    res.json(rows[0]);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    const schema = z.object({
      current_password: z.string().min(1),
      new_password: z.string().min(8),
    });
    const { current_password, new_password } = schema.parse(req.body);

    const { rows } = await pool.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    const valid = await bcrypt.compare(current_password, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Huidig wachtwoord klopt niet.' });

    const newHash = await bcrypt.hash(new_password, 12);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, req.user.id]);
    res.json({ message: 'Wachtwoord gewijzigd.' });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    next(err);
  }
}

module.exports = { getProfile, updateProfile, changePassword };
