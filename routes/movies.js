var express = require('express');
var router = express.Router();
var Directors = require('../models/directors')

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
  console.log(req.body);
  new Directors(req.body).save();
  res.status(200).send(`Director: ${req.body.first_name} ${req.body.last_name} Added`);
});

// UPDATE A DIRECTOR WITH ID=?
router.patch('/:id', function(req, res, next) {
  Directors.where({ id: req.params.id }).fetch()
  .then((director) => {
    if (director !== null) {
      let updates = {};

      if (req.body.first_name) {
        updates.first_name = req.body.first_name;
      }
      if (req.body.last_name) {
        updates.last_name = req.body.last_name;
      }

      director.set(updates).save().then(() => {
        res.status(200).send(`Director(${req.params.id}): ${req.body.first_name} ${req.body.last_name} Updated`);
      });
    } else {
      res.status(404).send("not found");
    }
  });
});

// DELETE A DIRECTOR WITH ID=?
router.delete('/:id', function(req, res, next) {
  Directors.where({ id: req.params.id }).destroy()
  .then(() => {
    res.status(200).send("Director deleted.");
  });
});

// GET A DIRECTOR WITH ID=?
router.get('/:id', function(req, res, next) {
  Directors.where({
    id: req.params.id
  }).fetch()
  .then(director => {
    if (director == null) {
      res.status(404).send("not found");
    } else {
      res.json(director.toJSON());
    }
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
