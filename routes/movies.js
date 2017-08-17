var express = require('express');
var router = express.Router();
var Movies = require('../models/movies')

// GET ALL THE NOVIES
router.get('/', function(req, res, next) {
  Movies.fetchAll({withRelated: ['actors', 'director']}).then(movies => {
    res.json(movies.toJSON());
  })
  .catch(error => {
    next(error);
  });
});

// CREATE A NEW NOVIE
router.post('/', function(req, res, next) {
  new Movies(req.body).save();
  res.status(200).send(`Movie: ${req.body.first_name} ${req.body.last_name} Added`);
});

router.post('/director/:id', function (req, res, next) {
  let movie = {
    name: req.body.name,
    release_date: req.body.release_date,
    director_id: req.params.id
  };

  new Movies(movie).save().then(m => {
    res.status(200).send(`Movie: ${req.body.name} ${req.body.release_date} Added`);
  });
});

// UPDATE A NOVIE WITH ID=?
router.patch('/:id', function(req, res, next) {
  Movies.where({ id: req.params.id }).fetch()
  .then((movie) => {
    if (movie !== null) {
      let updates = {};

      if (req.body.first_name) {
        updates.first_name = req.body.first_name;
      }
      if (req.body.last_name) {
        updates.last_name = req.body.last_name;
      }

      movie.set(updates).save().then(() => {
        res.status(200).send(`Movie(${req.params.id}): ${req.body.first_name} ${req.body.last_name} Updated`);
      });
    } else {
      res.status(404).send("not found");
    }
  });
});

// DELETE A NOVIE WITH ID=?
router.delete('/:id', function(req, res, next) {
  Movies.where({ id: req.params.id }).destroy()
  .then(() => {
    res.status(200).send("Movie deleted.");
  });
});

// GET A NOVIE WITH ID=?
router.get('/:id', function(req, res, next) {
  Movies.where({
    id: req.params.id
  }).fetch({withRelated: ['actors', 'director']})
  .then(movie => {
    if (movie == null) {
      res.status(404).send("not found");
    } else {
      res.json(movie.toJSON());
    }
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
