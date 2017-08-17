var express = require('express');
var router = express.Router();
var Directors = require('../models/directors')

async function getDirector(id) {
  return Directors.where({ id: id }).fetch();
}

async function addDirector(d) {
  return new Directors(d).save();
}

async function updateDirector(id, body) {
  let director = await Directors.where({
    id: id
  }).fetch();

  if (director != null) {
    const updates = {};

    if (body.first_name) {
      updates.first_name = body.first_name;
    }

    if (body.last_name) {
      updates.last_name = body.last_name;
    }

    return director.set(updates).save();
  }

  return false;
}

async function deleteDirector(id) {
  return Directors.where({
    id: id
  }).destory();
}

// GET ALL THE DIRECTORS
router.get('/', function(req, res, next) {
  Directors.fetchAll().then(directors => {
      res.json(directors.toJSON());
    })
    .catch(error => {
      next(error);
    });
});

// CREATE A NEW DIRECTOR
router.post('/', function(req, res, next) {
  addDirector(req.body).then((d) => {
    res.status(200).send(`Director: ${req.body.first_name} ${req.body.last_name} Added`);
  });
});

// UPDATE A DIRECTOR WITH ID=?
router.patch('/:id', function(req, res, next) {
  updateDirector(req.params.id, req.body)
  .then((d) => {
    if (d) {
      res.status(200).send(`Director(${req.params.id}) Updated`);
    } else {
      res.status(404).send('not found');
    }
  });
});

// DELETE A DIRECTOR WITH ID=?
router.delete('/:id', function(req, res, next) {
  deleteDirector(req.params.id)
  .then((d) => {
    res.status(200).send("Director deleted.");
  });
});

// GET A DIRECTOR WITH ID=?
router.get('/:id', function(req, res, next) {
  getDirector(req.params.id)
  .then((d) => {
    if (d == null) {
      res.status(404).send("not found");
    } else {
      res.json(d.toJSON());
    }
  });
});

module.exports = router;
