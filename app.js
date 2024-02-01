require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: false })
]);

app.get('/', (req, res) => {

    res.status(200).send('Alive!');

});

app.use((err, req, res, next) => {

    console.error(err);

    if (!res.headersSent) {

        res.status(500).send('Internal Server Error');

    };

});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = { app, server };