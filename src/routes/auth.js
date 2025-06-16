const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Visa login/register sidor
router.get('/login', authController.getLogin);

// Auth actions
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Skyddade routes
router.get('/me', authMiddleware, authController.me);

module.exports = router;
