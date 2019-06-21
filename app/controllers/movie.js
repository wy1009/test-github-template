var Movie = require('../models/movie');
var _ = require('underscore');

// detail page
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: movie.title,
            movie: movie,
            user: req.session.user
        });
    });
};

// admin page
exports.add = function (req, res) {
    res.render('admin', {
        title: '后台录入页',
        movie: {
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        },
        user: req.session.user
    });
};

// admin update movie
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '后台更新页',
                movie: movie,
                user: req.session.user
            });
        });
    }
};

// admin post movie
exports.save = function (req, res) {
    var id = req.body._id;
    var movieObj = req.body;
    var _movie;
    if (id !== '') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                _movie = _.extend(movie, movieObj);
                _movie.save(function (err, movie) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/movie/' + movie._id);
                    }
                });
            }
        });
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            country: movieObj.country,
            title: movieObj.title,
            year: movieObj.year,
            poster: movieObj.poster,
            language: movieObj.language,
            flash: movieObj.flash,
            summary: movieObj.summary
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/movie/' + movie._id);
            }
        });
    }
};

// list page
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render('list', {
                title: '列表页',
                movies: movies,
                user: req.session.user
            });
        }
    });
};

// list delete movie
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: true});
            }
        });
    }
};