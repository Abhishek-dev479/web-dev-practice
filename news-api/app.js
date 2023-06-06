const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
const router = require('./routes');
const mongoose = require('mongoose');

// Connect to Database;
// mongoose.connect('mongodb://localhost:27017/newsDB');
// const bookmarkSchema = new mongoose.Schema({
//     title: String,
//     urlToImage: String,
//     description: String,
//     url: String
// })

// let Bookmark = mongoose.model('bookmark', bookmarkSchema);

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(router);

// let data = [];

// async function getData(keyword, fromDate, toDate, sortBy, response){
//     let d = new Date();
//     let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
//     let key = 'india';
//     let from = date;
//     let to = date;
//     let sort = 'publishedAt';
//     if(keyword && keyword != '') key = keyword;
//     if(fromDate != '') from = fromDate;
//     if(toDate != '') to = toDate;
//     if(sortBy != '') sort = sortBy;
//     let url = `https://newsapi.org/v2/everything?q=${key}&from=${from}&to=${to}&sortBy=${sort}&apiKey=fe72599e42024bcd910f141631eb3a02`;
//     try{
//         let res = await fetch(url, {method: 'GET'});
//         let result = await res.json();
//         if(result.status == 'ok'){
//             if(result.articles == []){
//                 response.send('<h1>No news found</h1>');
//                 return;
//             } 
//             else{
//                 data = result.articles;
//                 return result;
//             }
//         }
//         else{
//             response.send(result.message);
//             return;
//         }
//     }   
//     catch(e){
//         response.render('error.ejs');
//         return;
//     }
// }

// async function getRouter(req, res, next){
//     try{
//         let result = await getData('', '', '', '', res);
//         if(!result) return;
//         res.render('index.ejs', {data: result.articles});
//     }
//     catch(e){
//         console.log(e);
//         res.status(404).render('error.ejs');
//     }
// };

// async function postRouter(req, res, next){
//     try{
//         let keyword = req.body.keyword;
//         let fromDate = req.body.fromDate;
//         let toDate = req.body.toDate;
//         let sortBy = req.body.sortBy;
//         if(req.body.keyword == '') return;
//         let result = await getData(keyword, fromDate, toDate, sortBy, res);
//         if(!result){
//             return;    
//         }
//         res.render('index.ejs', {data: result.articles});
//     }
//     catch(e){
//         console.log(e);
//         res.status(404).render('error.ejs');
//     }
// };

const port = process.env.PORT || 3000;

// app.get('/', getRouter);

// app.post('/', postRouter);

// app.get('/bookmark/:i', searchBookmark, (req, res) => {
//     let i = req.params.i;
//     let a = new Bookmark({
//         title: data[i].title,
//         urlToImage: data[i].urlToImage,
//         description: data[i].description,
//         url: data[i].url
//     })
//     a.save();
// });

// async function showBookmarks(req, res, next){
//     console.log('bookmarks loading....');
//     try{
//         let result = await getBookmarkData();
//         if(result.length == 0) res.send(`You don't have any bookmarks`);
//         else{
//             res.set('Cache-Control', 'no-store');
//             res.render('bookmarks.ejs', {data: result});
//         }
//     }
//     catch(error){
//         console.log(error);
//         res.status(404).send('Error loading the bookmarks');
//     }
// }

// app.get('/bookmarks', showBookmarks);

// async function getBookmarkData(){
//     let res = await Bookmark.find({});
//     console.log(res);
//     return res;
// }

// async function searchBookmark(req, res, next){
//     let title =  data[req.params.i].title;
//     let present = await Bookmark.find({title: title});
//     console.log('=================================================================');
//     console.log(present);
//     if(present.length == 0){
//         console.log('=================================================================');
//         next();
//     }
//     else{
//         res.send('bookmark already exists');
//     }
// }

// async function deleteBookmark(req, res, next){
//     let i = req.params.i;
//     let results = await getBookmarkData();
//     let id = results[i]._id;
//     let result = await Bookmark.findByIdAndDelete(id);
//     console.log(result);
//     res.redirect('/bookmarks');
// }

// app.get('/bookmarks/remove/:i', deleteBookmark);

// app.get('/:i', (req, res) => {
//     let i = req.params.i;
//     console.log(data[i]);
//     if(data) res.render('single.ejs', {data: data[i], index: i, bookmark: false});
//     else{
//         res.render('error.ejs');
//     }
// })

// app.get('/:i/open', (req, res) => {
//     let i = req.params.i;
//     Bookmark.find({})
//     .then((result) => {
//         console.log(result[i]);
//         if(result) res.render('single.ejs', {data: result[i], index: i, bookmark: true});
//     })
// })


app.listen(port, (err) => {
    if(err) console.log(err);
    console.log('Server started on port 3000');
})











