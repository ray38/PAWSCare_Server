var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Users = require('./models/Users');
Pets  = require('./models/Pets');

//connect to mongoDB
mongoose.connect('mongodb://Ray38:`Kuyue5689740@ds147979.mlab.com:47979/accounts');
var db = mongoose.connection;

//express:
//var app = express();
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

app.get('/',function(req, res){
	res.send('Hello World!');
});

app.get('/api/users',function(req,res){
	Users.getUsers(function(err,users){
		if (err){
			throw err;
		}
		res.json(users);
	});

});

app.post('/api/users',function(req,res){
	var user = req.body;
	Users.addUser(user,function(err,user){
		if (err){
			throw err;
		}
		res.json(user);
	});

});

app.put('/api/users/:_id',function(req,res){
	var id = req.params._id;
	var user = req.body;
	Users.updateUser(id,user,{},function(err,user){
		if (err){
			throw err;
		}
		res.json(user);
	});

});


app.get('/api/pets',function(req,res){
	Pets.getPets(function(err,pets){
		if (err){
			throw err;
		}
		res.json(pets);
	});

});

app.get('/api/pets/:_id',function(req,res){
	Pets.getPetById(req.params._id,function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});

app.post('/api/pets',function(req,res){
	var pet = req.body;
	Pets.addPet(pet,function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});

app.put('/api/pets/:_id',function(req,res){
	var id = req.params._id;
	var pet = req.body;
	Pets.updatePet(id,pet,{},function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});

app.listen(9000);
console.log('running on port 9000');