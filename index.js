const express = require('express');
    const app = express();
    const port = 3000;

    // Import routes
    const userRoutes = require('./routes/users');
    const producerRoutes = require('./routes/producers');
    const productRoutes = require('./routes/products');
    const orderRoutes = require('./routes/orders');
    const reviewRoutes = require('./routes/reviews');
    const messageRoutes = require('./routes/messages');
    const mapRoutes = require('./routes/map');
    const recommendationRoutes = require('./routes/recommendations');
    const favoriteRoutes = require('./routes/favorites');
    const productComparisonRoutes = require('./routes/productComparisons');
    const shoppingListRoutes = require('./routes/shoppingLists');
    const forumRoutes = require('./routes/forum');
    const blogRoutes = require('./routes/blog');
    const loyaltyPointRoutes = require('./routes/loyaltyPoints');

    // Middleware
    app.use(express.json());

    // Use routes
    app.use('/api/users', userRoutes);
    app.use('/api/producers', producerRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/reviews', reviewRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/map', mapRoutes);
    app.use('/api/recommendations', recommendationRoutes);
    app.use('/api/favorites', favoriteRoutes);
    app.use('/api/product-comparisons', productComparisonRoutes);
    app.use('/api/shopping-lists', shoppingListRoutes);
    app.use('/api/forum', forumRoutes);
    app.use('/api/blog', blogRoutes);
    app.use('/api/loyalty-points', loyaltyPointRoutes);

    app.get('/', (req, res) => {
      res.send('Welcome to Pathwise!');
    });

    app.listen(port, () => {
      console.log(`Pathwise backend listening at http://localhost:${port}`);
    });
