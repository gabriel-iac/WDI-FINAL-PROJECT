var express = require('express'),
router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

    
    var authenticationController = require('../controllers/authenticationController');
    
    var MoviesController = require('../controllers/movies');
    var UsersController = require('../controllers/users');

    router.post('/authorize', authenticationController.login);
    router.post('/join', authenticationController.signup);

    //GET all movies
  router.route('/movies')
    .get(MoviesController.getMovies)
    
    //Get Movie
    router.route('/movies/:id')
      .get(MoviesController.showMovie)
  //GET all users
  router.route('/users')
  .get(UsersController.getUsers)
  .post(UsersController.createUser)
  //create user


  //show user
  router.route('/users/:id')
  .post(UsersController.showUser)


  module.exports = router