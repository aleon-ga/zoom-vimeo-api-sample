const router = require('express')?.Router();
const videoRoutes = require('./videos');
const healthCheckRoute = require('./healthCheck');

router.use('/videos', videoRoutes);

router.use('/health-check', healthCheckRoute);

module.exports = router;