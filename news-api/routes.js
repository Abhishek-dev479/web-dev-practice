const express = require('express');
const router = express.Router();

const {deleteBookmark, addBookmark, showBookmarks, getBookmarkData, searchBookmark, 
    postRouter, getRouter, getData} = require('./controllers');

router.get('/', getRouter);
router.post('/', postRouter);
router.get('/bookmark/:i', searchBookmark, addBookmark);
router.get('/bookmarks', showBookmarks);
router.get('/bookmarks/remove/:i', deleteBookmark);

module.exports = router;