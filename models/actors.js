const Bookshelf = require('../bookshelf');
require('./movies')

const Actor = Bookshelf.Model.extend({
  tableName: 'actors',
  hasTimestamps: true,
  movies: function () {
    return this.belongsToMany('Movie');
  }
});

module.exports = Bookshelf.model('Actor', Actor);
