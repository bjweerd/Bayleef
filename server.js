var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env  = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app  = express();
var port = 8080;


function compile(str, path) 
{
    return stylus(str).set('filename',path);
}

app.set('port', port);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware (
    {
	src: __dirname + '/public',
	compile: compile
    }));
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser());


mongoose.connect('mongodb://localhost/bayleef');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error with mongoose...'));
db.once('open', function callback() {
    console.log('bayleef db opened :)');
});

app.get('/partials/:partialPath', function(req,res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'An error has occurred. Please try again later.');
});

app.listen(port);
console.log("listening on port " + port + " ...");
