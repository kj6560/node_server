const express = require('express');
const upload = require('../upload');
const router = express.Router();

const SiteController = require('../controllers/sitecontroller')

router.get('/', (req, res) => {
    SiteController.index(req, res);
});
router.post('/uploadFile', upload.single('file'),(req, res) => {
    SiteController.uploadFile(req, res);
});

module.exports = web_router;