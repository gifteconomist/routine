require('dotenv').config();

var express = require('express');
var app = express();

// require controllers
var reviews = require('./server/controllers/Reviews');
 
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/reviews/:name', function (req, res) {
  reviews.show(req, res);
});



app.listen(3000, function () {
  console.log('Routine Dev <3');
});