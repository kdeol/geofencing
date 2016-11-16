var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');
var moment = require('moment');
var _ = require('lodash');
var JSONStream = require('JSONStream');
var decimal = require('bignumber.js');

decimal.config({
  ERRORS: false,
  DECIMAL_PLACES: 5
});

function getQueryFromRequest (req) {
  var query = {  };
  var coordinates = req.query.coordinates;

  var start = req.query.start;
  var end = req.query.end;
  var dateFormat = "YYYY-MM-DD";
  var range = { };

  if (start) {
    range['$gte'] = moment.utc(start, dateFormat).startOf('day').toDate();
  }
  if (end) {
    range['$lte'] = moment.utc(end, dateFormat).startOf('day').toDate();
  }
  if(!_.isEmpty(range)) {
    query.timestamp = range;
  }

  coordinates = _.map(coordinates, function (coordinate) {
    var lon = new decimal(coordinate.lng);
    var lat = new decimal(coordinate.lat);
    return [lon.toNumber(), lat.toNumber()];
  });

  query['loc'] = {
    "$geoWithin": {
      '$geometry': {
        'type': 'Polygon',
        'coordinates': [coordinates]
      }
    }
  };

  return query;

}

router.get('/', function(req, res, next) {

  var query = getQueryFromRequest(req);

  res.type('json');
  Trip.find(query).stream()
    .pipe(JSONStream.stringify())
    .pipe(res);
});

router.get('/toppickups', function(req, res, next) {
  var query = getQueryFromRequest(req);

  Trip.aggregate([{$match: query},
    {"$unwind" : "$loc.coordinates"},
    {
      "$group" :
      {
        "_id" : "$_id",
        "pickup" : {
          "$first" : "$loc.coordinates"
        }
      }
    },
    {
      "$group":
      {
        "_id": "$pickup",
        "count": {"$sum": 1}
      }
    }, {"$sort": {"count": -1}}, {"$limit": 20}
  ], function (err, result) {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
});

router.get('/topdropoffs', function(req, res, next) {
  var query = getQueryFromRequest(req);

  Trip.aggregate([{$match: query},
    {"$unwind" : "$loc.coordinates"},
    {
      "$group" :
      {
        "_id" : "$_id",
        "pickup" : {
          "$last" : "$loc.coordinates"
        }
      }
    },
    {
      "$group":
      {
        "_id": "$pickup",
        "count": {"$sum": 1}
      }
    }, {"$sort": {"count": -1}}, {"$limit": 20}
  ], function (err, result) {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;