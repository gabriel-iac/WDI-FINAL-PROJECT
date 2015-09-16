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
  // self.movie_id  = [];
  self.allMovies = [];
  self.predicate = '-title';
  self.reverse   = true;
  self.letterLimit = 200;
  self.myMovie = [];
  

  // self.limitChar = function(){
    
  //   $(".overview").text(function(index, currentText) {
  //       return currentText.substr(0, 30) + '...';
  //   });
  // }

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


  self.showMovie = function(getMovie){
    if (TokenService.isLoggedIn()) {
      Movie.get({ query: getMovie }, function(result){
        self.myMovie = result.id
      });
    $state.go('show', { id: getMovie.id });
    // self.myMovie = getMovie;
    // console.log(self.myMovie)
  }
  self.myMovie=[];
  }

  self.getMovies = function() {
    if (TokenService.isLoggedIn()) {
      Movie.search({ query: "star wars"}, function(result) {
        self.allMovies = result;
      });
    }
  }

  self.getMovies();
  // self.limitChar();
  // console.log(result)
  // for (i=0; i < result.length; i++){
  //   var test = result[i].genre_id
  //   console.log(test)
  // }
}