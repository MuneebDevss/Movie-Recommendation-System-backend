const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, addToWishlist, removeFromWishlist } = require('../controllers/userController');
const authenticateUser = require('../middlewares/auth');

// User registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

// User profile management
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);

// Wishlist management
router.post('/wishlist/:movieId', authenticateUser, addToWishlist);
router.delete('/wishlist/:movieId', authenticateUser, removeFromWishlist);

module.exports = router;
