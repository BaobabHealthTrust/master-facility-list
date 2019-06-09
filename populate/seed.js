'use strict';

const data = require('../seeds/data');
const server = require('../server/server');
const userSeeder = require('../seeds/seed-user');
const serviceModelSeeder = require('../seeds/service-model-seeder');
const facilitySeeder = require('../seeds/facility-seeder');
const dependentModelFactory = require('../seeds/dependent-model-factory');
const independentModelFactory = require('../seeds/independent-model-factory');
const facilityDependantsMapper = require('../seeds/facility-dependants-mapper');
const facilityResourcesUtilitiesServicesMapper = require('../seeds/facility-resources-utilities-services-mapper');

const {
  District,
  FacilityType,
  FeedbackType,
  OperationalStatus,
  Owner,
  Utility,
  UtilityType,
  RegulatoryStatus,
  Resource,
  ResourceType,
  Service,
  ServiceType,
  Zone,
} = server.models;

const {
  districts,
  owners,
  feedbackTypes,
  facilityTypes,
  regulatoryStatuses,
  operationalStatuses,
  utilities,
  utilityTypes,
  resources,
  resourceTypes,
  services,
  serviceTypes,
  zoneData,
} = data;

module.exports = async () => {
  try {
    await userSeeder(data.users);

    await independentModelFactory(Owner, owners);
    await independentModelFactory(FeedbackType, feedbackTypes);
    await independentModelFactory(FacilityType, facilityTypes);
    await independentModelFactory(RegulatoryStatus, regulatoryStatuses);
    await independentModelFactory(OperationalStatus, operationalStatuses);
    await independentModelFactory(Zone, zoneData);
    await independentModelFactory(ResourceType, resourceTypes);
    await independentModelFactory(UtilityType, utilityTypes);
    await independentModelFactory(ServiceType, serviceTypes);

    await dependentModelFactory(Zone, District, districts);
    await dependentModelFactory(ResourceType, Resource, resources);
    await dependentModelFactory(UtilityType, Utility, utilities);
    await dependentModelFactory(ServiceType, Service, services);
    await serviceModelSeeder(ServiceType, Service, services);
  } catch (error) {
    console.log(error);
  }
};
