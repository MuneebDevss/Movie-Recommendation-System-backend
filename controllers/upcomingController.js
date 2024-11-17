const UpcomingMovie = require('../models/UpcomingMovie');
const Notification = require('../models/Notification');

// Fetch all upcoming movies
exports.getUpcomingMovies = async (req, res) => {
    try {
        const upcomingMovies = await UpcomingMovie.find().sort({ releaseDate: 1 });
        res.status(200).json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new upcoming movie (admin only)
exports.addUpcomingMovie = async (req, res) => {
    try {
        const movie = new UpcomingMovie(req.body);
        await movie.save();
        res.status(201).json({ message: 'Upcoming movie added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Set a reminder for an upcoming movie
exports.setReminder = async (req, res) => {
    try {
        const {notificationType} = req.body;
        const userId=req.user.id;
        const movieId = req.params.id;

        // Check if notification already exists for this user and movie
        const existingNotification = await Notification.findOne({ userId, movieId, notificationType });
        if (existingNotification) {
            return res.status(400).json({ message: 'Reminder already set for this movie' });
        }

        // Create a new notification
        const notification = new Notification({ userId, movieId, notificationType });
        await notification.save();

        res.status(201).json({ message: 'Reminder set successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch user notifications
exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ userId, status: 'pending' })
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
