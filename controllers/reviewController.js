const Review = require('../models/Review');
const Movie = require('../models/Movie').Movie;
var mongoose = require('mongoose');


// Rate a movie
exports.rateMovie = async (req, res) => {
    try {
        const { rating } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const existingReview = await Review.findOne({ user: req.user.id, movie: req.params.movieId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already rated this movie' });
        }

        const review = new Review({
            user: req.user.id,
            movie: req.params.movieId,
            rating,
        });
        await review.save();

        // Update movie's average rating
        const movie = await Movie.findById(req.params.movieId);
        movie.ratingsCount += 1;
        movie.averageRating = ((movie.averageRating * (movie.ratingsCount - 1)) + rating) / movie.ratingsCount;
        await movie.save();

        res.status(201).json({ message: 'Rating submitted successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a review to a movie
exports.reviewMovie = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;

        const review = new Review({
            user: req.user.id,
            movie: req.params.movieId,
            rating,
            reviewText
        });
        await review.save();

        // Update movie's average rating
        const movie = await Movie.findById(req.params.movieId);
        movie.ratingsCount += 1;
        movie.averageRating = ((movie.averageRating * (movie.ratingsCount - 1)) + rating) / movie.ratingsCount;
        await movie.save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing review
exports.updateReview = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const review = await Review.findOne({ _id: req.params.reviewId, user: req.user.id });

        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Update rating and recalculate movie's average rating
        if (rating) {
            const movie = await Movie.findById(review.movie);
            movie.averageRating = ((movie.averageRating * movie.ratingsCount) - review.rating + rating) / movie.ratingsCount;
            await movie.save();
            review.rating = rating;
        }

        if (reviewText) review.reviewText = reviewText;

        await review.save();
        res.json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const id=req.params.reviewId;
        const validityCheck=mongoose.Types.ObjectId.isValid(id);
        if (!validityCheck) {
            return res.status(500).json({ message: "Invalid Id Format" });
        }
        const review = await Review.findOneAndDelete({ _id: req.params.reviewId, user: req.user.id });

        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Update movie's average rating and ratings count
        const movie = await Movie.findById(review.movie);
        movie.ratingsCount -= 1;
        if (movie.ratingsCount > 0) {
            movie.averageRating = ((movie.averageRating * (movie.ratingsCount + 1)) - review.rating) / movie.ratingsCount;
        } else {
            movie.averageRating = 0; // No ratings left
        }
        await movie.save();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a specific movie
exports.getMovieReviews = async (req, res) => {
    try {
        const id=req.params.movieId;
        const validityCheck=mongoose.Types.ObjectId.isValid(id);
        console.log(validityCheck);
        if (!validityCheck) {
            return res.status(500).json({ message: "Invalid Id Format" });
        }
        
        const movie = await Movie.findById(req.params.movieId);
        if(!movie){
            return res.status(404).json({ message: "Movie not Found" });
        }
        const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//highest rated movies
exports.getTopRatedReviews= async (req,res)=> {
try{
    const mostDiscussedReviews=await Review.find().sort({ rating: -1 }).limit(5);
    res.status(200).json(mostDiscussedReviews);
}
catch(e){
    res.status(500).json({ message: e.message });
}
};