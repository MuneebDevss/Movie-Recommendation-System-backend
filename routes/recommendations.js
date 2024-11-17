const express = require('express');
const router = express.Router();
const authUser=require("../middlewares/auth");
const recommendationsController = require('../controllers/recommendationController');

// Route to get recommended movies for a user
router.get('/recommendations/',authUser, recommendationsController.getRecommendationsForUser);

// Route to get similar titles based on a movie ID
router.get('/similar/:movieId', recommendationsController.getSimilarTitles);

// Route to get trending movies
router.get('/trending', recommendationsController.getTrendingMovies);

// Route to get top-rated movies
router.get('/top-rated', recommendationsController.getTopRatedMovies);

module.exports = router;
