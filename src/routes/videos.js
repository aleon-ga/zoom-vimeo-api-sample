const router = require('express')?.Router();
const axios = require('axios');
const { ZOOM_API_BASE_URL } = require('../constants');

router.post('/upload', (req, res) => {

    (async () => {

        try {

            const { headerConfig, params } = req;

            const meetingId = params.meetingId || 86847082196;

            const url = `${ZOOM_API_BASE_URL}/meetings/${meetingId}/recordings`;

            const response = await axios.get(url, headerConfig);

            const data = await response.data;

            res.status(200).json(data);

        } catch (error) {

            console.error(error);

            if (error.response) {

                const { response: { status }, message } = error;

                res.status(status).json({ message });

                return;

            };

            if (error.request) {

                const { request: { status }, message } = error;

                res.status(status).json({ message });

                return;

            };

            res.status(error.status || 500).json({ message: error.message });

            return;

        };

    })();

});

module.exports = router;