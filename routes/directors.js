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
  // new Director({ first_name: 'Christopher', last_name: 'Nolan' }).save();
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
