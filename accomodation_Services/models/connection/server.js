/**
* ================================================================
*	layer connection to the database
*
*	-Description :created this layer connection, 
*	 which we connect to the database
* ================================================================
*/

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/accomodations_DB');


module.exports = {
	DB: db
};