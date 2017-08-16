function createActors(knex) {
  return knex.schema.createTableIfNotExists("actors", function(table) {
    table.increments().primary();
    table.string('first_name', 30).notNull();
    table.string('last_name', 30);
    table.timestamps(true);
  });
}

function createDirectors(knex) {
  return knex.schema.createTableIfNotExists("directors",
   function(table) {
    table.increments().primary();
    table.string('first_name', 30).notNull();
    table.string('last_name', 30);
    table.timestamps(true);
  });
}

function createMovies(knex) {
  return knex.schema.createTableIfNotExists("movies",
   function(table) {
    table.increments().primary();
    table.string('name', 100);
    table.date('release_date').notNull();
    table.integer('director_id').notNull();
    table.timestamps(true);
    table.boolean('active');
    table.foreign('director_id').references('directors.id').onDelete('CASCADE');
  });
}

function createActorsMovies(knex) {
  return knex.schema.createTableIfNotExists("actors_movies",
   function(table) {
    table.increments().primary();
    table.integer('actor_id').notNull();
    table.integer('movie_id').notNull();
    table.foreign('actor_id').references('actors.id').onDelete('CASCADE');
    table.foreign('movie_id').references('movies.id').onDelete('CASCADE');
  });
}

exports.up = function(knex, Promise) {
  return Promise.all([
    createActors(knex),
    createDirectors(knex),
    createMovies(knex),
    createActorsMovies(knex)
   ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('actors_movies'),
    knex.schema.dropTableIfExists('movies'),
    knex.schema.dropTableIfExists('directors'),
    knex.schema.dropTableIfExists('actors')
  ]);
};
