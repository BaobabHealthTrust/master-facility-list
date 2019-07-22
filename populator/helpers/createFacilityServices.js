'use strict';

const createServiceValueMappings = require('./createServiceValueMappings');
const server = require('../../server/server');
const handleError = require('./handleError');

const { FacilityService } = server.models;

const getServiceId = (services, serviceName) => {
  const foundService = services.find(
    (service) => service.service_name == serviceName,
  );

  return foundService ? foundService.id : null;
};

module.exports = async (services, facility, facility_id) => {
  const facilityServices = [];
  const serviceValueMappings = createServiceValueMappings(facility);

  for (const serviceValueMapping of serviceValueMappings) {
    const { serviceName, value } = serviceValueMapping;
    if (!value || isNaN(value) || value == 0) continue;

    const service_id = getServiceId(services, serviceName);
    if (!service_id) continue;

    facilityServices.push({
      service_id,
      facility_id,
      client_id: 1,
    });
  }

  if (facilityServices.length < 0) return;
  await FacilityService.create(facilityServices).catch(handleError);
};
