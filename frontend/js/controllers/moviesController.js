angular
.module("final-project")
.controller("MovieController", MovieController)
.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

MovieController.$inject = ["$resource", '$filter', 'TokenService', 'Movie','$state', '$stateParams'];

function MovieController($resource, $filter, TokenService, Movie, $state, $stateParams){
  var orderBy = $filter('orderBy');
  var self = this;
  
  self.text = ""
  self.allMovies   = [];
  self.predicate   = '-title';
  self.reverse     = true;
  self.letterLimit = 200;
  self.myMovie     = [];
  self.movie       = null;

  self.order = function(predicate) {
    self.reverse = (self.predicate === predicate) ? !self.reverse : false;
    self.predicate = predicate;
  }

  self.onFilter = function(input) {
    if(input){
      Movie.search({ query: input }, function(result){
        self.allMovies = result
      });
    } else {
      self.allMovies = [];
      input = "";
    }  
  }

  self.showMovie = function(movie){
    if (TokenService.isLoggedIn()) {
      self.movie = movie;
    }
  }

  self.resetMovie = function(){
    self.movie = null;
  }

  self.getMovies = function() {
    if (TokenService.isLoggedIn()) {
      Movie.search({ query: "star wars"}, function(result) {
        self.allMovies = result;
      });
    }
  }

  self.getMovies();
}