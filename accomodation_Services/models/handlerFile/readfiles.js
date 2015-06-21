/**
* ======================================================================
*	through this object we perform the reading of files sent by the user
* ======================================================================
*/


// this feature in the images are removed
exports.removeFile = function(path){
	try{
		var fs = require('fs');
		fs.unlink(path , function (err) {
			if (err) response.errors.push("Erorr : " + err);
		});
	}catch(err){
		console.error('Error during the process reason : ' + err);
	}
};
//	Through this function to retrieve the image
exports.readImage = function(path, callback) {
	try{
		var fs = require('fs');
		fs.readFile(path, function (err, data) {
			callback.call(this, data);
		});
	}catch(err){
		console.error('Error during the process reason : ' + err);
	}
};