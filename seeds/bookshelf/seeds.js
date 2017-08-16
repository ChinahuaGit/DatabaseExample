const Director = require('../../models/directors');
const Movie = require('../../models/movies');
const Actor = require('../../models/actors');

function fullName(person) {
  return person.first_name + ' ' + person.last_name;
}

async function seed() {
  await Actor.where('id', '!=', 0).destroy();
  await Movie.where('id', '!=', 0).destroy();
  await Director.where('id', '!=', 0).destroy();

  const CN = await new Director({first_name: 'Christopher', last_name: 'Nolan'}).save();

  const [Batman, Inception] = await Promise.all([
    CN.movies().create(new Movie({ name: 'Inception', release_date: '2016-01-04' })),
    CN.movies().create(new Movie({ name: 'Batman Begins', release_date: '2008-01-04' }))
  ]);

  await Movie.fetchAll({ withRelated: ['actors','director'] })
  .then(movies => movies.forEach(movie => console.log(movie.toJSON())));
  process.exit(0);  // disconnect from database
}

try {
  seed();
}
catch(err) {
  console.error('ERROR:', err);
  process.exit(1);
}
