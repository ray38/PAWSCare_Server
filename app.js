var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressValidator = require('express-validator');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var multer = require('multer');
var upload = multer({dest:'./uploads'});
var bcrypt = require('bcryptjs');

//var indexRouter = require('./routes/index');
var User = require('./models/User');
var Pet = require('./models/Pet');

var userApiRouter = require('./routes/API_User');
var petApiRouter = require('./routes/API_Pet');
var indexRouter = require('./routes/Index');


//connect to mongoDB
mongoose.connect('mongodb://ds147979.mlab.com:47979/accounts', {
    auth: {
		user: 'Admin',
		password: 'PAWSCareisNi$e'
    }
  	})
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));
console.log("connect to database");
console.log(mongoose.connection.readyState);
var db = mongoose.connection;




app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.set('view engine', 'html');
//Handle sessions
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
	errorFormatter: function(param,msg,value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}

}));

app.get('/',function(req, res){
	res.send('Hello World!');
});


app.use('/api', userApiRouter);
app.use('/api', petApiRouter);
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	//res.status(err.status || 500);
	//res.render('error');
});


app.listen(9000);
console.log('running on port 9000');


module.exports = app;