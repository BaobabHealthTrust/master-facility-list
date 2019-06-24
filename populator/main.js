'use strict';

const { existsSync } = require('fs');
const { join } = require('path');

const createFacilities = require('./readFacilitiesFile');
const seed = require('./seed');

const { error } = console;

module.exports = async () => {
  const facilitiesFilePath = join(__dirname, '..', 'data', './facilities.csv');

  if (!existsSync(facilitiesFilePath)) {
    error('Facilities file is require');
    process.exit(1);
  }

  await seed();
  await createFacilities(facilitiesFilePath);
};
