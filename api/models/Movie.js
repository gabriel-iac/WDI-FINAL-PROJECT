var mongoose = require('mongoose');

var PhotoSchema = mongoose.Schema({
  title: String,
  image: String
});

module.exports = mongoose.model('Photo', PhotoSchema);