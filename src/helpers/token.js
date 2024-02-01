const axios = require('axios');
const { ZOOM_OAUTH_ENDPOINT } = require('../constants');

const getToken = async () => {

    try {

        const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

        const token = `${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`;

        const data = new URLSearchParams({ grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID });

        const config = { headers: { Authorization: `Basic ${token}` } };

        const response = await axios.post(ZOOM_OAUTH_ENDPOINT, data, config);

        const { access_token, expires_in } = await response.data;

        return { access_token, expires_in, error: null };

    } catch (error) {

        return { access_token: null, expires_in: null, error };

    };

}; //GETTOKEN-END

module.exports = { getToken };