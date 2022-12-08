const Message = require('../models/message');

exports.index = async (req, res, next) => {
    try {
        const messages = await Message.find().sort([['timestamp', 'descending']]).populate('user');
        return res.render('index', { title: 'Clubhouse App', user: req.user, messages: messages });
    } catch (err) {
        return next(err);
    }
}