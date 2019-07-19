'use strict';

const server = require('../../server/server');
const handleError = require('./handleError');

const { log, error } = console;
const { Facility } = server.models;

module.exports = async (
  facility,
  facility_owner_id,
  facility_type_id,
  district_id,
  facility_operational_status_id,
  facility_regulatory_status_id,
) => {
  const createdFacility = await Facility.create({
    facility_code_mapping: [
      {
        system: 'DHIS2',
        code: facility[13].trim(),
        url: '',
      },
    ],
    registration_number: facility[14].trim(),
    facility_name: facility[8].trim(),
    common_name: facility[9],
    facility_date_opened: new Date('1975-01-01'),
    facility_type_id,
    facility_owner_id,
    facility_operational_status_id,
    facility_regulatory_status_id,
    district_id,
    client_id: 1,
    published_date: new Date(Date.now()),
  }).catch(handleError);

  if (!createdFacility) {
    error('😡', 'failed to create facility');
    return;
  }

  return createdFacility;
};
