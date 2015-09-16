angular
.module("final-project")
.controller("MovieController", MovieController)
.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
})
.config(['$compileProvider' , function ($compileProvider)
    {
          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|blob|ftp|mailto|c‌​hrome-extension|magnet):/);
    }]);

MovieController.$inject = ["$resource", '$filter', 'TokenService', 'Movie','$state', '$stateParams', '$http'];

function MovieController($resource, $filter, TokenService, Movie, $state, $stateParams, $http){
  var orderBy = $filter('orderBy');
  var self = this;
  
  self.text = ""
  self.allMovies   = null;
  self.predicate   = '-title';
  self.reverse     = true;
  self.letterLimit = 200;
  self.movie       = null;

  self.order = function(predicate) {
    self.reverse = (self.predicate === predicate) ? !self.reverse : false;
    self.predicate = predicate;
  }

  self.onFilter = function(input) {
    if(input){
      Movie.search({ query: input }, function(result){
        self.allMovies = result;

      });
    } else {
      self.allMovies = null;
      input = "";
    }  
  }

  self.showMovie = function(movie){
    if (TokenService.isLoggedIn()) {
      self.movie = movie;
      console.log(movie)
      var str = movie.title;
      if (str.length > 15) {
        var str = str.split(/\s+/).slice(0,4).join(" ");

      }else{
        var str = movie.title;
      }

      $http.get("https://getstrike.net/api/v2/torrents/search/?phrase=" + str + "&category=Movies")
      .success(function(response) {
        console.log(response)
        if (response.torrents.length > 10){
          self.torrents = response.torrents.slice(0, 10);
          console.log(response.torrents)
        }else{
          self.torrents = response.torrents
        }

      })
      .error(function(response) {
        self.torrents = null;
      })
    }
  }

  self.resetMovie = function(){
    self.movie    = null;
    self.torrents = null;
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