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

  const [CN, MB] = await Promise.all([
    new Director({ first_name: 'Christopher', last_name: 'Nolan' }).save(),
    new Director({ first_name: 'Michael', last_name: 'Bay' }).save()
  ]);

  const [LD, CB] = await Promise.all([
    new Actor({ first_name: 'Leonardo', last_name: 'Di Caprio' }).save(),
    new Actor({ first_name: 'Christian', last_name: 'Bale' }).save()
  ]);

  await Promise.all([
    CN.movies().create(new Movie({ name: 'Inception', release_date: '2016-01-04' })),
    CN.movies().create(new Movie({ name: 'Batman Begins', release_date: '2008-01-04' })),
    MB.movies().create(new Movie({ name: 'Transformers', release_date: '2008-01-04' }))
  ]);

  const results = await Promise.all([
    LD.movies().attach(await Movie.where('name', '=', 'Inception').fetch()),    // inception.actors().attach(LD)
    CB.movies().attach(await Movie.where('name', '=', 'Batman Begins').fetch())     // batman.actors().attach(CB)
  ]);

  // await transformers.set({ name: 'Transformers2' }).save()

  await Movie.where('release_date', '<', "2010-01-01").fetchAll({ withRelated: ['actors', 'director'] })
  .then(movies => movies.forEach(movie => console.log(movie.toJSON())));
  process.exit(0);  // disconnect from database
}

try {
  seed();
} catch(err) {
  console.error('ERROR:', err);
  process.exit(1);
}
