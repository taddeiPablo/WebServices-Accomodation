/**
* ==========================================================
*	creation of the users controller
*	
*	-Description : controller by which user requests handled
* ==========================================================
*/

var encrypt = require('../models/encryption/Encryption_data');
var account = require('../models/schemas').Account;



// function by which a new user registers
exports.registration = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var registration = JSON.parse(req.body.registrationData);
		var email = registration.email;
		var password = registration.password;
		var passEncryp = encrypt.encriptPass(email, password);
		account.findOne({email: email, 'password': passEncryp}, function(err, docs){
			if(!docs){
				var new_account = new account({email:email, password:passEncryp});
				new_account.save(function(err){
					res.json(true);
				});
			}else{
				res.json(false);
			}
		});
	}catch(err){
		console.error('Error during the process reason : ' + err);
	}
};
// function by which a user logs
exports.login = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var login = JSON.parse(req.body.loginData);
		var email = login.email;
		var password = login.password;
		var passEncryp = encrypt.encriptPass(email, password);
		account.findOne({email: email, 'password': passEncryp}, function(err, docs){
			if(err){
				console.log('-------- hubo error --------');
				console.log(err);
			}else if(docs){
				res.json(docs._id);
			}else{
				res.json(false);
			}
		});
	}catch(err){
		console.error('Error during the process reason : ' + err);
	}
};