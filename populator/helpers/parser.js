'use strict';

const parse = require('csv-parse');
const delimiter = { delimiter: ',' };

const iterateFacilities = require('./iterateFacilities');

const handleParse = async (err, facilities) => {
  if (err) {
    error(err.message);
    process.exit(1);
    return;
  }

  await iterateFacilities(facilities);
};

module.exports = parse(delimiter, handleParse);
