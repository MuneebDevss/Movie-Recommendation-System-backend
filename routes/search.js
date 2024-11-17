const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to search for movies by title, genre, director, or actors
router.get('/search', searchController.searchMovies);

// Route for top movie lists by time frame or genre
router.get('/top-movies', searchController.getTopMovies);

module.exports = router;