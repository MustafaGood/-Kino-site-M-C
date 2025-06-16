const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeController');

// GET /visningar
router.get('/', showtimeController.listShowtimes);

// GET /visningar/:id
router.get('/:id', showtimeController.showtimeDetails);

module.exports = router;
