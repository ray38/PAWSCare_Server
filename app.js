var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var morgan      = require('morgan');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var jwt         = require('jwt-simple');


app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Users = require('./models/Users');
Pets  = require('./models/Pets');

//connect to mongoDB
//mongoose.connect('mongodb://Ray38:`Kuyue5689740@ds147979.mlab.com:47979/accounts');
mongoose.connect(config.database)
console.log("connect to database");
console.log(mongoose.connection.readyState);
var db = mongoose.connection;

//express:
//var app = express();
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

app.get('/',function(req, res){
	res.send('Hello World!');
});


app.get('/api/users',function(req,res){
	console.log('Request Type:', req.method)
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

app.delete('/api/users/:_id',function(req,res){
	var id = req.params._id;
	Users.removeUser(id,function(err,user){
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
	Pets.updatePet(id,pet,{},function(err,user){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});


app.delete('/api/pets/:_id',function(req,res){
	var id = req.params._id;
	Pets.removePet(id,function(err,pet){
		if (err){
			throw err;
		}
		res.json(pet);
	});

});


app.listen(8080);
console.log('running on port 8080');




// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();
 
// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new Users({
		name: req.body.name,
		password: req.body.password,
		first_name: req.body.first_name,
		last_name: req.body.last_name
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
 
// connect the api routes under /api/*
app.use('/api', apiRoutes);


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  Users.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});


// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Users.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};