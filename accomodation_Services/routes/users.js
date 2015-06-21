/**
* ==========================================================
*	routes for users
*
*	-Description : routes created to manage users
* ==========================================================
*/


var express = require('express');
var router = express.Router();
var usrController = require('../controllers/users_controller');

router.post('/registration', usrController.registration);
router.post('/login', usrController.login);


module.exports = router;
