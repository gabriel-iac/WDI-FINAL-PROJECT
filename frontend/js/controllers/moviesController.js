angular
.module("final-project")
.controller("MovieController", MovieController)
.config(function($sceProvider) {
      // Completely disable SCE.  For demonstration purposes only!
      // Do not use in new projects.
      $sceProvider.enabled(false);
    });

MovieController.$inject = ["$resource", '$filter'];

function MovieController($resource, $filter){
  var orderBy = $filter('orderBy');
  var self = this;
  self.text = ""
  self.movie_id = [];
  self.allMovies=[];
  self.predicate = '-title';

  self.reverse = true;
  self.order = function(predicate) {
    self.reverse = (self.predicate === predicate) ? !self.reverse : false;
    self.predicate = predicate;

  }
  var Movie = $resource("http://localhost:3000/api/movies/:id",
    { id: '@_id' }, 
    { "search": {
      method: 'GET',
      params: {
        query: '@query'
      },
      isArray: true
    }
  });

  self.onFilter = function(input) {
    // alert(input)
    if(input){
      Movie.search({
       query: input  
     }, function(result){
      self.allMovies = result
      console.log(result)
      for (i=0; i < result.length; i++){
        var test = result[i].genre_id
        console.log(test)
      }
    }
    )
    }else{
      self.allMovies = [];
      input = "";
    }  
  }
  
}