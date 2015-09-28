angular
  .module('final-project', ['angular-jwt', 'ngResource', 'ui.router', 'ngAnimate'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider, $sceProvider) {
    $httpProvider.interceptors.push('authInterceptor');

  })
  .config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
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