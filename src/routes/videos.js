const router = require('express')?.Router();
const { uploadVideos } = require('../controllers/videosController');
const { tokenCheck } = require('../middlewares');

router.post('/upload', [tokenCheck], uploadVideos);

module.exports = router;