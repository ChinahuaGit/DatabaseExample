var express = require('express');
var router = express.Router();
var Directors = require('../models/directors')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Directors.fetchAll().then(directors => {
    res.json(directors.toJSON());
  });
});
router.get('/:id', function(req, res, next) {
  Directors.where({
    id: req.params.id
  }).fetch().then(director => {
    res.json(director.toJSON());
  }).catch(res.status(404).send("not found"));
});

module.exports = router;
