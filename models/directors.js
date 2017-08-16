const Bookshelf = require('../bookshelf');
require('./movies')

const Director = Bookshelf.Model.extend({
  tableName: 'directors',
  hasTimestamps: true,
  movies: function () {
    return this.hasMany('Movie');
  }
});

// module.exports = Owner;
module.exports = Bookshelf.model('Director', Director);
