function emptyTables(knex, Promise) {
  return Promise.all([
    knex('awards_movies').del(),
    knex('awards').del()
  ]);
}

function addAwards(knex) {
  return knex('awards').insert([
    { id: 1, name: 'Oscar' },
    { id: 2, name: 'Sundance' },
    { id: 3, name: 'Golden Globe' },
    { id: 4, name: 'People\'s Choice' }
  ]);
}

function addAwardsMovies(knex) {
  return knex('movies').where({
    name: 'Inception'
  }).select('id')
  .then(results => {
    return knex('awards_movies').insert([
      { id: 1, movie_id: results[0].id, award_id: 1, award_date: '2017-08-14' }
    ]);
  });
}

// function readFromFile(knex) {
//   knex('movies').raw('select * from movies')
//   lineReader.on('line', function (line) {
//     let splitLine = line.split('\t');
//     let row = {id:line[0], name: line[1], release_date: line[2], created: line[3], director_id: line[4]};
//     knex(movies).insert([row]);
//   });
// }

exports.seed = function(knex, Promise) {
  return emptyTables(knex, Promise)
  .then(() => addAwards(knex))
  .then(() => addAwardsMovies(knex));
};
