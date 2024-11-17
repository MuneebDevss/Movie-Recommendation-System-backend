const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        enum: ['Movie', 'Actor', 'Upcoming Projects', 'Industry'],
        required: true,
    },
    publishDate: { type: Date, default: Date.now },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', default: null },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', default: null },
    author: { type: String, required: true },
    source: { type: String, required: true },  // For example, the website or platform where the article was sourced from
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;
