require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { redisConnect } = require('./src/services');
const { errorHandler } = require('./src/helpers');

// App init
const app = express();

// Establish Redis connection
redisConnect();

// Middlewares
app.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: false })
]);

// Routes
app.use('/api/v1', require('./src/routes'));

// The default error handler
app.use(errorHandler);

// Server port
const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = { app, server };