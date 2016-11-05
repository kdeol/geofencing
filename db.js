var mongoose = require('mongoose');

var mongoUrl = 'mongodb://127.0.0.1:27017/geofencing';

console.log('initializing connection to mongo at %s', mongoUrl);

mongoose.connect(mongoUrl);

mongoose.connection.on('error', function (err) {
  throw err;
});

module.exports = mongoose;