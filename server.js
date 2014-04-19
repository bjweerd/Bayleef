var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy; // there is also facebook google twitter etc

var env  = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app  = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
	User.findOne({userName:username}).exec(function(err, user) {
	    if (user) {
		return done(null,user);
	    } else {
		return done(null,false);
	    }
	})
    }
));

passport.serializeUser(function(user,done) {
    if (user) {
	done(null, user._id);
    }
});

passport.deserializeUser(function(id,done) {
    User.findOne({_id:id}).exec(function(err,user){
	if (user) {
	    return done(null, user);
	} else {
	    return done(null, false);
	}
    });
});

require('./server/config/routes')(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'An internal server error 500 has occurred.');
});

app.listen(config.port);
console.log("listening on port " + config.port + " ...");
