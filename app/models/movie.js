var mongoose = require('mongoose')
    MovieSchema = require('../schemas/movie');
    
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

