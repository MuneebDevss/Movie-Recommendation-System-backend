const Movie = require('../models/Movie').Movie;
const User = require('../models/User');

exports.getRecommendationsForUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('favoriteGenres');
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const favoriteGenres = user.favoriteGenres && ['Action'];//by default everyone like Action
        console.log(favoriteGenres);
        // Find movies with similar genres or highly rated by similar users
        const recommendedMovies = await Movie.find({
            genre: { $in: favoriteGenres },
        }).sort({ averageRating: -1 }).limit(10);
        
        res.status(200).json(recommendedMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSimilarTitles = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findById(movieId);
        
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // Fetch similar movies based on genre or director
        const similarMovies = await Movie.find({
            _id: { $ne: movieId },
            $or: [
                { genre: { $in: movie.genre } },
                { director: movie.director }
            ]
        }).limit(5);
        
        res.status(200).json(similarMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTrendingMovies = async (req, res) => {
    try {
        // Trending movies logic: prioritize movies with high recent activity (e.g., recent ratings or views)
        const trendingMovies = await Movie.find()
            .sort({ ratingsCount: -1, averageRating: -1 })
            .limit(10);
        
        res.status(200).json(trendingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTopRatedMovies = async (req, res) => {
    try {
        // Top-rated movies logic: simply sort by highest ratings
        const topRatedMovies = await Movie.find()
            .sort({ averageRating: -1 })
            .limit(10);
        
        res.status(200).json(topRatedMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
