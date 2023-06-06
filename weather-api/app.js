const express = require('express')
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index.ejs',{cityName: ' ', temp: ' ', description: ' ', icon: ' '});
})

app.post('/',function(req,res){
    const q = req.body.cityName;
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=0235f557bd3a080c34ff0766331d5bd7&units=metric`;
    https.get(link,function(response){
        if(response.statusCode == 404){
            res.render('index.ejs',{cityName: 'Uh oh!', temp: 'City not found', description: 'please enter a valid city name', icon: ' '})
        }else{
            response.on('data',function(data){
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                const cityName = weatherData.name;
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                res.render('index.ejs',{cityName: cityName, temp: temp, description: description, icon: img})
            });
        }
    })
})

app.listen(3000,function(){
    console.log('Server Started...');
})