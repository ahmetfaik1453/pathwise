const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Get all forum topics
    router.get('/topics', async (req, res) => {
      try {
        const topics = await db.pg.query('SELECT * FROM forum_topics');
        res.json(topics.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching forum topics');
      }
    });

    // Create a new forum topic
    router.post('/topics', authenticateToken, async (req, res) => {
      try {
        const { title, content, category } = req.body;
        const result = await db.pg.query(
          'INSERT INTO forum_topics (title, content, user_id, category) VALUES ($1, $2, $3, $4) RETURNING *',
          [title, content, req.user.id, category]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error creating forum topic');
      }
    });

    // Get a specific forum topic
    router.get('/topics/:topicId', async (req, res) => {
      try {
        const { topicId } = req.params;
        const topic = await db.pg.query('SELECT * FROM forum_topics WHERE topic_id = $1', [topicId]);
        if (topic.rows.length > 0) {
          res.json(topic.rows[0]);
        } else {
          res.status(404).send('Forum topic not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching forum topic');
      }
    });

    // Create a new forum post
    router.post('/topics/:topicId/posts', authenticateToken, async (req, res) => {
      try {
        const { topicId } = req.params;
        const { content } = req.body;
        const result = await db.pg.query(
          'INSERT INTO forum_posts (topic_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
          [topicId, req.user.id, content]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error creating forum post');
      }
    });

    // Get a specific forum post
    router.get('/posts/:postId', async (req, res) => {
      try {
        const { postId } = req.params;
        const post = await db.pg.query('SELECT * FROM forum_posts WHERE post_id = $1', [postId]);
        if (post.rows.length > 0) {
          res.json(post.rows[0]);
        } else {
          res.status(404).send('Forum post not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching forum post');
      }
    });

    module.exports = router;
