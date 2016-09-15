require('dotenv').config();

var express = require('express');
var app = express();

// require controllers
var reviews = require('./server/controllers/Reviews');
var feeds = require('./server/controllers/Feed');
 
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public')

app.get('/', function (req, res) {
  feeds.show(req, res);
});

app.get('/reviews/:name', function (req, res) {
  reviews.show(req, res);
});


var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Routine Dev <3');
  console.log('Listening on: ', port);
});