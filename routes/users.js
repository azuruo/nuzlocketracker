const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/profile', authMiddleware, usersController.getProfile);
router.put('/profile', authMiddleware, usersController.updateProfile);
router.get('/verify', authMiddleware, usersController.verify);

module.exports = router;