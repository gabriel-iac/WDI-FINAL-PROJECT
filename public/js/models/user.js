angular
  .module('final-project')
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {
  var url = 'https://blackbeard-mdb.herokuapp.com/api'

  return $resource(
    url+'/users/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'authorize': { 
        url: url + '/authorize',
        method: 'POST' 
      }, 
      'join': {
        url: url + '/join',
        method: 'POST'
      }
    }
  );
}