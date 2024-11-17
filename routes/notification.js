const express = require('express');
const authAdmin=require('../middlewares/admin');
const authUser=require('../middlewares/auth');
const router = express.Router();
const upcomingController = require('../controllers/upcomingController');

// Upcoming Movies Routes
router.get('/upcoming',upcomingController.getUpcomingMovies);
router.post('/upcoming',authUser,authAdmin, upcomingController.addUpcomingMovie);
router.post('/upcoming/:id/reminder',authUser,upcomingController.setReminder);

// Notification Routes
router.get('/notifications', authUser,upcomingController.getUserNotifications);

module.exports = router;
