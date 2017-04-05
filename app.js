var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

app.listen(9000);
console.log('running on port 9000');