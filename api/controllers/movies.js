var Photo = require('../models/Movie');
var MovieDB = require('moviedb')('0bb137d978545e9b6314278018a36c59');

var getMovies = function(req,res){
 // API Key
 // MovieDB.searchMulti({query: 'Indiana Jones'}, function(err, result){
 
  MovieDB.searchMulti({query: req.query.query }, function(err, result){
      if (err) {
        
        res.status(404).send(err);
      }
 
    res.status(200).send(result.results);
  
  })
}

module.exports = {
  getMovies: getMovies
}