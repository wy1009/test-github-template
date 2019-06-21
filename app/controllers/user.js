var User = require('../models/user');

// userlist page
exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('userlist', {
                title: '用户列表页',
                users: users,
                user: req.session.user
            });
        }
    });
};

// signup
exports.signup = function (req, res) {
    var _user = req.body;
    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                return res.redirect('/');
            } else {
                var user = new User(_user);
                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/admin/userlist');
                    }
                });
            }
        }
    });
};

// signin
exports.signin = function (req, res) {
    var _user = req.body;
    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                if (user.password === _user.password) {
                    req.session.user = user;
                    res.redirect('/');
                    console.log('登录成功');
                } else {
                    console.log('密码错误');
                }
            } else {
                console.log('用户不存在');
            }
        }
    })
};

// logout
exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};

// midware for user
exports.signinRequired = function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
};

exports.adminRequired = function (req, res, next) {
    if (req.session.user.role <= 10) {
        return res.redirect('/');
    }
    next();
}