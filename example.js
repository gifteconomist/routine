var _ = require('lodash');
var request = require('request');

var html = '<div>';

request('http://localhost:3000/search', function (error, response, body) {
//  console.log(searchResults);
  var searchResults = JSON.parse(body);
//  console.log(typeof(searchResults));
  _.forEach(searchResults, function(result){
    var linkItem = '<a href="' + result['url'] + '">';
    linkItem += result['title'] + '</a>';
    html += linkItem;
  });

  html += '</div>'

  console.log("html:", html);
});



