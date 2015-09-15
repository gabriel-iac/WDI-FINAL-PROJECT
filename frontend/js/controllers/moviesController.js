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
        self.predicate = 'title';
              self.reverse = true;
              self.order = function(predicate) {
                self.reverse = (self.predicate === predicate) ? !self.reverse : false;
                self.predicate = predicate;
      }
    }
    )
    }else{
      self.allMovies = [];
      input = "";
    }  
  }
  
 }