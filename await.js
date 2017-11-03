#!/usr/bin/env node

'use strict';

const {
  promisify
} = require('util');

const gmaps = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
});

async function one() {

  // const junk = await promisify(require('fs').readFile)('./some.csv');

  const junk = await promisify(gmaps.geocode)({
    address: '452 laurel dr hershey pa 17022'
  });

  // console.error('JUNK', junk);

  // throw new Error('one ERROR');

  return junk;
}

function two(cb) {
  one()
    .then((res) => {
      throw new Error('two ERROR');
      cb(null, {
      some: 'object'
    });
    })
    .catch(cb);
}

require('csv-stream-transform')({
  transform(row, cb) {
    two((err, res) => {
      cb(err, res);
    });
  }
});
