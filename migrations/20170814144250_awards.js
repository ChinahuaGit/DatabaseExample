function createAwards(knex) {
  return knex.schema.createTableIfNotExists("awards", function(table) {
    table.increments().primary();
    table.string('name', 30).notNull();
    table.timestamps(true);
  });
}

function createAwardsMovies(knex) {
  return knex.schema.createTableIfNotExists("awards_movies", function(table) {
    table.increments().primary();
    table.integer('movie_id').notNull();
    table.integer('award_id').notNull();
    table.date('award_date').notNull();
    table.timestamps(true);
  });
}

exports.up = function(knex, Promise) {
  return createAwards(knex)
  .then(() => createAwardsMovies(knex));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('awards_movies')
  .then(() => knex.schema.dropTableIfExists('awards'));
};
