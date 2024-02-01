const { createClient } = require('redis');
const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

const client = createClient({
    password: REDIS_PASSWORD,
    socket: { host: REDIS_HOST, port: REDIS_PORT } // reconnectStrategy
});

module.exports = client;