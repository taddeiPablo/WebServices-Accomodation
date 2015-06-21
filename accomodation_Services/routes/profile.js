/**
* ==========================================================
*	routes for profile
*
*	-Description : routes created to handle for the profile
* ==========================================================
*/


var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/profile_controller');

router.post('/load', ProfileController.load);
router.post('/update', ProfileController.update);
router.post('/getProfile', ProfileController.getProfile);

module.exports = router;