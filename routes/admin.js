const express = require('express');
const router = express.Router();
const { addMovie, updateMovie, deleteMovie, viewStats } = require('../controllers/adminController');
const authenticateUser = require('../middlewares/auth');
const authorizeAdmin = require('../middlewares/admin');

// Movie management
router.post('/movies',authenticateUser,authorizeAdmin, addMovie);
router.put('/movies/:id', authenticateUser, authorizeAdmin, updateMovie);
router.delete('/movies/:id', authenticateUser, authorizeAdmin, deleteMovie);

// View site statistics
router.get('/stats', authenticateUser, authorizeAdmin, viewStats);

module.exports = router;
