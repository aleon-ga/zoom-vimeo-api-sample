const router = require('express')?.Router();
const { videosController: { uploadVideos } } = require('../controllers');
const { tokenCheck } = require('../middlewares');

router.post('/upload', [tokenCheck], uploadVideos);

module.exports = router;