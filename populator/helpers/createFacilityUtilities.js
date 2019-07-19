'use strict';

const createutilityValueMappings = require('./createutilityValueMappings');
const server = require('../../server/server');
const handleError = require('./handleError');

const { FacilityUtility } = server.models;

const getUtilityId = (utilities, utilityName) => {
  const foundUtility = utilities.find(
    (utility) => utility.utility_name == utilityName,
  );

  return foundUtility ? foundUtility.id : null;
};

module.exports = async (utilities, facility, facility_id) => {
  const facilityUtilities = [];
  const utilityValueMappings = createutilityValueMappings(facility);

  for (const utilityValueMapping of utilityValueMappings) {
    const { utilityName, value } = utilityValueMapping;
    if (!value || isNaN(value) || value == 0) continue;

    const utility_id = getUtilityId(utilities, utilityName);
    if (!utility_id) continue;

    facilityUtilities.push({
      utility_id,
      facility_id,
      client_id: 1,
      created_date: new Date(Date.now()),
    });
  }

  if (facilityUtilities.length < 0) return;
  await FacilityUtility.create(facilityUtilities).catch(handleError);
};
