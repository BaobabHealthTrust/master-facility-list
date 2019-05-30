'use strict';

const { error, log } = console;
const parse = require('csv-parse');
const { existsSync, createReadStream } = require('fs');
const server = require('../server/server');
const dataSource = server.dataSources.db;
const {
  District,
  Facility,
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

module.exports = async (filePath = './../data/facilities.csv') => {
  await createReadStream(filePath).pipe(parser);
};

const getIds = async (Model, where) => {
  const foundModel = await Model.findOne({ where });
  return foundModel ? foundModel.id : 1;
};

const parser = parse({ delimiter: ',' }, async (err, facilities) => {
  if (err) {
    error(err.message);
    process.exit(1);
    return;
  }

  const dataSource = Facility.dataSource;
  const query = `TRUNCATE TABLE ${Facility.definition.name}`;

  await dataSource.connector.execute(query, [], function(err, model) {
    if (err) console.error(err);
  });

  // const districtsIds = await getIds(District);

  const preparedFacilities = [];

  for (const facility of facilities) {
    const [firstElement] = facility;
    if (firstElement === '#') {
      continue;
    }

    const district_name = facility[6].trim();
    const facility_type = facility[4].trim();
    const facility_owner = facility[5].trim();
    const registration_number = facility[14].trim();

    await preparedFacilities.push({
      facility_code_dhis2: facility[13],
      registration_number,
      facility_name: facility[8],
      common_name: facility[9],
      facility_date_opened: new Date('1975-01-01'),
      facility_type_id: await getIds(FacilityType, { facility_type }),
      facility_owner_id: await getIds(Owner, { facility_owner }),
      facility_operational_status_id: facility[21] ? 1 : 6,
      facility_regulatory_status_id: registration_number ? 1 : 5,
      district_id: await getIds(District, { district_name }),
      client_id: 1,
      published_date: new Date(Date.now()),
    });

    const y = await Facility.create({
      facility_code_dhis2: facility[13],
      registration_number,
      facility_name: facility[8],
      common_name: facility[9],
      facility_date_opened: new Date('1975-01-01'),
      facility_type_id: await getIds(FacilityType, { facility_type }),
      facility_owner_id: await getIds(Owner, { facility_owner }),
      facility_operational_status_id: facility[21] ? 1 : 6,
      facility_regulatory_status_id: registration_number ? 1 : 5,
      district_id: await getIds(District, { district_name }),
      client_id: 1,
      published_date: new Date(Date.now()),
    });

    console.log(y);
    break;
  }
  await dataSource.disconnect();
});
