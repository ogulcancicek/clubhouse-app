var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

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

module.exports = router;


module.exports = router;
