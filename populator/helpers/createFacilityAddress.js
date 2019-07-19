'use strict';

const handleError = require('./handleError');
const server = require('../../server/server');

const { log, error } = console;
const { Address } = server.models;

module.exports = async (facility, id) => {
  await Address.create({
    physical_address: 'Kuunika',
    postal_address: 'P . O. Box 1234, Kuunika',
    village: 'Kuunika',
    ta: facility[28] || 'N/A',
    facility_id: id,
    client_id: 1,
  }).catch(handleError);
};
