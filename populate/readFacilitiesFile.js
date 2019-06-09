'use strict';

const { error, log } = console;
const parse = require('csv-parse');
const faker = require('faker');
const { existsSync, createReadStream, writeFile } = require('fs');
const server = require('../server/server');
const dataSource = server.dataSources.db;

const {
  Address,
  ContactPeople,
  District,
  Facility,
  FacilityType,
  FacilityService,
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

module.exports = async (filePath = './../data/facilities.csv') => {
  await createReadStream(filePath).pipe(parser);
};

const truncate = async (Model) => {
  const dataSource = Model.dataSource;
  const query = `TRUNCATE TABLE ${Model.definition.name}`;

  await dataSource.connector.execute(query, [], function(err, model) {
    if (err) console.error(err);
  });
};

const getIds = async (Model, where) => {
  const foundModel = await Model.findOne({ where });
  return foundModel ? foundModel.id : 1;
};

const createFacility = async (facility) => {
  const district_name = facility[6].trim();
  const facility_type = facility[4].trim();
  const facility_owner = facility[5].trim();
  const registration_number = facility[14].trim();

  const facility_name = facility[8];

  if (!facility_name) {
    return null;
  }

  return await Facility.create({
    facility_code_mapping: [
      {
        system: 'DHIS2',
        code: facility[13],
        url: '',
      },
    ],
    registration_number,
    facility_name,
    common_name: facility[9],
    facility_date_opened: new Date('1975-01-01'),
    facility_type_id: await getIds(FacilityType, { facility_type }),
    facility_owner_id: await getIds(Owner, { facility_owner }),
    facility_operational_status_id: facility[21] ? 1 : 6,
    facility_regulatory_status_id: registration_number ? 1 : 5,
    district_id: await getIds(District, { district_name }),
    client_id: 1,
    published_date: new Date(Date.now()),
  }).catch((e) => console.error(e.message));
};

const createGeolocation = async (facility, id) => {
  await Geolocation.create({
    datum: facility[15],
    longitude: facility[16],
    latitude: facility[17],
    facility_id: id,
    client_id: 1,
  });
};

const addFacilityResource = async (resource_name, quantity, facility_id) => {
  const foundResource = await Resource.findOne({ where: { resource_name } });

  if (!foundResource || !quantity || isNaN(quantity) || quantity == 0) {
    return;
  }

  await FacilityResource.create({
    facility_id,
    resource_id: foundResource.id,
    quantity: quantity ? Number(quantity) : 0,
    description: resource_name,
    client_id: 1,
    created_date: new Date(Date.now()),
  });
};

const addFacilityService = async (service_name, value, facility_id) => {
  const foundService = await Service.findOne({ where: { service_name } });

  if (!foundService || !value || isNaN(value) || value == 0) {
    return;
  }

  await FacilityService.create({
    facility_id,
    client_id: 1,
    service_id: foundService.id,
  });
};

const addFacilityResources = async (facility, id) => {
  // Beds
  await addFacilityResource('Maternity beds', facility[80], id);
  await addFacilityResource('Delivery beds', facility[81], id);
  await addFacilityResource('Other inpatient beds', facility[78], id);
  await addFacilityResource('Total overningt beds', facility[79], id); // TODO: ask the architect

  // Transport
  await addFacilityResource('Motor Vehicle Ambulances', facility[110], id);
  await addFacilityResource('Motor cycles', facility[109], id);
  await addFacilityResource('Vehicles/Cars', facility[108], id);
  await addFacilityResource('Motor cycles', facility[108], id);
  await addFacilityResource('Motor Bike Ambulances', facility[110], id);
  await addFacilityResource('Bicycles', facility[111], id);
  await addFacilityResource('Other', facility[112], id);

  // Computers
  await addFacilityResource('Desktop', facility[101], id);

  // HOUSEs
  await addFacilityResource('Staff houses', facility[101], id);
};

const addFacilityServices = async (facility, id) => {
  //  Family Planning
  await addFacilityService('Pill', facility[241], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Injectable', facility[243], id);

  // await addFacilityService('Male condoms', facility[245], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Pill', facility[242], id);
};

const parser = parse({ delimiter: ',' }, async (err, facilities) => {
  if (err) {
    error(err.message);
    process.exit(1);
    return;
  }

  facilities.push(['#!']);

  await truncate(Facility);
  await truncate(ContactPeople);
  await truncate(Geolocation);
  await truncate(FacilityResource);
  await truncate(FacilityService);

  for (const facility of facilities) {
    const [firstElement] = facility;

    const createdFacility = await createFacility(facility);
    if (!createdFacility || firstElement === '#') {
      // var fs = require('fs');
      // fs.writeFile('temp.txt', facility.join('\n'), (err) => {
      //   if (err) console.log(err);
      //   console.log('Successfully Written to File.');
      // });
      continue;
    }

    const { id } = createdFacility;
    await createGeolocation(facility, id);

    await ContactPeople.create({
      contact_person_fullname: 'John Bands',
      contact_person_phone: '0111234567',
      contact_person_email: 'johnbanda@kuunika.org',
      facility_id: id,
      client_id: 1,
      postal_address: 'P. O. box 1234, Kuunika',
    });

    await Address.create({
      physical_address: 'Kuunika',
      postal_address: 'p.o. box 1234, Kuunika',
      village: 'Kuunika',
      ta: facility[28],
      facility_id: id,
    });

    await Location.create({
      catchment_area: 'urban',
      catchment_population: 0,
      client_id: 1,
      facility_id: id,
    });

    await addFacilityResources(facility, id);
    await addFacilityServices(facility, id);
    break;
  }

  await dataSource.disconnect();
});
