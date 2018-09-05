var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//Users Schema
var userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
    },
	email:{
		type: String
	//	required: true
	},
	profileimage:{
		type: String
	},
	name:{
		type: String
	},
	owned_pets:{
		type: Array,
		default: []
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});
var User = module.exports = mongoose.model('User', userSchema);


//Get Users
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}

//Add user
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}


//Update user
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id : id};
	var update = {
		first_name:user.first_name,
		last_name:user.last_name
	};
	User.findOneAndUpdate(query,update,options, callback);
}

//Delete user
module.exports.removeUser = function(id, callback){
	var query = {_id : id};
	User.remove(query, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query,callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
		callback(null, isMatch);
	});
}


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	    	console.log("start saving");
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
	
}