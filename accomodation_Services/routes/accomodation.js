/**
* =================================================================
*	routes for accommodation
*	-Description : routes created to manage accommodations
* =================================================================
*/

var express = require('express');
var router = express.Router();
var accomodationController = require('../controllers/accomodation_controller');

router.post('/create', accomodationController.create_accomodation);
router.post('/update', accomodationController.update_accomodation);
router.post('/userAcc', accomodationController.usrAccomodation);
router.post('/findAcc', accomodationController.findAccomodation);
router.post('/getImages', accomodationController.getImages);

module.exports = router;