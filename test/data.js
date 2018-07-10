'use strict'

module.exports.zone = {zone_name: 'North Zone'};

module.exports.district = {
    district_name: "Nkhata-Bay",
    district_code: "NB",
    zone_id: 1
};

module.exports.owner = {
    "facility_owner": "NGO",
    "description": "Owner description"
};

module.exports.operationalStatus = {
    facility_operational_status: "Functional",
    description: "This facility is now operational"
};

module.exports.address = {
  "physical_address": "string",
  "postal_address": "string",
  "village": "string",
  "ta": "string",
  "facility_id": 1,
  "client_id": 1
};

module.exports.regulatoryStatus = {
    facility_regulatory_status: "Registered",
    description: "This is a registered facility"
};

module.exports.facilityType = {
    facility_type: "District hospital",
    description: "These facilities belongs to districts"
};

module.exports.utilityType = {
    utility_type: 'Energy Provider',
    description: "This is energy source"
};

module.exports.resourceType = {
    resource_type: 'Transport',
    description: "This is a resource type has many sub elements"
};

module.exports.serviceType = {
    service_type: 'Clinical Services',
    description: "These are clinical services"
};

module.exports.user = {
  username: "mfladminuser",
  password: "admin",
  firstname: "CMED",
  lastname: "Malawi",
  email: "administrator@gmail.com"
};

module.exports.facility = {
    facility_code: "NB01042",
    registration_number: 23456781,
    facility_name: "Nkhata-Bay Clinic",
    common_name: "Jonilenge",
    facility_date_opened: "2016-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    client_id: 1,
    district_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    published_date: "2017-10-25T13:27:53.703Z",
};

module.exports.location = {
  catchment_area: "Area 3",
  catchment_population: 5000,
  facility_id: 1
};

module.exports.contactPeople = {
    contact_person_fullname: "CMED Malawi",
    contact_person_phone: "+265 888 88 88 88",
    facility_id: 1,
};

module.exports.resource = {
  "resource_name": "Motor Vehicle Ambulances",
  "description": "This facility has one ambulance that is operational",
  "resource_type_id": 1,
};

module.exports.facilityResource = {
  "facility_id": 1,
  "resource_id": 1,
  "quantity": 221,
  "description": "string",
};

module.exports.utility = {
    "utility_name": "National Grid",
    "description": "This is national grid",
    "utility_type_id": 1,
};

module.exports.facilityUtility = {
    "facility_id": 1,
    "utility_id": 1
};

module.exports.service = {
    "service_name": "Out patient services (OPD)",
    "service_description": "This is out patient Service",
    "service_type_id": 1,
    "service_category_id": 0,
};

module.exports.facilityService = {
    "facility_id": 1,
    "service_id": 1
};
