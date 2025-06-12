const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// GET /movies
router.get('/', movieController.listMovies);

module.exports = router;
