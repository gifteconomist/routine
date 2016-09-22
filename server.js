require('dotenv').config();

var express = require('express');
var app = express();

// require controllers
var review = require('./server/controllers/Review');
var reviews = require('./server/controllers/Reviews');
var feeds = require('./server/controllers/Feed');
var contributors = require('./server/controllers/Contributors')
 
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public')


// Middleware

// Redirects *.html urls to non .html version
app.use(function (req, res, next) {
  var url = req.url;
  var ending = url.substring(url.length - 5, url.length);
  console.log(url)
  if (ending === '.html' && url != 'google92ffbcadb4e54db4.html') {
    url = url.replace(ending, '');
    return res.redirect(url);
  }
  next();
});

// Routes

app.get('/', function (req, res) {
  feeds.show(req, res);
});

app.get('/reviews', function (req, res) {
  reviews.show(req, res);
});

app.get('/reviews/:name', function (req, res) {
  review.show(req, res);
});

app.get('/contributors/:slug', function(req, res) {
  contributors.show(req, res);
});

app.get('/about', function(req, res) {
   res.render('about');
})


var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Routine Dev <3');
  console.log('Listening on: ', port);
});
