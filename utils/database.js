const { Pool } = require('pg');
    const { MongoClient } = require('mongodb');
    const config = require('../config');

    // PostgreSQL connection pool
    const pgPool = new Pool(config.db.postgres);

    // MongoDB connection
    const mongoClient = new MongoClient(config.db.mongo.url);

    async function connectToMongo() {
      try {
        await mongoClient.connect();
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
    }

    connectToMongo();

    module.exports = {
      pg: {
        query: (text, params) => pgPool.query(text, params),
      },
      mongo: {
        db: () => mongoClient.db(config.db.mongo.dbName),
        client: mongoClient
      }
    };
