const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { ZOOM_API_BASE_URL } = require('../constants');

const uploadVideos = async (req, res) => {

    let response;

    try {

        const { authorizationHeader, body: { meetingId } } = req;

        const url = `${ZOOM_API_BASE_URL}/meetings/${meetingId}/recordings`;

        response = await axios.get(url, { headers: authorizationHeader });

        const { host_email, id, recording_files } = await response.data;

        if (recording_files.length === 0) {

            return res.status(404).json({ message: 'No recording files found.' });

        };

        const video = recording_files.find(file => file.recording_type === 'active_speaker');

        if (!video) {

            return res.status(404).json({ message: 'No video file found.' });

        };

        const { file_extension, download_url } = video;

        const folderName = 'downloads';

        /**
         * Generates the full path of a directory by moving up one level ('..') from the current directory (__dirname)
         * and then appending the specified directory name (folderName).
         */
        const folderPath = path.join(__dirname, '..', folderName);

        // Checks if the directory exists
        if (!fs.existsSync(folderPath)) {

            fs.mkdirSync(folderPath, { recursive: true }); // `recursive` creates nested directories if needed

            console.log(`Folder "${folderName}" created`);

        };

        const fileName = `${host_email.split('@')[0]}-${id}.${file_extension.toLowerCase()}`;

        const filePath = path.join(folderPath, fileName);

        response = await axios({
            method: 'GET',
            url: `${download_url}`,
            headers: authorizationHeader,
            responseType: 'stream'
        });

        const fileStream = fs.createWriteStream(filePath);

        response.data?.pipe(fileStream);

        fileStream.on('finish', () => {

            console.log(`File locally downloaded in: ${filePath}`);

            res.status(200).json({ success: true });

        });

        fileStream.on('error', (err) => {

            console.error('Failed to save the file locally');

            throw err;

        });

    } catch (error) {

        console.error(error);

        if (error.response) {

            const { response: { status }, message } = error;

            return res.status(status).json({ message });

        };

        if (error.request) {

            const { request: { status }, message } = error;

            return res.status(status).json({ message });

        };

        return res.status(error.status || 500).json({ message: error.message });

    };

};

module.exports = { uploadVideos };