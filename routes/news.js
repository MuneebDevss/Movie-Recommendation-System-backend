const express = require('express');
const { getAllNewsArticles, addNewsArticle, getNewsArticleById } = require('../controllers/newsController');
const router = express.Router();
const authorizeAdmin=require('../middlewares/admin');
// Get all news articles
router.get('/news', getAllNewsArticles);

// Get a single news article by its ID
router.get('/news/:id', getNewsArticleById);

// Add a new news article (only accessible to admin or authorized users)
router.post('/news', authorizeAdmin,addNewsArticle);

module.exports = router;
