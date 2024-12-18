const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Add a favorite
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { producer_id, product_id } = req.body;
        if (!producer_id && !product_id) {
          return res.status(400).send('Either producer_id or product_id is required');
        }
        const result = await db.pg.query(
          'INSERT INTO favorites (user_id, producer_id, product_id) VALUES ($1, $2, $3) RETURNING *',
          [req.user.id, producer_id, product_id]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error adding favorite');
      }
    });

    // Remove a favorite
    router.delete('/:favoriteId', authenticateToken, async (req, res) => {
      try {
        const { favoriteId } = req.params;
        const result = await db.pg.query('DELETE FROM favorites WHERE favorite_id = $1 AND user_id = $2', [favoriteId, req.user.id]);
        if (result.rowCount > 0) {
          res.send('Favorite removed successfully');
        } else {
          res.status(404).send('Favorite not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error removing favorite');
      }
    });

    // Get favorites for a user
    router.get('/', authenticateToken, async (req, res) => {
      try {
        const favorites = await db.pg.query('SELECT * FROM favorites WHERE user_id = $1', [req.user.id]);
        res.json(favorites.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching favorites');
      }
    });

    module.exports = router;
