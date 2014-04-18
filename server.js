var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
// mongodb://jheuvel:hello@ds047197.mongolab.com:47197/bayleef
// mongo ds047197.mongolab.com:47197/bayleef -u jheuvel -p hello

var app = express();

//var port = process.env.PORT || 8000;
var port = 8080;

app.set('port', port);
//app.set('views', __dirname + '/server/views');
//app.set('view engine', 'jade');

app.get('*', function(req, res) {
//    res.render('index');
    res.send('This is just a test.');
});


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'An error has occurred. Please try again later.');
});




app.listen(port);
console.log("listening. click on http://" + process.env.IP + ":" + port + "/");
