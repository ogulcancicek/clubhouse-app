var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/// HOMEPAGE
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// USER ROUTES
router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

module.exports = router;


module.exports = router;
