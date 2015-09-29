angular
  .module('final-project')
  .controller('usersController', UserController)

UserController.$inject = ['User','TokenService', '$state']
function UserController(User, TokenService, $state) {
  var self = this;

  self.all    = [];
  self.user  = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log(res); }
    self.message =  res.message ? res.message : null;
  }

  self.authorize = function() {
    User.authorize(self.user, function(res){
      $state.go("movies");
      showMessage(res)
    });
  }

  self.join = function() {
    User.join(self.user, function(res){
      $state.go("movies");
      showMessage(res)
    });
  }

  self.disappear = function() {
    TokenService.removeToken && TokenService.removeToken();
    $state.go("homepage");
  }

  self.isLoggedIn = function() {
  return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }



  self.beard = function(){
    $(document).ready(function(){
      $('#title-curved ').arctext({radius: 200, dir: -1})
     
    })
  }
self.modal = function(){
  if (self.isLoggedIn) {
    $('.modal-backdrop').css("display", "none");
  };
  
}

  return self;

  
}