const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Create a new product
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { producer_id, name, description, category, subcategory, unit_price, unit, stock_quantity, is_organic, images, harvest_date, expiration_date, nutritional_information, production_method, minimum_order_quantity } = req.body;
        const result = await db.pg.query(
          'INSERT INTO products (producer_id, name, description, category, subcategory, unit_price, unit, stock_quantity, is_organic, images, harvest_date, expiration_date, nutritional_information, production_method, minimum_order_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
          [producer_id, name, description, category, subcategory, unit_price, unit, stock_quantity, is_organic, images, harvest_date, expiration_date, nutritional_information, production_method, minimum_order_quantity]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during product creation');
      }
    });

    // Get a specific product
    router.get('/:productId', async (req, res) => {
      try {
        const { productId } = req.params;
        const result = await db.pg.query('SELECT * FROM products WHERE product_id = $1', [productId]);
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('Product not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching product');
      }
    });

    // Update a product
    router.put('/:productId', authenticateToken, async (req, res) => {
      try {
        const { productId } = req.params;
        const { name, description, category, subcategory, unit_price, unit, stock_quantity, is_organic, images, harvest_date, expiration_date, nutritional_information, production_method, minimum_order_quantity } = req.body;
        const result = await db.pg.query(
          'UPDATE products SET name = $1, description = $2, category = $3, subcategory = $4, unit_price = $5, unit = $6, stock_quantity = $7, is_organic = $8, images = $9, harvest_date = $10, expiration_date = $11, nutritional_information = $12, production_method = $13, minimum_order_quantity = $14 WHERE product_id = $15 RETURNING *',
          [name, description, category, subcategory, unit_price, unit, stock_quantity, is_organic, images, harvest_date, expiration_date, nutritional_information, production_method, minimum_order_quantity, productId]
        );
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('Product not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during product update');
      }
    });

    // Delete a product
    router.delete('/:productId', authenticateToken, async (req, res) => {
      try {
        const { productId } = req.params;
        const result = await db.pg.query('DELETE FROM products WHERE product_id = $1', [productId]);
        if (result.rowCount > 0) {
          res.send('Product deleted successfully');
        } else {
          res.status(404).send('Product not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during product deletion');
      }
    });

    // Get products by producer
    router.get('/producer/:producerId', async (req, res) => {
      try {
        const { producerId } = req.params;
        const products = await db.pg.query('SELECT * FROM products WHERE producer_id = $1', [producerId]);
        res.json(products.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching products by producer');
      }
    });

    module.exports = router;
