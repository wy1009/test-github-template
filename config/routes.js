var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');

module.exports = function (app) {
    // index page
    app.get('/', Index.index);
    // detail page
    app.get('/movie/:id', Movie.detail);
    // admin page
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.add);
    // admin update movie
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    // admin post movie
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save);
    // list page
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
    // list delete movie
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);
    // userlist page
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.signinRequired, User.adminRequired, User.list);
    // signup
    app.post('/user/signup', User.signup);
    // signin
    app.post('/user/signin', User.signin);
    // logout
    app.get('/logout', User.logout);
    
    // Comment
    app.post('/admin/comment', User.signinRequired, Comment.save);
}

