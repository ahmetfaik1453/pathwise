const express = require('express');
    const router = express.Router();
    const axios = require('axios');
    const db = require('../utils/database');

    // Get personalized recommendations
    router.get('/', authenticateToken, async (req, res) => {
      try {
        // Example: Fetch user preferences
        const userPreferences = await db.pg.query('SELECT preferences FROM users WHERE user_id = $1', [req.user.id]);

        // Example: Call to a Python-based recommendation service
        const response = await axios.post('http://localhost:5000/recommend', {
          preferences: userPreferences.rows[0].preferences
        });

        res.json(response.data);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching recommendations');
      }
    });

    module.exports = router;
