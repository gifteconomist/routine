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
      
      res.render(template, authorData);
    })
  }
}