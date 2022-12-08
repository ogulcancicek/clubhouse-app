const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {body, validationResult} = require('express-validator');

exports.sign_up_get = (req, res, next) => {
    res.render('sign_up');
}

exports.sign_up_post = [
    body('fullname', 'Fullname must be specified')
        .trim()
        .isLength({min:2, max:32})
        .escape(),
    body('username', 'Username must be specified')
        .trim()
        .isLength({min:2, max:16})
        .escape(),
    body('password').exists().isLength({min:8}),
    body('pass-confirmation').exists()
        .isLength({min:8})
        .custom(async (value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords must be the same.');
            return true;
        }),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('sign_up', { errMsg: 'Something went wrong' });
            return;
        };

        try {
            const users = await User.find({ username: req.body.username });
            if (users.length > 0) return res.render('sign_up', { errMsg: 'User already exists! '});
            
            bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                if (err) return next(err);

                const user = new User({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: hashedPass,
                    member: false,
                    admin: false
                }).save( err => {
                    if (err) return next(err);

                    res.redirect('/');
                });
            });
        } catch (err) {
            return next(err);
        }
    }
];

exports.user_login_get = (req, res, next) => {
    if (res.locals.currentUser) return res.redirect('/');
    res.render('login_form');
}

exports.user_login_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
});

exports.logout_get = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);

        res.redirect('/');
    });
}