var db = require('../db');

// Mongodb schema for our trips. Contains timestamp of the trip and the pickup and dropoff

var tripSchema = new db.Schema({
  timestamp: Date,
  loc: db.Schema.Types.Mixed
});

//tripSchema.index({ 'timestamp': 1 });
tripSchema.index({loc: '2dsphere'});

module.exports = db.model('Trip', tripSchema);