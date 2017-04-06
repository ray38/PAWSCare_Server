var mongoose = require('mongoose');

//Users Schema
var petsSchema = mongoose.Schema({
//	user_name: {
//		type String,
//		required: true
//	},
	pet_name:{
		type: String,
		required: true
	},
	species:{
		type: String,
		required: true
	},
	owner:{
		type: String,
		required: true
	},
	age:{
		type: String
	},
	create_data:{
		type: Date,
		default: Date.now
	}
});

var Pets = module.exports = mongoose.model('Pets', petsSchema);

//Get Pets
module.exports.getPets = function(callback, limit){
	Pets.find(callback).limit(limit);

}

//Get Pet
module.exports.getPetById = function(id,callback){
	Pets.findById(id,callback);

}


//Add pet
module.exports.addPet = function(pet, callback){
	Pets.create(pet, callback);
}