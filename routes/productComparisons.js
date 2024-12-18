const express = require('express');
      const router = express.Router();
      const db = require('../utils/database');
      const { authenticateToken } = require('../middleware/auth');
  
      // Create a product comparison
      router.post('/', authenticateToken, async (req, res) => {
        try {
          const { product_ids } = req.body;
          const result = await db.pg.query(
            'INSERT INTO product_comparisons (user_id, product_ids) VALUES ($1, $2) RETURNING *',
            [req.user.id, product_ids]
          );
          res.status(201).json(result.rows[0]);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error creating product comparison');
        }
      });
  
      // Get a specific product comparison
      router.get('/:comparisonId', authenticateToken, async (req, res) => {
        try {
          const { comparisonId } = req.params;
          const result = await db.pg.query('SELECT * FROM product_comparisons WHERE comparison_id = $1 AND user_id = $2', [comparisonId, req.user.id]);
          if (result.rows.length > 0) {
            res.json(result.rows[0]);
          } else {
            res.status(404).send('Product comparison not found');
          }
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error fetching product comparison');
        }
      });
  
      module.exports = router;
