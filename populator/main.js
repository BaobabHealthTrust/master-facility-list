'use strict';

const { join } = require('path');
const { existsSync } = require('fs');

const seed = require('./seed');
const createFacilities = require('./readFacilitiesFile');

const { error, log } = console;

module.exports = async () => {
  const facilitiesFilePath = join(__dirname, '..', 'data', './facilities.csv');

  if (!existsSync(facilitiesFilePath)) {
    error('Facilities file is require');
    process.exit(1);
  }

  await seed();
  await createFacilities(facilitiesFilePath);
};
