const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // User registration
    router.post('/register', async (req, res) => {
      try {
        const { full_name, email, password, phone_number, user_type } = req.body;
        const result = await db.pg.query(
          'INSERT INTO users (full_name, email, password, phone_number, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [full_name, email, password, phone_number, user_type]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during registration');
      }
    });

    // User login
    router.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const result = await db.pg.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          if (password === user.password) { // Replace with bcrypt.compare in production
            const token = jwt.sign({ id: user.user_id, fullName: user.full_name, email: user.email, userType: user.user_type }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ token });
          } else {
            res.status(401).send('Invalid credentials');
          }
        } else {
          res.status(404).send('User not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during login');
      }
    });

    // Get user profile
    router.get('/profile', authenticateToken, async (req, res) => {
      try {
        const user = await db.pg.query('SELECT * FROM users WHERE user_id = $1', [req.user.id]);
        if (user.rows.length > 0) {
          res.json(user.rows[0]);
        } else {
          res.status(404).send('User not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Update user profile
    router.put('/profile', authenticateToken, async (req, res) => {
      try {
        const { full_name, phone_number } = req.body;
        const result = await db.pg.query(
          'UPDATE users SET full_name = $1, phone_number = $2 WHERE user_id = $3 RETURNING *',
          [full_name, phone_number, req.user.id]
        );
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('User not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during profile update');
      }
    });

    // Update user location
    router.patch('/location', authenticateToken, async (req, res) => {
      try {
        const { location } = req.body;
        const result = await db.pg.query(
          'UPDATE users SET location = ST_GeogFromText($1) WHERE user_id = $2 RETURNING *',
          [location, req.user.id]
        );
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('User not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during location update');
      }
    });

    module.exports = router;
