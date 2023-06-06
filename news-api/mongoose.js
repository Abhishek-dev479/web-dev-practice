const mongoose = require('mongoose');

// Connect to Database;
mongoose.connect('mongodb://localhost:27017/newsDB');
const bookmarkSchema = new mongoose.Schema({
    title: String,
    urlToImage: String,
    description: String,
    url: String
})

let Bookmark = mongoose.model('bookmark', bookmarkSchema);

module.exports = Bookmark;