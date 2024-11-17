const Movie = require('../models/Movie').Movie;

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get movie details by ID
exports.getMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('director cast');
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};