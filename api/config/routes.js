var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var MoviesController = require('../controllers/movies');
router.route('/movies')
  //GET all characters
  .get(MoviesController.getMovies)

module.exports = router