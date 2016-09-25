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
  if (ending === '.html') {
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
});

app.get('/robots.txt', function(req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile('production/robots.txt', {root: './public'});
  } else {
    res.sendFile('staging/robots.txt', {root: './public'}); 
  }
});

app.get('*', function(req, res){
  res.redirect('/');
});

//app.get('/search', function(req, res) {
//  res.json([{
//      title: "Dance 1",
//      url: "/dance-one",
//      contributor: "Grace", 
//    },{
//      title: "Dance 2",
//      url: "/dance-two",
//      contributor: "Grace", 
//    },{
//      title: "Dance 3",
//      url: "/dance-three",
//      contributor: "Grace", 
//    }]);
//});



var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Routine Dev <3');
  console.log('Listening on: ', port);
});
