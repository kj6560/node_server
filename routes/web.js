const express = require('express');
const router = express.Router();
const SiteController = require('../controllers/sitecontroller')

router.get('/', (req, res) => {
    SiteController.index(req,res);
});

module.exports = router;