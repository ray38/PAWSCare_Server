var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Users Schema
var usersSchema = mongoose.Schema({
//	user_name: {
//		type String,
//		required: true
//	},
	name: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
    },
	first_name:{
		type: String,
	//	required: true
	},
	last_name:{
		type: String,
	//	required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

usersSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
usersSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var Users = module.exports = mongoose.model('Users', usersSchema);

//Get Users
module.exports.getUsers = function(callback, limit){
	Users.find(callback).limit(limit);
}

//Add user
module.exports.addUser = function(user, callback){
	Users.create(user, callback);
}


//Update user
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id : id};
	var update = {
		first_name:user.first_name,
		last_name:user.last_name
	}
	Users.findOneAndUpdate(query,update,options, callback);
}

//Delete user
module.exports.removeUser = function(id, callback){
	var query = {_id : id};
	Users.remove(query, callback);
}
