const Bookshelf = require('../bookshelf');
require('./directors')
require('./actors')

const Movie = Bookshelf.Model.extend({
  tableName: 'movies',
  hasTimestamps: true,
  director: function() {
    return this.belongsTo('Director');
  },
  actors: function() {
    return this.belongsToMany('Actor');
  }
});

module.exports = Bookshelf.model('Movie', Movie);
