const { redis } = require('../config');

const redisConnect = async () => {

    try {

        await redis
            .on('connect', () => console.log('Redis client is connecting…'))
            .on('ready', () => console.log('Redis client is connected'))
            .on('end', () => console.log('Redis connection has been closed')) // via .quit() or .disconnect()
            .on('reconnecting', () => console.log('Redis client is reconnecting…'))
            .on('error', err => console.error('Redis client error', err))
            .connect();

    } catch (error) {

        console.error('Service start error', error);

    };

};

module.exports = redisConnect;