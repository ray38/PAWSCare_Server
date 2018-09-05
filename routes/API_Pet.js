var express = require('express');
var router = express.Router();


var Pet = require('../models/Pet');

router.get('/pets',function(req,res){
	Pet.getPets(function(err,pets){
		if (err){
			throw err;
		}
		res.json(pets);
	});

});



router.get('/pets/:_id',function(req,res){
	Pet.getPetById(req.params._id,function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});



router.post('/pets',function(req,res){
	var pet = req.body;
	Pet.addPet(pet,function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});





router.put('/pets/:_id',function(req,res){
	var id = req.params._id;
	var pet = req.body;
	Pet.updatePet(id,pet,{},function(err,user){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});


router.delete('/pets/:_id',function(req,res){
	var id = req.params._id;
	Pet.removePet(id,function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});

module.exports = router;