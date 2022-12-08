require('dotenv').config({path: __dirname+'/.env'});
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.become_member_get = (req, res, next) => {
    if (!req.user) res.redirect('/login');
    res.render('become_member_form', { user: req.user });
}

exports.become_member_post = [
    body('secretKey')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.render('become_member_form', {
                user: req.user,
                errMsg: 'Something went wrong, please try again!',
            });
        }

        console.log(req.body.secretKey);
        console.log(process.env.SECRET_KEY);

        if (req.body.secretKey === process.env.SECRET_KEY) {
            User.findByIdAndUpdate({_id: req.user._id}, { member: true}, (err, result) => {
                if (err) return next(err);

                res.redirect('/');
            });
        } else {
            res.render('become_member_form', {
                user: req.currentUser,
                errMsg: 'Something went wrong, please try again!',
            });
        }        
    }
]
