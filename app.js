const Movies = require('./models/movies');
const Directors = require('./models/directors');

Movies.fetchAll({ withRelated: ['actors', 'director'] })
.then(movies => movies.forEach(movie => console.log(movie.toJSON())));

Directors.fetchAll({ withRelated: 'movies' })
.then(directors => directors.forEach(director => console.log(director.toJSON())));
