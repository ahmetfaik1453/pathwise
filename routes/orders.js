const express = require('express');
    const router = express.Router();
    const db = require('../utils/database');
    const { authenticateToken } = require('../middleware/auth');

    // Create a new order
    router.post('/', authenticateToken, async (req, res) => {
      try {
        const { producer_id, total_amount, payment_method, delivery_address, order_items } = req.body;
        const orderResult = await db.pg.query(
          'INSERT INTO orders (consumer_id, producer_id, total_amount, payment_method, delivery_address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [req.user.id, producer_id, total_amount, payment_method, delivery_address]
        );
        const newOrder = orderResult.rows[0];

        for (const item of order_items) {
          await db.pg.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
            [newOrder.order_id, item.product_id, item.quantity, item.price]
          );
        }

        res.status(201).json(newOrder);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during order creation');
      }
    });

    // Get a specific order
    router.get('/:orderId', authenticateToken, async (req, res) => {
      try {
        const { orderId } = req.params;
        const orderResult = await db.pg.query('SELECT * FROM orders WHERE order_id = $1', [orderId]);
        if (orderResult.rows.length > 0) {
          const orderItemsResult = await db.pg.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
          const order = orderResult.rows[0];
          order.items = orderItemsResult.rows;
          res.json(order);
        } else {
          res.status(404).send('Order not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching order');
      }
    });

    // Get orders for a user
    router.get('/user/:userId', authenticateToken, async (req, res) => {
      try {
        const { userId } = req.params;
        if (req.user.id !== parseInt(userId)) {
          return res.status(403).send('Unauthorized access to orders');
        }
        const ordersResult = await db.pg.query('SELECT * FROM orders WHERE consumer_id = $1', [userId]);
        const orders = ordersResult.rows;

        for (let order of orders) {
          const orderItemsResult = await db.pg.query('SELECT * FROM order_items WHERE order_id = $1', [order.order_id]);
          order.items = orderItemsResult.rows;
        }

        res.json(orders);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching user orders');
      }
    });

    // Update order status
    router.patch('/:orderId/status', authenticateToken, async (req, res) => {
      try {
        const { orderId } = req.params;
        const { status } = req.body;
        const result = await db.pg.query(
          'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *',
          [status, orderId]
        );
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          res.status(404).send('Order not found');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error during order status update');
      }
    });

    module.exports = router;
