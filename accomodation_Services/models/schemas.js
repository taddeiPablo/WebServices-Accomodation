/**
* ============================================================
*	schema documents to the database
*   
*	- Description : schemes to create the necessary documents,
	  our database 
* ============================================================
*/

var mongoose = require('mongoose');
var db = require('../models/connection/server').DB;
var schema = mongoose.Schema,
    ObjectId = schema.ObjectId;


// Account schema
var account_Schema = new schema({
	email: String,
	password: String
});
// user profile schema
var ProfileUsr_Schema = new schema({
	account_id:{
		type: ObjectId,
		ref: 'account'
	},
	name: String,
	lastName: String,
	document: String,
	phone: String,
	email: String
});
// accomodation schema
var accomodation_Schema = new schema({
	account_id:{
		type: ObjectId,
		ref: 'account'
	},
	country: String,
	state: String,
	city: String,
	address: String,
	typeAcc: String,
	dimensionsAcc: String,
	description: String,
	image: {}
});
// Likes_and_Comments schema
var likes_comments_schema = new schema({
    accomodation_id:{
		type: ObjectId,
		ref: 'accomodation'
	},
    likes: Number,
    comments: []
});


// models from schemas
var accountModel = db.model('accounts', account_Schema);
var profileModel = db.model('Profiles', ProfileUsr_Schema);
var accomodationModel = db.model('accomodations', accomodation_Schema);
var likes_commentsModel = db.model('likes_comments', likes_comments_schema);

// exporting models
module.exports = {
	Account: accountModel,
	Profile: profileModel,
	Accomodation: accomodationModel,
    LikesComments: likes_commentsModel
};