const Bookmark = require('./mongoose');
const fetch = require('node-fetch');

let data = [];

async function getData(keyword, fromDate, toDate, sortBy, response){
    let d = new Date();
    let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
    let key = 'india';
    let from = date;
    let to = date;
    let sort = 'publishedAt';
    if(keyword && keyword != '') key = keyword;
    if(fromDate != '') from = fromDate;
    if(toDate != '') to = toDate;
    if(sortBy != '') sort = sortBy;
    let url = `https://newsapi.org/v2/everything?q=${key}&from=${from}&to=${to}&sortBy=${sort}&apiKey=fe72599e42024bcd910f141631eb3a02`;
    try{
        let res = await fetch(url, {method: 'GET'});
        let result = await res.json();
        if(result.status == 'ok'){
            if(result.articles == []){
                response.send('<h1>No news found</h1>');
                return;
            } 
            else{
                data = result.articles;
                return result;
            }
        }
        else{
            response.send(result.message);
            return;
        }
    }   
    catch(e){
        response.render('error.ejs');
        return;
    }
}

function addBookmark(req, res, next){
    let i = req.params.i;
    let a = new Bookmark({
        title: data[i].title,
        urlToImage: data[i].urlToImage,
        description: data[i].description,
        url: data[i].url
    })
    a.save();
}

async function showBookmarks(req, res, next){
    console.log('bookmarks loading....');
    try{
        let result = await getBookmarkData();
        if(result.length == 0) res.send(`You don't have any bookmarks`);
        else{
            res.set('Cache-Control', 'no-store');
            res.render('bookmarks.ejs', {data: result});
        }
    }
    catch(error){
        console.log(error);
        res.status(404).send('Error loading the bookmarks');
    }
}

async function getBookmarkData(){
    let res = await Bookmark.find({});
    console.log(res);
    return res;
}

async function searchBookmark(req, res, next){
    let title =  data[req.params.i].title;
    let present = await Bookmark.find({title: title});
    console.log('=================================================================');
    console.log(present);
    if(present.length == 0){
        console.log('=================================================================');
        next();
    }
    else{
        res.send('bookmark already exists');
    }
}

async function deleteBookmark(req, res, next){
    let i = req.params.i;
    let results = await getBookmarkData();
    let id = results[i]._id;
    let result = await Bookmark.findByIdAndDelete(id);
    console.log(result);
    res.redirect('/bookmarks');
}

async function getRouter(req, res, next){
    try{
        let result = await getData('', '', '', '', res);
        if(!result) return;
        res.render('index.ejs', {data: result.articles});
    }
    catch(e){
        console.log(e);
        res.status(404).render('error.ejs');
    }
};

async function postRouter(req, res, next){
    try{
        let keyword = req.body.keyword;
        let fromDate = req.body.fromDate;
        let toDate = req.body.toDate;
        let sortBy = req.body.sortBy;
        if(req.body.keyword == '') return;
        let result = await getData(keyword, fromDate, toDate, sortBy, res);
        if(!result){
            return;    
        }
        res.render('index.ejs', {data: result.articles});
    }
    catch(e){
        console.log(e);
        res.status(404).render('error.ejs');
    }
};

module.exports = {deleteBookmark, 
    addBookmark, showBookmarks, getBookmarkData,
    searchBookmark, postRouter, getRouter, getData};

