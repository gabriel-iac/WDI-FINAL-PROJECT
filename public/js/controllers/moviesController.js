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
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|blob|ftp|mailto|c‌​hrome-extension|magnet|https):/);
}]);





MovieController.$inject = ["$resource", '$filter', 'TokenService', 'Movie','$state', '$stateParams', '$http','$animate'];

function MovieController($resource, $filter, TokenService, Movie, $state, $stateParams, $http, $animate){
  var orderBy = $filter('orderBy');
  var self = this;
  
  self.text = ""
  self.allMovies   = null;
  self.predicate   = '-popularity';
  self.reverse     = true;
  self.letterLimit = 200;
  self.movie       = null;
  self.cast = null;
  self.trailers= null;
  self.rate = 7;
  self.max = 10;
  self.isReadonly = true;
  self.a = '/bower_components/Font-Awesome-SVG-PNG/black/png/16/star.png'
  self.hoveringOver = function(value) {
    self.overStar = value;
    self.percent = 100 * (value / self.max);
  };


  self.order = function(predicate) {
    self.reverse = (self.predicate === predicate) ? !self.reverse : false;
    self.predicate = predicate;
  }

  self.onFilter = function(input) {
    if(input){
      Movie.search({ query: input }, function(result){
        self.allMovies = result;
        console.log(result)
        
        for (i=0; i < self.allMovies.length; i++)
        {
          var rating = result[i].vote_average;
          
          self.rate.push(rating)


        }
        console.log(self.rate)
  });
} else {
  self.allMovies = null;
  input = "";
}  
}

self.showMovie = function(movie){
  if (TokenService.isLoggedIn()) {
    self.movie = movie;
    console.log(self.movie)
    var str = movie.title;
    var id = movie.id

    $http.get("https://api.themoviedb.org/3/movie/"+ id + "/videos?api_key=0bb137d978545e9b6314278018a36c59" )
    .success(function(res) {
      self.trailers = res.results;
    })
    .error(function(res) {
      self.trailers = null;
    })
    $http.get("https://api.themoviedb.org/3/movie/"+ id + "/credits?api_key=0bb137d978545e9b6314278018a36c59")
    .success(function(res) {
      self.cast = res.cast;
    })
    .error(function(res) {
      self.cast = null;
    })
      //https://api.themoviedb.org/3/movie/550?api_key=0bb137d978545e9b6314278018a36c59
      $http.get("https://www.omdbapi.com/?t=" + str +"&y=&plot=full&r=json")
      .success(function(res) {
        self.omdbmovie = res;
        console.log(res)
      })
      .error(function(res) {
        self.omdbmovie = null;
      })
      if (str.length > 15) {
        var str = str.split(/\s+/).slice(0,4).join(" ");
      }else{
        var str = movie.title;
      }
      //keep this bit for future
      //+ "&category=Movies"

      $http.get("https://getstrike.net/api/v2/torrents/search/?phrase=" + str )
      .success(function(response) {

        if (response.torrents.length > 10){
          self.torrents = response.torrents.slice(0, 10);

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

    // self.hoveringOver = function(value) {
    //   self.overStar = value;
    //   self.percent = 100 * (value / self.max);
    // };

    // self.ratingStates = [
    //   {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    //   {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    //   {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    //   {stateOn: 'glyphicon-heart'},
    //   {stateOff: 'glyphicon-off'}
    // ];
  

  //keep this bits for future
  // function fadeIn(el) {
  //   el.style.opacity = 0;
  //   var tick = function() {
  //     el.style.opacity = +el.style.opacity + 0.01;
  //     if (+el.style.opacity < 1) {
  //       (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
  //     }
  //   };
  //   tick();
  // }

// self.test = function(){
//   $('.card-wrap').each(function(index, card){
//     card.style.opacity = 0;
//     setTimeout(function(card){
//       fadeIn(card)
//     }, 100*index+1, card)
//   });
//}

}