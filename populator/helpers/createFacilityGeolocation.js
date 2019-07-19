'use strict';

const handleError = require('./handleError');
const server = require('../../server/server');

const { log, error } = console;
const { Geolocation } = server.models;

module.exports = async (facility, id) => {
  await Geolocation.create({
    datum: facility[15],
    longitude: facility[17],
    latitude: facility[16],
    facility_id: id,
    client_id: 1,
  }).catch(handleError);
};
