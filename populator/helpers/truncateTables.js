'use strict';

const server = require('../../server/server');
const truncate = require('./truncate');

const {
  Address,
  ContactPeople,
  Facility,
  FacilityService,
  FacilityUtility,
  Geolocation,
  Location,
  RegulatoryStatus,
  Resource,
  ResourceType,
  Service,
  ServiceType,
  Zone,
  FacilityResource,
} = server.models;

module.exports = async () => {
  await truncate(Address);
  await truncate(Facility);
  await truncate(Location);
  await truncate(Geolocation);
  await truncate(ContactPeople);

  await truncate(FacilityService);
  await truncate(FacilityUtility);
  await truncate(FacilityResource);
};
