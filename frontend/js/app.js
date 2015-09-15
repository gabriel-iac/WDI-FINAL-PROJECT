angular
  .module('final-project', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
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
      $urlRouterProvider.otherwise('/');    
    }