const redis = require('redis');
    const config = require('../config');

    const client = redis.createClient(config.redis);

    client.on('error', (err) => console.log('Redis Client Error', err));

    (async () => {
      await client.connect();
    })();

    module.exports = client;
