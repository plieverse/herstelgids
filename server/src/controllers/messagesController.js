const { z } = require('zod');
const pool = require('../config/database');

const messageSchema = z.object({
  content: z.string().min(1).max(2000),
});

async function list(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at ASC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function unreadCount(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) FROM messages
       WHERE user_id = $1 AND sender_type = 'care' AND read_at IS NULL`,
      [req.user.id]
    );
    res.json({ count: parseInt(rows[0].count) });
  } catch (err) {
    next(err);
  }
}

async function send(req, res, next) {
  try {
    const { content } = messageSchema.parse(req.body);
    const { rows } = await pool.query(
      `INSERT INTO messages (user_id, sender_type, content)
       VALUES ($1, 'patient', $2) RETURNING *`,
      [req.user.id, content]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const { rows } = await pool.query(
      `UPDATE messages SET read_at = NOW()
       WHERE id = $1 AND user_id = $2 AND read_at IS NULL RETURNING *`,
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Bericht niet gevonden of al gelezen.' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, unreadCount, send, markRead };
