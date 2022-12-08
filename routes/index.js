var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');

/// HOMEPAGE
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

/// USER ROUTES
router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

router.get('/login', authController.user_login_get);
router.post('/login', authController.user_login_post);

router.get('/logout', authController.logout_get);

/// BECOME A MEMBER ROUTES
router.get('/become-member', memberController.become_member_get);
router.post('/become-member', memberController.become_member_post);

module.exports = router;


module.exports = router;
