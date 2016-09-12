var database = require('../modules/Database');

module.exports = {
  show: function(req, res) {
    console.log("in show");
    console.log(req.params);
    var name = req.params.name;
    
    database.articles.findOne({
      where: {
        name: name,
      },
      include: [{
        model: database.contributor
      }]
    }).then(function(review){
      var reviewData = review.get({plain: true});
      console.log("Got the article!!!!", reviewData);
      
      var template = 'reviews/' + name;
      res.render(template, reviewData);
    });
  }
};