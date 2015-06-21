/**
* =================================================================
* 	through this layer, we perform the encryption of user passwords
* =================================================================
*/

var crypto = require('crypto');


// since this function encrypts the password
exports.encriptPass = function(email, pass){
	var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
	return hmac;
};