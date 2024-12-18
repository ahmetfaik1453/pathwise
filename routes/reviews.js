const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Submit a review
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { producer_id, rating, comment } = req.body;
        const result = await db.pg.query(
          'INSERT INTO reviews (user_id, producer_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
          [req.user.id, producer_id, rating, comment]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during review submission');
      }
    });

    // Get reviews for a producer
    router.get('/producer/:producerId', async (req, res) => {
      try {
        const { producerId } = req.params;
        const reviews = await db.pg.query('SELECT * FROM reviews WHERE producer_id = $1', [producerId]);
        res.json(reviews.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching reviews');
      }
    });

    module.exports = router;
