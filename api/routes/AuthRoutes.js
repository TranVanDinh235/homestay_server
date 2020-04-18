const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.route('/native').post(authController.login);
router.route('/social/google').post(authController.loginGoogle);
router.route('/socail/facebook').post(authController.loginFacebook);

module.exports.router = router;