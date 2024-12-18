const amqp = require('amqplib');
    const config = require('../config');

    let connection;

    async function connect() {
      try {
        connection = await amqp.connect(config.rabbitmq.url);
        console.log('Connected to RabbitMQ');
      } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
      }
    }

    connect();

    module.exports = {
      getChannel: async () => {
        if (!connection) {
          await connect();
        }
        return await connection.createChannel();
      }
    };
