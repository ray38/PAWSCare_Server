var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({

	disease:{
		type: String
	},
	create_data:{
		type: Date,
		default: Date.now
	}
});

var Record = module.exports = mongoose.model('Record', recordSchema);



//Get Pets
module.exports.getRecords = function(callback, limit){
	Record.find(callback).limit(limit);

}

//Get Pet
module.exports.getRecordById = function(id,callback){
	Record.findById(id,callback);

}


//Add pet
module.exports.addRecord = function(record, callback){
	Record.create(record, callback);
}


//Update pet
module.exports.updatePet = function(id, pet, options, callback){
	var query = {_id : id};
	Record.findOneAndUpdate(query,pet,options, callback);
}


//Delete pets
module.exports.removeRecord = function(id, callback){
	var query = {_id : id};
	Record.remove(query, callback);
}