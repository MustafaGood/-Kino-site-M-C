const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// GET /filmer
router.get('/', movieController.listMovies);

// GET /filmer/:id
router.get('/:id', movieController.movieDetails);

module.exports = router;
