module.exports = {
      db: {
        postgres: {
          host: 'localhost',
          port: 5432,
          user: 'your_db_user',
          password: 'your_db_password',
          database: 'pathwise_db'
        },
        mongo: {
          url: 'mongodb://localhost:27017',
          dbName: 'pathwise_db'
        }
      },
      redis: {
        host: 'localhost',
        port: 6379
      },
      rabbitmq: {
        url: 'amqp://localhost'
      },
      jwtSecret: 'your_jwt_secret'
    };
