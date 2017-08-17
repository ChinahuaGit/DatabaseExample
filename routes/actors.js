const express = require('express');
const Actors = require('../models/actors');

const router = express.Router();

async function getActor(id) {
  return Actors.where({ id: id }).fetch();
}

async function addActor(d) {
  return new Actors(d).save();
}

async function updateActor(id, body) {
  let actor = await Actors.where({
    id: id
  }).fetch();

  if (actor != null) {
    const updates = {};

    if (body.first_name) {
      updates.first_name = body.first_name;
    }

    if (body.last_name) {
      updates.last_name = body.last_name;
    }

    return actor.set(updates).save();
  }

  return false;
}

async function deleteActor(id) {
  return Actors.where({
    id: id
  }).destory();
}

// GET ALL THE DIRECTORS
router.get('/', function(req, res, next) {
  Actors.fetchAll().then(actors => {
      res.json(actors.toJSON());
  })
  .catch(error => {
    next(error);
  });
});

// CREATE A NEW DIRECTOR
router.post('/', function(req, res, next) {
  addActor(req.body).then((d) => {
    res.status(200).send(`Actor: ${req.body.first_name} ${req.body.last_name} Added`);
  });
});

// UPDATE A DIRECTOR WITH ID=?
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

// DELETE A DIRECTOR WITH ID=?
router.delete('/:id', function(req, res, next) {
  deleteActor(req.params.id)
  .then((d) => {
    res.status(200).send("Actor deleted.");
  });
});

// GET A DIRECTOR WITH ID=?
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
