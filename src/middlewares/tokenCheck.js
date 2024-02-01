const { getToken } = require('../helpers');

const tokenCheck = async (req, res, next) => {

    try {

        // let token = redis_token;

        let token = null;

        const { access_token, expires_in, error } = await getToken();

        if (error) {

            const { response, message } = error;

            res.status(response?.status || 401).json({ message: `Authentication unsuccessful: ${message}` });

            return;

        };

        token = access_token;

        req.headerConfig = { headers: { Authorization: `Bearer ${token}` } };

        next();

    } catch (error) {

        next(error);

    };

};

module.exports = tokenCheck;