#!/usr/bin/env node

'use strict';





const gmaps = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
});

function one(cb) {

  // require('fs').readFile('./some.csv', cb);

  gmaps.geocode({
    address: '452 laurel dr hershey pa 17022'
  }, cb);






}

function two(cb) {
  one((err, res) => {
    throw new Error('two ERROR');
    cb(err, {
      some: 'object'
    });
  });
}



require('csv-stream-transform')({
  transform(row, cb) {
    two((err, res) => {
      cb(err, res);
    });
  }
});
