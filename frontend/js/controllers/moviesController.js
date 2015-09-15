angular
.module("final-project")
.controller("MovieController", MovieController)
.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

MovieController.$inject = ["$resource", '$filter', 'TokenService', 'Movie'];

function MovieController($resource, $filter, TokenService, Movie){
  var orderBy = $filter('orderBy');
  var self = this;
  
  self.text = ""
  self.movie_id  = [];
  self.allMovies = [];
  self.predicate = '-title';
  self.reverse   = true;
  self.overviewLimit = 100;


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

  self.getMovies = function() {
    if (TokenService.isLoggedIn()) {
      Movie.search({ query: "star wars"}, function(result) {
        self.allMovies = result;
      });
    }
  }

  self.getMovies();

  // console.log(result)
  // for (i=0; i < result.length; i++){
  //   var test = result[i].genre_id
  //   console.log(test)
  // }
}