var express = require('express'),
router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    var authenticationController = require('../controllers/authenticationController');
    
    var MoviesController = require('../controllers/movies');
    var UsersController = require('../controllers/users');

    router.post('/signin', authenticationController.signIn);
    router.post('/signup', authenticationController.signUp);
    //GET all movies
    router.route('/movies')
  .get(MoviesController.getMovies)
  //GET all users
  router.route('/users')
    .get(UsersController.getUsers)
   .post(UsersController.createUser)
  //create user


  //show user
  router.route('/:id')
  .post(UsersController.showUser)


  module.exports = router