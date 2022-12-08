const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.createMessage_get = (req, res, next) => {
    if (!req.user) return res.redirect('/login');

    res.render('message_form', { title: 'Create new message' });
}

exports.createMessage_post = [
    body('title')
        .trim()
        .isLength({ min:1, max:64 })
        .escape(),
    body('text')
        .trim()
        .isLength({ max: 240 })
        .escape(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('message_form', { 
                title: 'Create new message',
                errMsg: 'Something went wrong, please try again!',
            });
            return;
        }

        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            user: req.user._id,
            timestamp: Date.now(),
        });

        await message.save( (err) => {
            if (err) return next(err);

            res.redirect('/');
        });
    }
]