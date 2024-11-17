const Discussion = require('../models/Discussion');

// Post a new comment in a movie's discussion
exports.postComment = async (req, res) => {
    try {
        const comment = new Discussion({
            movie: req.params.movieId,
            user: req.user.id,
            comment: req.body.comment
        });
        await comment.save();
        res.status(201).json({ message: 'Comment posted successfully', comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reply to a comment
exports.replyToComment = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.commentId);
        if (!discussion) return res.status(404).json({ message: 'Comment not found' });

        const reply = { user: req.user.id, replyText: req.body.replyText };
        discussion.replies.push(reply);
        await discussion.save();
        res.json({ message: 'Reply added successfully', discussion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all discussions for a movie
exports.getDiscussion = async (req, res) => {
    try {
        const discussions = await Discussion.find({ movie: req.params.movieId }).populate('user', 'username');
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
