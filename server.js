var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/reviews/:name', function (req, res) {
//  controller.reviews(req.params.name, res);
  console.log(req.params);
  var template = 'reviews/' + req.params.name;
  res.render(template);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});