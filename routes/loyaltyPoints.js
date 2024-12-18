const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Get loyalty points for a user
    router.get('/', authenticateToken, async (req, res) => {
      try {
        const points = await db.pg.query('SELECT * FROM loyalty_points WHERE user_id = $1', [req.user.id]);
        res.json(points.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching loyalty points');
      }
    });

    module.exports = router;
