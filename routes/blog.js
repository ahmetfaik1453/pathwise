const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');

    // Get all blog posts
    router.get('/posts', async (req, res) => {
      try {
        const posts = await db.pg.query('SELECT * FROM blog_posts');
        res.json(posts.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching blog posts');
      }
    });

    // Get a specific blog post
    router.get('/posts/:postId', async (req, res) => {
      try {
        const { postId } = req.params;
        const post = await db.pg.query('SELECT * FROM blog_posts WHERE post_id = $1', [postId]);
        if (post.rows.length > 0) {
          res.json(post.rows[0]);
        } else {
          res.status(404).send('Blog post not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching blog post');
      }
    });

    module.exports = router;
