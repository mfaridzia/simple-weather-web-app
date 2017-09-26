const express    = require('express'); // menggunakan framework express js
const bodyParser = require('body-parser'); // menggunakan package body-parse untuk parsing
const request    = require('request'); // package untuk proses http request client
const app        = express();

// menggunakan API dari https://openweathermap.org
// ubah tanda ******* di apiKey dengan apiKey anda, dengan mendaftar terlebih dahulu di https://openweathermap.org
const apiKey = '**********************';

app.use(express.static('public')); // untuk menggunakan file2 static
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // menggunakan template engine ejs

app.get('/', function(req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res) {
  let city = req.body.city;
  // units=metric untuk celcius
  let url  = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, Silahkan coba lagi!'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main === undefined) {
        res.render('index', {weather: null, error: 'Error, Nama kota tidak ditemukan!'});
      } else {
        let weatherText = `Suhu di kota ${weather.name} adalah ${weather.main.temp} °C `;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(1000, function () {
  console.log('Weather-app berjalan di port 1000!');
});
