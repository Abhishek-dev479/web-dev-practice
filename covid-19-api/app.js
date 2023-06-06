const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');



app.get('/',function(req,res){
    res.render('index.ejs',{countryName: ' ', activeCases: ' ', recoveredCases: ' ', totalCases: ' ', totalDeaths: ' '});
});

app.post('/',function(req,res){
    const options = {
        "method": "GET",
        "hostname": "covid-193.p.rapidapi.com",
        "port": null,
        "path": `/statistics?country=${req.body.country}`,
        "headers": {
            "X-RapidAPI-Key": "7216bfa068msh7a3b080ef5c4c9ap1c1140jsn5ea3450803a5",
            "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
            "useQueryString": true
        }
    };

    const a = http.request(options, function (response) {
        const chunks = [];
    
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        response.on("end", function () {
            const body = Buffer.concat(chunks);
            const details = JSON.parse(body);
            console.log(details);
            if(details.response.length != 0){
                let krk = details.response[0];
            console.log(krk.country);
            let countryName = krk.country;
            let activeCases = krk.cases.active;
            let recoveredCases = krk.cases.recovered;
            let totalCases = krk.cases.total;
            let totalDeaths = krk.deaths.total;
            res.render('index.ejs',{countryName: countryName, activeCases: activeCases, recoveredCases: recoveredCases, totalCases: totalCases, totalDeaths: totalDeaths});
            }else{
                res.send('Data Not Found!');
            }
        });
    });
    a.end();
});


app.listen(3000,function(){
    console.log('Server started on port 3000');
})