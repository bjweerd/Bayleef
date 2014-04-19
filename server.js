var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env  = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app  = express();

var port = process.env.PORT || 3030;

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





// database spul
console.log("env variable is: " + env);
var connectString = "";
if (env == "development")
    connectString = 'mongodb://localhost/bayleef';
else
   connectString = 'mongodb://jheuvel:hello@ds047197.mongolab.com:47197/bayleef';

mongoose.connect(connectString);

    
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error with mongoose...'));
db.once('open', function callback() {
    console.log("bayleef db at [ " + connectString + " ] opened");
});
var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});


app.get('/partials/:partialPath', function(req,res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', {
	mongoMessage: mongoMessage
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'An error has occurred. Please try again later.');
});

app.listen(port);
console.log("listening on port " + port + " ...");
