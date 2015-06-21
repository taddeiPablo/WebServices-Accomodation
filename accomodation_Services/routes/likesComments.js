/**
* ========================================================================
*	routes for likes
*
*	-Description : routes created for the management of likes and comments
* ========================================================================
*/

var express = require('express');
var router = express.Router();
var likescommentController = require('../controllers/likes_comments_controller');

router.post('/add', likescommentController.addLikeComments);
router.post('/update', likescommentController.updateLikeComments);
router.post('/getLikesComments', likescommentController.getLikes_Comments);

module.exports = router;