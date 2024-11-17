const CustomList = require('../models/List');
const mongoose=require('mongoose');
// Create a new custom list
exports.createCustomList = async (req, res) => {
    try {
        const { name, movies } = req.body;
        const list = new CustomList({ user: req.user.id, name, movies });
        await list.save();
        res.status(201).json({ message: 'Custom list created successfully', list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a movie to a custom list
exports.addToCustomList = async (req, res) => {
    try {
        const list = await CustomList.findById(req.params.listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

        list.movies.push(req.params.movieId);
        await list.save();
        res.json({ message: 'Movie added to custom list' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a movie from a custom list
exports.removeFromCustomList = async (req, res) => {
    try {
        const list = await CustomList.findById(req.params.listId);
        if (!list) return res.status(404).json({ message: 'List not found' });
        const findmovie = list.movies.filter(movieId => movieId.toString() === req.params.movieId);
if (findmovie.length === 0) {
    res.status(404).json({ message: "Movie not found" });
} else {
    // Movie was found; proceed with your logic here
}

        list.movies = list.movies.filter(movieId => movieId.toString() !== req.params.movieId);
        await list.save();
        res.json({ message: 'Movie removed from custom list' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all custom lists of the logged-in user
exports.getCustomLists = async (req, res) => {
    try {
        const lists = await CustomList.find({ user: req.user.id });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Follow List
exports.FollowList = async (req, res) => {
    try {
        console.log(req.params.listId);

        // Find the existing list by ID
        const existingList = await CustomList.findById(req.params.listId);
        
        if (!existingList) {
            return res.status(404).json({ message: 'List not found' });
        }

        // Check if a list with the same name already exists for the user
        const duplicateList = await CustomList.findOne({
            user: req.user.id,
            name: existingList.name
        });

        if (duplicateList) {
            return res.status(400).json({ message: 'A list with the same name already exists for this user' });
        }

        // Create a new list with the same name and movies as the existing list
        const list = new CustomList({
            user: req.user.id, // The logged-in user's ID
            name: existingList.name,
            movies: existingList.movies
        });

        await list.save();
        res.status(201).json({ message: 'Custom list created successfully', list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
;