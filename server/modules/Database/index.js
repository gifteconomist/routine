var Sequelize = require('sequelize');

var database = new Sequelize(
  'routine',
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    raw: true,
    define: {
        timestamps: false
    }
  }
);

var Articles = database.define('articles', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true
  },
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  title: Sequelize.STRING,
  subtitle:Sequelize.STRING,
  indexTitle: Sequelize.STRING,
  indexSubtitle: Sequelize.STRING,
  date: Sequelize.DATE,
  contributorId: Sequelize.STRING,
  leadImage: Sequelize.STRING,
  secondImage: Sequelize.STRING,
  thirdImage: Sequelize.STRING,
});

var Contributor = database.define('contributors', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true
  },
  name: Sequelize.STRING,
  bio: Sequelize.STRING,
  fullBio: Sequelize.STRING,
  website: Sequelize.STRING,
  headshot: Sequelize.STRING
});

Articles.belongsTo(Contributor, {foreignKey : 'contributorId'});

module.exports = {
  articles: Articles,
  contributor: Contributor,
}



