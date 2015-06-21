/*
* ==============================================================
*	controller for the user's profile
*	-Description : controller which handle requests user profile
* ==============================================================
*/

var profile = require('../models/schemas').Profile;

// function which loads the user's profile
exports.load = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var profile_data = JSON.parse(req.body.profileData);
		var idacc = profile_data.idacco;
		var name = profile_data.name;
		var lastN = profile_data.lastName;
		var document = profile_data.document;
		var phone = profile_data.phone;
		var email = profile_data.email;
		var new_profile = new profile({
			account_id: idacc,
			name: name,
			lastName: lastN,
			document: document,
			phone: phone,
			email: email
		});
		new_profile.save(function(err){
			if(!err){
				res.json(true);
			}else{
				console.log('ingreso aqui' + err);
				res.json(false);
			}
		});
	}catch(err){
		console.error('Error during the process reason : ' + err);
	}
};
// function by which the user profile is updated
exports.update = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var profile_data = JSON.parse(req.body.profileData);
		var idacco = profile_data.idacco;
		var name = profile_data.name;
		var lastN = profile_data.lastName;
		var document = profile_data.document;
		var phone = profile_data.phone;
		var email = profile_data.email;
		profile.findOne({account_id: idacco}, function(err, docs){
			if(err){
				console.log(err + 'error en la busqueda');
			}else if(docs) {
				docs.name = name;
				docs.lastName = lastN;
				docs.document = document;
				docs.phone = phone;
				docs.email = email;
				docs.markModified('profiles');
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
// function through which the profile is brought
exports.getProfile = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var idacc = req.body.idacco;
		profile.findOne({account_id: idacc}, function(err, docs){
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
	}catch(error) {
		console.error('Error during the process reason : ' + err);
	}
};