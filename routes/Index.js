var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	res.render('register',{title:'Register'});
});

router.get('/login', function(req, res, next) {
	res.render('login',{title:'login'});
});

router.post('/login',
	passport.authenticate('local',{faliureRedirect:'/users/login',failureFlash:'Invalid username or password'}),
	function(req, res) {
		req.flash('success','You are now logged in');
		res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/users/login');
});

*/

passport.serializeUser(function(user,done){
	done(null, user.id);
});

passport.deserializeUser(function(id,done) {
	User.getUserById(id, function(err,user) {
		done(err, user);
	});
});


passport.use(new LocalStrategy(function(username, password, done){
	User.getUserByUsername(username,function(err,user){
		if(err) throw error;
		if(!user){
			return done(null, false, {message: 'Unknown Uswer'});
		}

		User.comparePassword(password, user.password, function(error,isMatch){
			if(err) return done(error);
			if(isMatch){
				return done(null, user);
			} else{
				return done(null, false, {message:'Invalid Password'});
			}
		});
	});
}));

router.post('/register',upload.single('profileimage'), function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	console.log(req.body);

	if(req.file){
		console.log('Uploading File...');
		var profileimage = req.file.filename;
	} else{
		console.log('No File Uploaded...');
		var profileimage = 'noimage.jpg';
	}
	var newUser = new User({
		name: name,
		email: email,
		username: username,
		password: password,
		profileimage: profileimage
	});

	User.createUser(newUser,function(err, user){
		if(err) throw err;
		console.log(user);
	});
	return next();
/*
	//Form Validator
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('username','Username field is required').notEmpty();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Password do not match').equals(req.body.password);

	//Check Errors
	var errors = req.validationErrors();
	if(errors){
		console.log("register error");
		console.log(errors);
		res.render('register',{
			errors:errors
		});
		
	} 
	else{
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileimage: profileimage
		});

		User.createUser(newUser,function(err, user){
			if(err) throw err;
			console.log(user);
		});
	}*/
});

router.post('/login',
	passport.authenticate('local'),
	function(req, res) {
		console.log(req.body);
		console.log('success,You are now logged in');
		User.getUserByUsername(req.body.username,function(err, user){
			if(err) throw err;
			console.log(user);
		});
		console.log("login complete")
		//res.redirect('/');
});


module.exports = router;
