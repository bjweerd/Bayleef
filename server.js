var express = require('express');

var env  = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app  = express();
var port = 8080;

app.set('port', port);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.render('index');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'An error has occurred. Please try again later.');
});

app.listen(port);
console.log("listening on port " + port + " ...");
