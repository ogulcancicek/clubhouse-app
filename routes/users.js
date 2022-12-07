var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

module.exports = router;
