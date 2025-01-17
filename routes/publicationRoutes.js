const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const publicationController = require('../controllers/publicationController');

router.get('/', authenticateToken, publicationController.getPublications);

module.exports = router;