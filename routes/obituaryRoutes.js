const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const obituaryController = require('../controllers/obituaryController');

router.get('/', authenticateToken, obituaryController.getObituaries);
router.post('/', authenticateToken, obituaryController.createObituary);
router.patch('/:id', authenticateToken, obituaryController.updateObituary);
router.patch('/:id/cancel', authenticateToken, obituaryController.cancelObituary);

module.exports = router;