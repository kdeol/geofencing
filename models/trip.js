var db = require('../db');

var tripSchema = new db.Schema({
  timestamp: Date,
  loc: db.Schema.Types.Mixed
});

tripSchema.index({ 'timestamp': 1 });
tripSchema.index({loc: '2dsphere'});

module.exports = db.model('Trip', tripSchema);