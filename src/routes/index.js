const router = require('express')?.Router();
const videoRoutes = require('./videos');
const healthCheckRoute = require('./healthCheck');
const { tokenCheck } = require('../middlewares');

router.use('/videos', [tokenCheck], videoRoutes);

router.use('/health-check', healthCheckRoute);

module.exports = router;