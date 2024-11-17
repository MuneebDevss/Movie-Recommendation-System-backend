const NewsArticle = require('../models/News');
const Movie = require('../models/Movie').Movie;  // Optional: Use if you want to reference movie data
const Person = require('../models/Movie').Person;  // Optional: Use if you want to reference person (actor) data

// Get all news articles
exports.getAllNewsArticles = async (req, res) => {
    try {
        const articles = await NewsArticle.find()
            .sort({ publishDate: -1 })  // Sort by most recent first
            .populate('movie', 'title')  // Populate the movie data if available
            .populate('actor', 'name');  // Populate the actor data if available
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single news article by ID
exports.getNewsArticleById = async (req, res) => {
    try {
        const article = await NewsArticle.findById(req.params.id)
            .populate('movie', 'title')
            .populate('actor', 'name');
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new news article
exports.addNewsArticle = async (req, res) => {
    try {
        const { title, content, category, movie, actor, author, source } = req.body;

        // Create new article instance
        const article = new NewsArticle({
            title,
            content,
            category,
            movie,
            actor,
            author,
            source
        });

        await article.save();
        res.status(201).json({ message: 'Article added successfully', article });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
