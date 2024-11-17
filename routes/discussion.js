const express = require('express');
const router = express.Router();
const { postComment, replyToComment, getDiscussion } = require('../controllers/discussionController');
const authenticateUser = require('../middlewares/auth');

router.post('/:movieId/comment', authenticateUser, postComment);
router.post('/:movieId/comment/:commentId/reply', authenticateUser, replyToComment);
router.get('/:movieId/discussion', getDiscussion);

module.exports = router;