const express = require('express');
const Actor = require('../models/actors');
const Movie = require('../models/movies');

const router = express.Router();

async function getActor(id) {
  return Actor.where({ id: id }).fetch({withRelated: ['movies']});
}

async function addActor(d) {
  return new Actor(d).save();
}

async function deleteActor(id) {
  return Actor.where({
    id: id
  }).destory();
}

async function addMovieToActor(actor_id, movie_id) {
  let actor = await Actor.where({
    id: actor_id
  }).fetch();

  if (actor != null) {
    let movie = await Movie.where({ id: movie_id }).fetch();
    return actor.movies().attach(movie);
  }

  return false;
}

async function updateActor(actorId, actorUpdates, movies = []) {
  let actor = await Actor.where({
    id: actorId
  }).fetch();

  if (actor != null) {
    await actor.set(actorUpdates).save();
    if (movies.length > 0) {
      let count = await Movie.where('id', 'IN', movies).count();

      if (count !== movies.length) {
        return false;
      }

      //TODO: figure out why it takes a list of IDs
      await actor.movies().attach(movies);
    }
    return true;
  }

  return false;
}

// GET ALL THE ACTORS
router.get('/', function(req, res, next) {
  Actor.fetchAll({withRelated: ['movies']}).then(actors => {
      res.json(actors.toJSON());
  })
  .catch(error => {
    next(error);
  });
});

// CREATE A NEW ACTOR
router.post('/', function(req, res, next) {
  addActor(req.body).then((d) => {
    res.status(200).send(`Actor: ${req.body.first_name} ${req.body.last_name} Added`);
  });
});

router.post('/:actor_id/movie/:movie_id', function(req, res, next) {
  addMovieToActor(req.params.actor_id, req.params.movie_id).then((d) => {
    res.status(200).send(`Movie(${req.params.movie_id}) added to Actor(${req.params.actor_id})`);
  });
});

router.post('/:actor_id', function(req, res, next) {
  let actor = {};
  var movies = [];
  if (req.body.first_name) {
    actor.first_name = req.body.first_name;
  }
  if (req.body.last_name) {
    actor.last_name = req.body.last_name;
  }
  if (req.body.movies) {
    movies = req.body.movies;
  }

  updateActor(req.params.actor_id, actor, movies).then((d) => {
    res.status(200).send(`Movie(${req.params.movie_id}) added to Actor(${req.params.actor_id})`);
  });
});

// UPDATE A ACTOR WITH ID=?
router.patch('/:id', function(req, res, next) {
  updateActor(req.params.id, req.body)
  .then((d) => {
    if (d) {
      res.status(200).send(`Actor(${req.params.id}) Updated`);
    } else {
      res.status(404).send('not found');
    }
  });
});

// DELETE A ACTOR WITH ID=?
router.delete('/:id', function(req, res, next) {
  deleteActor(req.params.id)
  .then((d) => {
    res.status(200).send("Actor deleted.");
  });
});

// GET A ACTOR WITH ID=?
router.get('/:id', function(req, res, next) {
  getActor(req.params.id)
  .then((d) => {
    if (d == null) {
      res.status(404).send("not found");
    } else {
      res.json(d.toJSON());
    }
  });
});

module.exports = router;
