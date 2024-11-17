const express = require('express');
const router = express.Router();
const { createCustomList, addToCustomList, removeFromCustomList, getCustomLists, FollowList } = require('../controllers/customListController');
const authenticateUser = require('../middlewares/auth');

router.post('/custom-list', authenticateUser, createCustomList);
router.post('/custom-list/:listId/add/:movieId', authenticateUser, addToCustomList);
router.post('/custom-list/:listId/add', authenticateUser, FollowList);
router.delete('/custom-list/:listId/remove/:movieId', authenticateUser, removeFromCustomList);
router.get('/custom-lists', authenticateUser, getCustomLists);
//get list by id
//de,ete list by id

module.exports = router;
