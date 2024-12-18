const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Create a new producer
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { business_name, description, address, location, opening_hours, contact_info, is_organic_certified, verification_document, verification_level, tags } = req.body;
        const result = await db.pg.query(
          'INSERT INTO producers (user_id, business_name, description, address, location, opening_hours, contact_info, is_organic_certified, verification_document, verification_level, tags) VALUES ($1, $2, $3, $4, ST_GeogFromText($5), $6, $7, $8, $9, $10, $11) RETURNING *',
          [req.user.id, business_name, description, address, location, opening_hours, contact_info, is_organic_certified, verification_document, verification_level, tags]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during producer creation');
      }
    });

    // Get a specific producer
    router.get('/:producerId', async (req, res) => {
      try {
        const { producerId } = req.params;
        const result = await db.pg.query('SELECT * FROM producers WHERE producer_id = $1', [producerId]);
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('Producer not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching producer');
      }
    });

    // Update a producer
    router.put('/:producerId', authenticateToken, async (req, res) => {
      try {
        const { producerId } = req.params;
        const { business_name, description, address, location, opening_hours, contact_info, is_organic_certified, verification_document, verification_level, tags } = req.body;
        const result = await db.pg.query(
          'UPDATE producers SET business_name = $1, description = $2, address = $3, location = ST_GeogFromText($4), opening_hours = $5, contact_info = $6, is_organic_certified = $7, verification_document = $8, verification_level = $9, tags = $10 WHERE producer_id = $11 AND user_id = $12 RETURNING *',
          [business_name, description, address, location, opening_hours, contact_info, is_organic_certified, verification_document, verification_level, tags, producerId, req.user.id]
        );
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('Producer not found or unauthorized');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during producer update');
      }
    });

    // Get nearby producers
    router.get('/', async (req, res) => {
      const { lat, lon, radius } = req.query;
      try {
        const producers = await db.pg.query(
          `SELECT * FROM producers WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, $3)`,
          [lon, lat, radius]
        );
        res.json(producers.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching nearby producers');
      }
    });

    // Search producers
    router.get('/search', async (req, res) => {
      const { query } = req.query;
      try {
        const producers = await db.pg.query(
          `SELECT * FROM producers WHERE business_name ILIKE $1 OR tags @> ARRAY[$2]`,
          [`%${query}%`, query]
        );
        res.json(producers.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during producer search');
      }
    });

    // Get analytics for a producer
    router.get('/:producerId/analytics', authenticateToken, async (req, res) => {
      try {
        const { producerId } = req.params;
        // Example analytics: number of orders
        const ordersCount = await db.pg.query('SELECT COUNT(*) FROM orders WHERE producer_id = $1', [producerId]);
        res.json({
          ordersCount: parseInt(ordersCount.rows[0].count),
          // Add more analytics data as needed
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching producer analytics');
      }
    });

    module.exports = router;
