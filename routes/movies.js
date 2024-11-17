const express = require('express');
const router = express.Router();
const { getMovies, getMovieDetails, searchMovies, filterMovies } = require('../controllers/movieController');

router.get('/', getMovies); // List all movies
router.get('/:id', getMovieDetails); // Get movie details by ID

module.exports = router;
