const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Send a message
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { receiver_id, message_content } = req.body;
        const result = await db.pg.query(
          'INSERT INTO messages (sender_id, receiver_id, message_content) VALUES ($1, $2, $3) RETURNING *',
          [req.user.id, receiver_id, message_content]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error sending message');
      }
    });

    // Get messages between two users
    router.get('/', authenticateToken, async (req, res) => {
      try {
        const { other_user_id } = req.query;
        const messages = await db.pg.query(
          'SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY sent_at ASC',
          [req.user.id, other_user_id]
        );
        res.json(messages.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching messages');
      }
    });

    module.exports = router;
