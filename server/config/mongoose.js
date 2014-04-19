var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error with mongoose...'));
    db.once('open', function callback() {
	console.log("The 'bayleef' db at [ " + config.db + " ] opened");
    });

    var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
	if (collection.length === 0) {
	    User.create({firstName:'Site', lastName:"Administrator", userName:"admin"});
	    User.create({firstName:'John', lastName:"DoeDea", userName:"john"});
	    User.create({firstName:'Mary', lastName:"DoeDoe", userName:"mary"});
	}
    });
}