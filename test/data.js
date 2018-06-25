'use strict'

/** Database tables */
module.exports.tables = [
    'ACL',
    'AccessToken',
    'Address',
    'Client',
    'ContactPeople',
    'District',
    'Facility',
    'FacilityResource',
    'FacilityService',
    'FacilityType',
    'FacilityUtility',
    'Feedback',
    'FeedbackType',
    'Geolocation',
    'Location',
    'OperationalStatus',
    'Owner',
    'RegulatoryStatus',
    'Resource',
    'ResourceType',
    'Role',
    'RoleMapping',
    'Service',
    'ServiceType',
    'User',
    'Utility',
    'UtilityType',
    'Zone'
];

module.exports.zone = {zone_name: 'North Zone'};

module.exports.district = {
    district_name: "Nkhata-Bay",
    district_code: "NB"
};

module.exports.owner = {
    "facility_owner": "NGO",
    "description": "Owner description"
};

module.exports.operationalStatus = {
    facility_operational_status: "Functional",
    description: "This facility is now operational"
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

const serviceType = {
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
    facility_name: "Nkhata-Bay Clinic",
    common_name: "Jonilenge",
    facility_date_opened: "2016-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    published_date: "2017-10-25T13:27:53.703Z",
    district_id: 1,
    client_id: 1
};

module.exports.location = {
  catchment_area: "Area 3",
  catchment_population: 5000
};

module.exports.contactPeople = {
  contact_person_fullname: "Lyton Paul Nyemba",
  contact_person_phone: "+265 884 21 37 81",
  facility_id: 1,
};

module.exports.resource = {
  "resource_name": "Motor Vehicle Ambulances",
  "description": "This facility has one ambulance that is operational",
  "resource_type_id": 1,
};

module.exports.contactPeople = {
    contact_person_fullname: "Lyton Paul Nyemba",
    contact_person_phone: "+265 884 21 37 81",
    facility_id: 1,
};

module.exports.resource = {
    "resource_name": "Motor Vehicle Ambulances",
    "description": "This facility has one ambulance that is operational",
    "resource_type_id": 1,
};

module.exports.utility = {
    "utility_name": "National Grid",
    "description": "This is national grid",
    "utility_type_id": 1,
};

module.exports.service = {
    "service_name": "Out patient services (OPD)",
    "service_description": "This is out patient Service",
    "service_type_id": 1,
    "service_category_id": 0,
};

