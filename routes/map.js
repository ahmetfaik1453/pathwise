const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');

    // Get producers near a location
    router.get('/producers', async (req, res) => {
      const { lat, lon, radius } = req.query;
      try {
        const producers = await db.pg.query(
          `SELECT * FROM producers WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)`,
          [lon, lat, radius]
        );
        res.json(producers.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching nearby producers');
      }
    });

    // Get producers along a route
    router.get('/route/producers', async (req, res) => {
      const { origin, destination, filters } = req.query;
      try {
        // This is a placeholder for a more complex route and filter implementation
        // In a real application, you would use a routing service like Google Maps Directions API
        // and apply filters based on user preferences
        const producers = await db.pg.query(
          `SELECT * FROM producers` // Replace with actual route logic
        );
        res.json(producers.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching producers along route');
      }
    });

    module.exports = router;
