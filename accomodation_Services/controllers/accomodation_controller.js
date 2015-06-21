/**
* ================================================================
*	Controller for managing accommodations
*	
*	- Description : controller which manage all requests that have
*	  to do with accommodation	
* ================================================================
*/

var accomodation = require('../models/schemas').Accomodation;
var readFiles = require('../models/handlerFile/readfiles');
var likesComments = require('../models/schemas').LikesComments;

// function through which data is loaded accommodations
exports.create_accomodation = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var accomodation_json = JSON.parse(req.body.accomodationData);
		var id = accomodation_json.idacco;
		var country = accomodation_json.country;
		var state = accomodation_json.state;
		var city = accomodation_json.city;
		var address = accomodation_json.address;
		var typeacc = accomodation_json.typeAcc;
		var dimensionsacc = accomodation_json.dimensionsAcc;
		var description = accomodation_json.description;
		var image_data = req.files.fileAcc;
		var new_accomodation = new accomodation({
			account_id: id,
			country: country,
			state: state,
			city: city,
			address: address,
			typeAcc: typeacc,
			dimensionsAcc: dimensionsacc,
			description: description,
			image: image_data
		});
		new_accomodation.save(function(err){
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
// function through which data are updated accommodation
exports.update_accomodation = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var accomodation_json = JSON.parse(req.body.accomodationData);
		var id = accomodation_json.idacco;
		var country = accomodation_json.country;
		var state = accomodation_json.state;
		var city = accomodation_json.city;
		var address = accomodation_json.address;
		var typeacc = accomodation_json.typeAcc;
		var dimensionsacc = accomodation_json.dimensionsAcc;
		var description = accomodation_json.description;
		var image_data = req.files.fileAcc;
		accomodation.findOne({account_id: id}, function(err, docs){
			if(err){
				console.log('error' + err);
			}else if(docs){
				docs.country = country;
				docs.state = state;
				docs.city = city;
				docs.address = address;
				docs.typeAcc = typeacc;
				docs.dimensionsAcc = dimensionsacc;
				docs.description = description;
				if(docs.image != image_data && image_data != undefined) {
					var path_remove = docs.image.path;
					docs.image = image_data;
					readFiles.removeFile(path_remove);
				}
				docs.markModified('accomodations');
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
// function by which the user brings housing
exports.usrAccomodation = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var id = req.body.idacco;
		accomodation.findOne({account_id: id}, function(err, docs){
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
// function through which the search is performed accommodation
exports.findAccomodation = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var country = req.body.country;
		var state = req.body.state;
		var city = req.body.city;
		var query = {country: new RegExp('^'+country+'$', "i"), state: new RegExp('^'+state+'$', "i"), city: new RegExp('^'+city+'$', "i")};
		accomodation.find(query, function(err, docs){
            var info;
			if(err){
				console.log('error retrieving data');
				console.log(err);
			}else{
				if(docs.length != 0){
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
// Through this function we recovered the images of the accommodation
exports.getImages = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	try{
		var path = req.body.path;
		readFiles.readImage(path, function(data){
			var result;
			result = data.toString('base64');
			res.json(result);
		});
	}catch(err) {
		console.error('Error during the process reason : ' + err);
	}
};

