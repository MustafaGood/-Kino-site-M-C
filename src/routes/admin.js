const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

// Skydda alla admin routes med isAdmin middleware
router.use(isAdmin);

// Admin Dashboard
router.get('/dashboard', adminController.getDashboard);

// Film-hantering
router.get('/movies', adminController.getMovies);
router.get('/movies/new', adminController.getNewMovieForm);
router.post('/movies/new', adminController.createMovie);
router.get('/movies/edit/:id', adminController.getEditMovieForm);
router.post('/movies/edit/:id', adminController.updateMovie);
router.post('/movies/delete/:id', adminController.deleteMovie);

// Visningstider-hantering
router.get('/showtimes', adminController.getShowtimes);
router.get('/showtimes/new', adminController.getNewShowtimeForm);
router.post('/showtimes/new', adminController.createShowtime);
router.get('/showtimes/edit/:id', adminController.getEditShowtimeForm);
router.post('/showtimes/edit/:id', adminController.updateShowtime);
router.post('/showtimes/delete/:id', adminController.deleteShowtime);

module.exports = router;
