var Photo = require('../models/Movie');
var MovieDB = require('moviedb')('0bb137d978545e9b6314278018a36c59');

var getMovies = function(req,res){
 // API Key
 MovieDB.searchMovie({query: 'Alien'}, function(err, result){
   console.log(result);
 });
}
module.exports = {

  getMovies: getMovies
}