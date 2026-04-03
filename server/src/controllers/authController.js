const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const pool = require('../config/database');
const { accessSecret, refreshSecret, accessExpires, refreshExpires } = require('../config/jwt');

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  surgery_date: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signTokens(userId, email) {
  const accessToken = jwt.sign({ sub: userId, email }, accessSecret, { expiresIn: accessExpires });
  const refreshToken = jwt.sign({ sub: userId }, refreshSecret, { expiresIn: refreshExpires });
  return { accessToken, refreshToken };
}

async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);

    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [data.email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Dit e-mailadres is al in gebruik.' });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const { accessToken, refreshToken } = signTokens(0, data.email); // temp id
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, surgery_date, refresh_token_hash)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, name, surgery_date`,
      [data.email, passwordHash, data.name, data.surgery_date || null, refreshHash]
    );

    const user = result.rows[0];
    const { accessToken: at, refreshToken: rt } = signTokens(user.id, user.email);
    const rtHash = await bcrypt.hash(rt, 10);
    await pool.query('UPDATE users SET refresh_token_hash = $1 WHERE id = $2', [rtHash, user.id]);

    res.status(201).json({ accessToken: at, refreshToken: rt, user });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(data.password, user.password_hash))) {
      return res.status(401).json({ error: 'Ongeldig e-mailadres of wachtwoord.' });
    }

    const { accessToken, refreshToken } = signTokens(user.id, user.email);
    const refreshHash = await bcrypt.hash(refreshToken, 10);
    await pool.query('UPDATE users SET refresh_token_hash = $1 WHERE id = $2', [refreshHash, user.id]);

    const { password_hash, refresh_token_hash, ...safeUser } = user;
    res.json({ accessToken, refreshToken, user: safeUser });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Ongeldige invoer.', details: err.errors });
    }
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token ontbreekt.' });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, refreshSecret);
    } catch {
      return res.status(401).json({ error: 'Refresh token is verlopen of ongeldig.' });
    }

    const result = await pool.query(
      'SELECT id, email, refresh_token_hash FROM users WHERE id = $1',
      [payload.sub]
    );
    const user = result.rows[0];
    if (!user || !user.refresh_token_hash) {
      return res.status(401).json({ error: 'Sessie niet gevonden.' });
    }

    const valid = await bcrypt.compare(refreshToken, user.refresh_token_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Refresh token komt niet overeen.' });
    }

    const { accessToken, refreshToken: newRefreshToken } = signTokens(user.id, user.email);
    const newHash = await bcrypt.hash(newRefreshToken, 10);
    await pool.query('UPDATE users SET refresh_token_hash = $1 WHERE id = $2', [newHash, user.id]);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    await pool.query('UPDATE users SET refresh_token_hash = NULL WHERE id = $1', [req.user.id]);
    res.json({ message: 'Uitgelogd.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout };
