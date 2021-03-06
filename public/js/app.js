angular
  .module('final-project', ['angular-jwt', 'ngResource', 'ui.router', 'ngAnimate', 'angular.filter', 'ui.bootstrap', 'youtube-embed'])
  .constant('API', 'https://blackbeard-mdb.herokuapp.com/api')
  .config(function($httpProvider, $sceProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $sceProvider.enabled(false);
  })

  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider']
  function MainRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('signup', {
        url: "/signup",
        templateUrl: "js/templates/signup.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "js/templates/login.html"
      })
      .state('homepage', {
        templateUrl: "js/templates/homepage.html",
        url: "/"
      })
      .state('movies', {
        templateUrl: "js/templates/movies.html",
        url: "/movies"
      })
      .state('show', {
        templateUrl: "js/templates/show.html",
        url: "/movies/:id"
      })
      $urlRouterProvider.otherwise('/');    
    }