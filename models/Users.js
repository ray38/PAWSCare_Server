var mongoose = require('mongoose');

//Users Schema
var usersSchema = mongoose.Schema({
//	user_name: {
//		type String,
//		required: true
//	},
	first_name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Users = module.exports = mongoose.model('Users', usersSchema);

//Get Users
module.exports.getUsers = function(callback, limit){
	Users.find(callback).limit(limit);
}

//Add user
module.exports.addUser = function(user, callback){
	Users.find(callback).limit(limit);
}
