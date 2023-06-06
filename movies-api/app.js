const bodyParser = require('body-parser');
const express = require('express');
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
	res.render('index1.ejs');
})

app.post('/', function (req, res) {
	let title = req.body.title;
	let year = req.body.year;
	if(year) url = `https://www.omdbapi.com/?apikey=6e520e61&t=${title}&y=${year}`;
	else url = `https://www.omdbapi.com/?apikey=6e520e61&t=${title}`;
	
		https.get(url, function (response) {
			console.log(response.statusCode);
			let chunks = [];
			response.on('data', function (chunk) {
				chunks.push(chunk)
			})
	
			response.on('end', function () {
				const data = Buffer.concat(chunks)
				var details = JSON.parse(data)
				console.log(details);
				let title = details.Title;
				let language = details.Language;
				let year = details.Released;
				let director = details.Director;
				let plot = details.Plot;
				let poster = details.Poster;
				let imdb = details.imdbRating;
				let actors = details.Actors;
				let genre = details.Genre;
				console.log(title)
				if(title == undefined){
					res.send('movie not found');
				}else{
					res.render('index.ejs', { title: title, language: language, year: year, director: director,plot: plot, poster: poster, imdb: imdb, actors: actors, genre: genre});
				}
			});
		})
})

app.listen(3000, function () {
	console.log('server started at port 3000...');
})

// fetch(url)
// 		.then((object) => {
// 			return object.json();
// 		})
// 		.then((details) => {
// 			console.log(details);
// 				let language = details.Language;
// 				let year = details.Released;
// 				let director = details.Director;
// 				let plot = details.Plot;
// 				let poster = details.Poster;
// 				let imdb = details.imdbRating;
// 				let actors = details.Actors;
// 				let genre = details.Genre;
// 				console.log(title)
// 				if(title == undefined){
// 					res.send('movie not found');
// 				}else{
// 					res.render('index.ejs', { title: title, language: language, year: year, director: director,plot: plot, poster: poster, imdb: imdb, actors: actors, genre: genre});
// 				}
// 	    })