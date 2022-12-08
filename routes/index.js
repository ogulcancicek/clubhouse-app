var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const indexController = require('../controllers/indexController');
const messageController = require('../controllers/messageController');

/// HOMEPAGE
router.get('/', indexController.index);

/// USER ROUTES
router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

router.get('/login', authController.user_login_get);
router.post('/login', authController.user_login_post);

router.get('/logout', authController.logout_get);

/// BECOME A MEMBER ROUTES
router.get('/become-member', memberController.become_member_get);
router.post('/become-member', memberController.become_member_post);

/// MESSAGE ROUTES
router.get('/create-message', messageController.createMessage_get);
router.post('/create-message', messageController.createMessage_post);

module.exports = router;


module.exports = router;
