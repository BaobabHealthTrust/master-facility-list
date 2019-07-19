'use strict';

const { existsSync, createReadStream, writeFile } = require('fs');

const { parser } = require('./helpers');
const { error } = console;

module.exports = async (filePath = './../data/facilities.csv') => {
  if (!existsSync(filePath)) {
    error('Facilities file is require');
    process.exit(1);
  }

  await createReadStream(filePath).pipe(parser);
};
