const { redis } = require('../config');
const { getToken, setToken } = require('../helpers');

const tokenCheck = async (req, res, next) => {

    try {

        const redisToken = await redis.get('access_token');

        let token = redisToken;

        if (!redisToken) {

            const { access_token, expires_in, error } = await getToken();

            if (error) {

                const { response, message } = error;

                res.status(response?.status || 401).json({ message: `Authentication unsuccessful: ${message}` });

                return;

            };

            setToken({ access_token, expires_in });

            token = access_token;

        };

        req.headerConfig = { headers: { Authorization: `Bearer ${token}` } };

        next();

    } catch (error) {

        next(error);

    };

};

module.exports = tokenCheck;