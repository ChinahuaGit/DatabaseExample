var express = require('express');
var router = express.Router();
var Directors = require('../models/directors')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Directors.fetchAll().then(directors => {
    res.json(directors.toJSON());
  })
  .catch(error => {
    next(error);
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  new Directors(req.body).save();
  res.status(200).send(`Director: ${req.body.first_name} ${req.body.last_name} Added`);
});

router.patch('/:id', function(req, res, next) {
  Directors.where({ id: req.params.id }).fetch()
  .then((director) => {
    if (director !== null) {
      director.set({first_name: req.body.first_name, last_name: req.body.last_name}).save().then(() => {
        res.status(200).send(`Director(${req.params.id}): ${req.body.first_name} ${req.body.last_name} Updated`);
      });
    } else {
      res.status(404).send("not found");
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Directors.where({ id: req.params.id }).destroy()
  .then(() => {
    res.status(200).send("Director deleted.");
  });
});

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
