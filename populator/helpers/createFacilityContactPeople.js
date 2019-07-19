'use strict';

const handleError = require('./handleError');
const server = require('../../server/server');

const { log, error } = console;
const { ContactPeople } = server.models;

module.exports = async (facility, id) => {
  await ContactPeople.create({
    contact_person_fullname: 'John Banda',
    contact_person_phone: '0111234567',
    contact_person_email: 'johnbanda@kuunika.org',
    facility_id: id,
    client_id: 1,
    postal_address: 'P. O. Box 1234, Kuunika',
  }).catch(handleError);
};
