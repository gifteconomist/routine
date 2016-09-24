var _ = require('lodash');
var moment = require('moment');
var database = require('../modules/Database');

module.exports = {
  show: function(req, res) {
    console.log(req.url);
    var date = req.params.date;
    
    var query = {
      order: [['date', 'DESC']], 
      limit: 10,
      include: [{
        model: database.contributor
      }],
    }
    
    if (process.env.NODE_ENV === 'production') {
      query['where'] = { active: true };
    }
    
    database.articles.findAll(query).then(function(articles){
      var articlesData = [];
      _.forEach(articles, function(article) {
        var tempArticle = article.get({plain: true});
        tempArticle.date = moment(tempArticle.date).format('MMMM D YYYY');
        articlesData.push(tempArticle);
      });

      var template = 'reviews';
      res.render(template, {articles: articlesData});
    });
  }
};
