var express = require('express');

var env  = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app  = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/routes')(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'An internal server error 500 has occurred.');
});

app.listen(config.port);
console.log("listening on port " + config.port + " ...");
