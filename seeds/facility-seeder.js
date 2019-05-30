'use strict';
const server = require('../server/server');
const faker = require('faker');
const getIds = require('./seed-helpers').getIds;

const {
  FacilityType,
  OperationalStatus,
  RegulatoryStatus,
  Owner,
  District,
  Client,
  Resource,
  Facility,
} = server.models;

module.exports = async (facilityCount) => {
  await Facility.deleteAll();
  const facilityTypeIds = await getIds(FacilityType);
  const operationalStatusIds = await getIds(OperationalStatus);
  const ownerIds = await getIds(Owner);
  const regulatoryStatusIds = await getIds(RegulatoryStatus);
  const districtIds = await getIds(District);
  const clientIds = await getIds(Client);
  const ResourcesIds = await getIds(Resource);
  const facilities = [];
  for (let counter = 0; counter < facilityCount; counter++) {
    const facility = {
      facility_code: faker.random.number({ min: 1000, max: 9000 }),
      facility_name: faker.name.findName(),
      common_name: faker.company.companyName(),
      facility_date_opened: faker.date.recent(),
      facility_type_id: faker.random.arrayElement(facilityTypeIds),
      facility_owner_id: faker.random.arrayElement(ownerIds),
      facility_operational_status_id: faker.random.arrayElement(
        operationalStatusIds,
      ),
      facility_regulatory_status_id: faker.random.arrayElement(
        regulatoryStatusIds,
      ),
      district_id: faker.random.arrayElement(districtIds),
      client_id: faker.random.arrayElement(clientIds),
      published_date: '2018-05-09',
    };
    facilities.push(facility);
  }
  console.log(`Creating ${facilities.length} Facilities`);
  return await Facility.create(facilities);
};
