'use strict';

const createFacility = require('./createFacility');
const getModelData = require('./getModelData');
const server = require('../../server/server');
const truncate = require('./truncate');

const dataSource = server.dataSources.db;

const {
  Address,
  ContactPeople,
  District,
  Facility,
  FacilityType,
  FacilityService,
  FacilityUtility,
  FeedbackType,
  Geolocation,
  OperationalStatus,
  Owner,
  Utility,
  UtilityType,
  Location,
  RegulatoryStatus,
  Resource,
  ResourceType,
  Service,
  ServiceType,
  Zone,
  FacilityResource,
} = server.models;

const getfacilityType = require('./getfacilityType');
const getfacilityOwner = require('./getfacilityOwner');
const getfacilityDistrict = require('./getfacilityDistrict');
const getFacilityRegulatoryStatus = require('./getFacilityRegulatoryStatus');
const getFacilityOperationalStatus = require('./getFacilityOperationalStatus');

const createFacilityAddress = require('./createFacilityAddress');
const createFacilityLocation = require('./createFacilityLocation');
const createFacilityGeolocation = require('./createFacilityGeolocation');
const createFacilityContactPeople = require('./createFacilityContactPeople');
const createFacilityUtilities = require('./createFacilityUtilities');
const createFacilityResources = require('./createFacilityResources');
const createFacilityServices = require('./createFacilityServices');

const truncateTables = require('./truncateTables');

const { log } = console;

module.exports = async (facilities = []) => {
  await truncateTables();

  const facilityOwners = await getModelData(Owner, {});
  const facilityTypes = await getModelData(FacilityType, {});
  const facilityOperationalStatus = await getModelData(OperationalStatus, {});
  const facilityRegulatoryStatus = await getModelData(RegulatoryStatus, {});
  const districts = await getModelData(District, {});
  const utilities = await getModelData(Utility, {});
  const resources = await getModelData(Resource, {});
  const services = await getModelData(Service, {});

  for (const facility of facilities) {
    const [firstElement] = facility;
    const facility_name = facility[8];

    if (!facility_name || firstElement == '#') {
      continue;
    }

    const createdFacility = await createFacility(
      facility,
      getfacilityOwner(facilityOwners, String(facility[5].trim())),
      getfacilityType(facilityTypes, String(facility[4].trim())),
      getfacilityDistrict(districts, String(facility[6].trim())),
      getFacilityOperationalStatus(facilityOperationalStatus, facility[21]),
      getFacilityRegulatoryStatus(
        facilityRegulatoryStatus,
        facility[14].trim(),
      ),
    );

    const { id } = createdFacility;

    await createFacilityGeolocation(facility, id);
    await createFacilityContactPeople(facility, id);
    await createFacilityAddress(facility, id);
    await createFacilityLocation(facility, id);
    await createFacilityUtilities(utilities, facility, id);
    await createFacilityResources(resources, facility, id);
    await createFacilityServices(services, facility, id);

    log('✅', createdFacility.id, ' => ', createdFacility.facility_name);
    break;
  }

  /**
   * The line bellow is a hack
   * TODO: use `await dataSource.disconnect();`
   */
  process.exit(0);
};
