var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
	rootPath: rootPath,
	db: 'mongodb://localhost/bayleef',
	port: 3030
    },
    production: {
	rootPath: rootPath,
	db: 'mongodb://jheuvel:hello@ds047197.mongolab.com:47197/bayleef',
	port: process.env.PORT || 80
    }
}
