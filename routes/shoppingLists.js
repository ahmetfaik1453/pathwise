const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Create a shopping list
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { name } = req.body;
        const result = await db.pg.query(
          'INSERT INTO shopping_lists (user_id, name) VALUES ($1, $2) RETURNING *',
          [req.user.id, name]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error creating shopping list');
      }
    });

    // Get a specific shopping list
    router.get('/:listId', authenticateToken, async (req, res) => {
      try {
        const { listId } = req.params;
        const result = await db.pg.query('SELECT * FROM shopping_lists WHERE list_id = $1 AND user_id = $2', [listId, req.user.id]);
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('Shopping list not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching shopping list');
      }
    });

    // Add item to a shopping list
    router.post('/:listId/items', authenticateToken, async (req, res) => {
      try {
        const { listId } = req.params;
        const { product_id, quantity } = req.body;
        const result = await db.pg.query(
          'INSERT INTO shopping_list_items (list_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
          [listId, product_id, quantity]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error adding item to shopping list');
      }
    });

    // Remove item from a shopping list
    router.delete('/:listId/items/:itemId', authenticateToken, async (req, res) => {
      try {
        const { listId, itemId } = req.params;
        const result = await db.pg.query('DELETE FROM shopping_list_items WHERE list_id = $1 AND item_id = $2', [listId, itemId]);
        if (result.rowCount > 0) {
          res.send('Item removed from shopping list');
        } else {
          res.status(404).send('Item not found in shopping list');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error removing item from shopping list');
      }
    });

    module.exports = router;
