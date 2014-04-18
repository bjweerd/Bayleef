var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

var env  = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app  = express();
var port = 8080;

var log = logger('dev');
var bp = bodyParser();

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
app.use(log);
app.use(bp);

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
