angular
  .module('final-project', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config( MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider']
  function MainRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('signup', {
        url: "/signup",
        templateUrl: "templates/signup.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html"
      })
      .state('homepage', {
        templateUrl: "templates/homepage.html",
        url: "/"
      })
      $urlRouterProvider.otherwise('/');
        
      }