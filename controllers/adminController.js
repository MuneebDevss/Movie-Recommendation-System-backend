const Movie = require('../models/Movie').Movie;
const Person = require('../models/Movie').Person;
const User = require('../models/User');
const Review = require('../models/Review');

// View statistics
exports.viewStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const movieCount = await Movie.countDocuments();
        const reviewCount = await Review.countDocuments();

        const topRatedMovies = await Movie.find().sort({ averageRating: -1 }).limit(5)
            .populate('director', 'name')
            .populate('cast', 'name');

        res.status(200).json({
            userCount,
            movieCount,
            reviewCount,
            topRatedMovies
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new movie
exports.addMovie = async (req, res) => {
    try {
        const { director, cast, ...movieData } = req.body;

        // Find or create director
        let directorDoc;
        if (director) {
            directorDoc = await Person.findOneAndUpdate(
                { name: director },
                { name: director },
                { upsert: true, new: true }
            );
        }
        
        // Find or create cast members
        const castDocs = cast ? await Promise.all(cast.map(async (actor) => {
            return await Person.findOneAndUpdate(
                { name: actor },
                { name: actor },
                { upsert: true, new: true }
            );
        })) : null;

        // Create new movie with references to director and cast
        const movie = new Movie({
            ...movieData,
            director: directorDoc?._id,
            ...(castDocs && { cast: castDocs.map(doc => doc._id) })
        });

        await movie.save();

        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing movie
exports.updateMovie = async (req, res) => {
    try {
        const { director, cast, ...movieData } = req.body;

        // Update director if provided
        let directorDoc;
        if (director) {
            directorDoc = await Person.findOneAndUpdate(
                { name: director },
                { name: director },
                { upsert: true, new: true }
            );
        }

        // Update cast if provided
        const castDocs = cast ? await Promise.all(cast.map(async (actor) => {
            return await Person.findOneAndUpdate(
                { name: actor },
                { name: actor },
                { upsert: true, new: true }
            );
        })) : null;
        
        const updateData = {
            ...movieData,
            director: directorDoc?._id,
            // Only set `cast` if `castDocs` is not null
            ...(castDocs && { cast: castDocs.map(doc => doc._id) })
        };
        
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('director', 'name').populate('cast', 'name');
        

        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        const id=req.params.id;
        const validityCheck=mongoose.Types.ObjectId.isValid(id);
        if (!validityCheck) {
            return res.status(500).json({ message: "Invalid Id Format" });
        }
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
