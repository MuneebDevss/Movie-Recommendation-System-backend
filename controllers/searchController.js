const Movie = require('../models/Movie').Movie;

exports.searchMovies = async (req, res) => {
    try {
        const { title, genre, director, actor, minRating, maxRating, minYear, maxYear, decade, country, language, keyword } = req.query;
        
        // Base query object
        let query = {};

        // Basic search filters
        if (title) query.title = { $regex: title, $options: 'i' };
        if (genre) query.genre = genre;
        if (director) query.director = director;
        if (actor) query.cast = actor;

        // Rating filter
        if (minRating || maxRating) {
            query.averageRating = {};
            if (minRating) query.averageRating.$gte = parseFloat(minRating);
            if (maxRating) query.averageRating.$lte = parseFloat(maxRating);
        }

        // Year filter
        if (minYear || maxYear) {
            query.releaseDate = {};
            if (minYear) query.releaseDate.$gte = new Date(`${minYear}-01-01`);
            if (maxYear) query.releaseDate.$lte = new Date(`${maxYear}-12-31`);
        }

        // Advanced filters
        if (decade) {
            const startYear = Math.floor(decade / 10) * 10;
            query.releaseDate = {
                $gte: new Date(`${startYear}-01-01`),
                $lt: new Date(`${startYear + 10}-01-01`)
            };
        }
        if (country) query.country = country;
        if (language) query.language = language;
        if (keyword) query.keywords = { $regex: keyword, $options: 'i' };

        // Execute search with filters
        const movies = await Movie.find(query).sort({ popularity: -1 });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTopMovies = async (req, res) => {
    try {
        const {  genre } = req.query;
        
        console.log('Received query parameters:', { month, genre });  // Debugging log
        
        // Filter for movies within the provided month
        
        
        // Genre-based filter
        let genreFilter = {};
        if (genre) {
            genreFilter = { genre: { $in: [genre] } };  // Filter by genre if provided
        }

        
        console.log('Genre Filter:', genreFilter);  // Debugging log

        // Fetch top-rated movies based on filters
        const topMovies = await Movie.find({
            ...genreFilter
        }).sort({ averageRating: -1 }).limit(10);

        console.log('Top Movies:', topMovies);  // Debugging log

        if (topMovies.length === 0) {
            return res.status(404).json({ message: 'No movies found for the given filters.' });
        }

        res.status(200).json(topMovies);
    } catch (error) {
        console.error('Error in getTopMovies:', error);  // Debugging log
        res.status(500).json({ message: error.message });
    }
};

