var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Users Schema
var petSchema = mongoose.Schema({

	petName:{
		type: String,
		required: true
	},
	species:{
		type: String,
		required: true
	},
	breed:{
		type: String,
		required: true
	},
	owner:{
		type: String,
		required: true
	},
	age:{
		type: String,
		required: true
	},
	create_data:{
		type: Date,
		default: Date.now
	}
});

var Pet = module.exports = mongoose.model('Pet', petSchema);



//Get Pets
module.exports.getPets = function(callback, limit){
	Pet.find(callback).limit(limit);

}

//Get Pet
module.exports.getPetById = function(id,callback){
	Pet.findById(id,callback);

}


//Add pet
module.exports.addPet = function(pet, callback){
	Pet.create(pet, callback);
}


//Update pet
module.exports.updatePet = function(id, update, options, callback){
	var query = {_id : id};
	Pet.findOneAndUpdate(query,update,options, callback);
}


//Delete pets
module.exports.removePet = function(id, callback){
	var query = {_id : id};
	Pet.remove(query, callback);
}