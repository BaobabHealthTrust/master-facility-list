'use strict';

const handleError = require('./handleError');
const server = require('../../server/server');

const { log, error } = console;
const { Location } = server.models;

module.exports = async (facility, id) => {
  await Location.create({
    catchment_area: 'urban',
    catchment_population: 0,
    client_id: 1,
    facility_id: id,
  }).catch(handleError);
};
