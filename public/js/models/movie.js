angular
  .module('final-project')
  .factory('Movie', Movie);

Movie.$inject = ['$resource', 'API'];
function Movie($resource, API) {
  var url = '/api'

  return $resource(
    url+'/movies/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
       'single': { method: 'GET', url: url + ':id' },
      'delete':    { method: 'DELETE' },
      'search':    {
        method: 'GET',
        params: {
          query: '@query'
        },
        isArray: true
      },
     
    }
  );


}