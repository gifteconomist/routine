var _ = require('lodash');
var moment = require('moment');
var database = require('../modules/Database');

module.exports = {
  show: function(req, res) {
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
      
      reviewData.date = moment(reviewData.date).format('MMMM Do, YYYY');
      return reviewData;
    }).then(function(reviewData){
      
      var query = {
        order: [['date', 'DESC']], 
        limit: 3,
        where: {
          name: {
            $ne: reviewData.name
          }
        }
      }
    
      if (process.env.NODE_ENV === 'production') {
        query.where.active = true;
      }
      
      return database.articles.findAll(query).then(function(articles){
        var articlesData = [];
        _.forEach(articles, function(article) {
          var tempArticle = article.get({plain: true});
          tempArticle.date = moment(tempArticle.date).format('MMMM D YYYY');
          articlesData.push(tempArticle);
        });
        
        return _.set(reviewData, 'relatedContent', articlesData);
      });
    }).then(function(data){
      var template = 'reviews/' + data.name;
      res.render(template, data);
    });
  }
};