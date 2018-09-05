var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/User');

/*
router.get('/users',function(req,res){
	console.log('Request Type:', req.method)
	User.getUsers(function(err,users){
		if (err){
			throw err;
		}
		res.json(users);
	});

});*/

router.get('/users',function(req,res){
	console.log('Request Type:', req.method)
	User.getUsers(function(err,users){
		if (err){
			throw err;
		}
		res.json(users);
	});

});

/*
router.post('/users',function(req,res){
	console.log('Request Type :', req.method)
	console.log(req.body);
	var user = req.body;
	User.addUser(user,function(err,user){
		if (err){
			throw err;
		}
		res.json(user);
	});

});
*/

router.put('/users/:_id',function(req,res){
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id,user,{},function(err,user){
		if (err){
			throw err;
		}
		res.json(user);
	});

});

router.delete('/users/:_id',function(req,res){
	var id = req.params._id;
	User.removeUser(id,function(err,user){
		if (err){
			throw err;
		}
		res.json(user);
	});

});

module.exports = router;