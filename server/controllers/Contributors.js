var _ = require('lodash');
var moment = require('moment');
var database = require('../modules/Database');

module.exports = {
  show: function(req, res) {
    console.log(req.params);
    var slug = req.params.slug;
    
    database.contributor.findOne({
      where: {
        slug: slug,
      },
      include: [{
        model: database.articles
      }] 
    }).then(function(author){
      var authorData = author.get({plain:true});
      console.log(authorData);
      var template = 'contributors/' + 'contributor-template';
      
      _.map(authorData.articles, function(article) {
        article.date = moment(article.date).format('MMMM D YYYY');
      });
      
      res.render(template, authorData);
    })
  }
}