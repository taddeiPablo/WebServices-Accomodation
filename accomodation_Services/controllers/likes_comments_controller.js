/**
* =====================================================================
*	Controller created to manage the likes and comments of the system
*    
*    -Description : controller to handle requests of likes and comments
* =====================================================================
*/

var likesComments = require('../models/schemas').LikesComments;

// function which saved likes and comments
exports.addLikeComments = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    try{
        var idacc = req.body.idacc;
		var likecomment =  JSON.parse(req.body.likeComment);
        var new_likesComments = new likesComments({
            accomodation_id : idacc,
            likes: likecomment.likes,
            $push : likecomment.comment 
        });
        new_likesComments.save(function(err){
			if(err){
				console.log('-------- hubo error --------');
				console.log(err);
				res.json(false);
			}else{
				res.json(true);
			}
		});
    }catch(err){
        console.error('Error during the process reason : ' + err);
    }
};
// funtion why are updated likes and comments
exports.updateLikeComments = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    try{
        var idacc = req.body.idacc;
		var likecomment =  JSON.parse(req.body.likeComment);   
        likesComments.findOne({accomodation_id: idacc}, function(err, docs){
			if(err){
				console.log('error' + err);
			}else if(docs){
                docs.likes = likecomment.likes;
                if(likecomment.comment != undefined)
                {
                    docs.comments.push(likecomment.comment);    
                }
                docs.markModified('likes_comments');
				docs.save();
				res.json(true);
			}else{
				res.json(false);
			}
		});
    }catch(err){
        console.error('Error during the process reason : ' + err);
    }
};
// function which is obtained likes and comments
exports.getLikes_Comments = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    try{
        var idacc = req.body.idacc;
        likesComments.findOne({accomodation_id: idacc}, function(err, docs){
			if(err){
				console.log('Search error');
				console.log(err);
			}else{
				if(docs != undefined){
                    res.json(docs);
				}else{
					res.json(false);
				}
			}
		});
    }catch(err){
        console.error('Error during the process reason : ' + err);
    }
};