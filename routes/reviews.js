const express = require('express');
const router = express.Router();
const { rateMovie, reviewMovie, updateReview, deleteReview, getMovieReviews,getTopRatedReviews } = require('../controllers/reviewController');
const authenticateUser = require('../middlewares/auth');
router.get('/',authenticateUser,getTopRatedReviews);
router.post('/:movieId/rate', authenticateUser, rateMovie);
router.post('/:movieId/review', authenticateUser, reviewMovie);
router.put('/:movieId/review/:reviewId', authenticateUser, updateReview);
router.delete('/:movieId/review/:reviewId', authenticateUser, deleteReview);
router.get('/:movieId/reviews', getMovieReviews);

module.exports = router;
