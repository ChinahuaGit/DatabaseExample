function emptyTables(knex, Promise) {
  return Promise.all([
    knex('actors_movies').del(),
    knex('movies').del(),
    knex('directors').del(),
    knex('actors').del()
  ]);
}

function addActors(knex) {
  return knex('actors').insert([
    { id: 1, first_name: 'Leonardo', last_name: 'Di Caprio' },
    { id: 2, first_name: 'Al', last_name: 'Pacino' },
    { id: 3, first_name: 'Denzel', last_name: 'Washington' }
  ]);
}

function addDirectors(knex) {
  return knex('directors').insert([
    { id: 1, first_name: 'Martin', last_name: 'Scorsese' },
    { id: 2, first_name: 'Christopher', last_name: 'Nolan' }
  ]);
}

function addMovies(knex) {
  return knex('movies').insert([
    { id: 1, name: 'Inception', release_date: '2017-07-21', director_id: 2 }
  ]);
}

function addActorsMovies(knex) {
  return knex('actors_movies').insert([
    { id: 1, actor_id: 1, movie_id: 1 }
  ]);
}

exports.seed = function(knex, Promise) {
  return emptyTables(knex, Promise)
  .then(() => Promise.all([
    addActors(knex),
    addDirectors(knex)
  ]))
  .then(() => addMovies(knex))
  .then(() => addActorsMovies(knex));
};
