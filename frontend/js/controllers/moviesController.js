angular
.module("final-project")
.controller("MovieController", MovieController)
.config(function($sceProvider) {
      // Completely disable SCE.  For demonstration purposes only!
      // Do not use in new projects.
      $sceProvider.enabled(false);
    });

MovieController.$inject = ["$resource"];

function MovieController($resource){

  var self = this;
  self.text = ""
  self.movie_id = [];
  self.allMovies=[];

  this.submit = function() {
    console.log("hello")
          if (self.text) {
            self.movie_id.push(self.text);
            console.log(self.movie_id)
            getMovies();
            self.text = '';

          }
        }
function getMovies(movie_id){
  var Movie = $resource("http://localhost:3000/api/movies/"+ self.movie_id,
    {id: '@_id', isArray: true}, 
    {'query':     { method: 'GET', isArray: true}},
    {'update': {method: 'PUT'}
  });


  this.movies = Movie.query(function(movieResult){
    self.allMovies = movieResult;
    console.log(movieResult)
  });
}
}