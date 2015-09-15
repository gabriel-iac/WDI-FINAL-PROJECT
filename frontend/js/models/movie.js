angular
  .module('final-project')
  .factory('Movie', Movie);

Movie.$inject = ['$resource', 'API'];
function Movie($resource, API) {
  var url = 'http://localhost:3000/api'

  return $resource(
    url+'/movies/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'search':    {
        method: 'GET',
        params: {
          query: '@query'
        },
        isArray: true
      }
    }
  );
}