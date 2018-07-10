"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;

const {
  District,
  Facility,
  ContactPeople,
  FacilityResource,
  Resource,
  ResourceType,
  FacilityType,
  Utility,
  UtilityType,
  FacilityUtility,
  Service,
  ServiceType,
  FacilityService,
  Zone,
  Owner,
  Location,
  RegulatoryStatus,
  OperationalStatus,
  Address
} = server.models;

const helper = require('./helper');
const data = require('./data');

const {
  address,
  owner,
  regulatoryStatus,
  operationalStatus,
  district,
  facility,
  facilityType,
  contactPeople,
  resource,
  resourceType,
  facilityResource,
  utility,
  utilityType,
  facilityUtility,
  service,
  location,
  serviceType,
  facilityService,
  zone
} = data;

describe("Download Facilities Test", () => {

    // before(async () => {
    //     await helper.createAdmin(data.user);
    //     await helper.create(zone, Zone);
    //     await helper.create(district, District);
    //     await helper.create(owner, Owner);
    //     await helper.create(regulatoryStatus, RegulatoryStatus);
    //     await helper.create(operationalStatus, OperationalStatus);
    //     await helper.create(facilityType, FacilityType);
    //     await helper.create(facility, Facility);
    //     await helper.create(contactPeople, ContactPeople)
    //     await helper.create(facility, Facility);
    //     await helper.create(address, Address);
    //     await helper.create(utilityType, UtilityType);
    //     await helper.create(utility, Utility);
    //     await helper.create(facilityUtility, FacilityUtility);
    //     await helper.create(serviceType, ServiceType);
    //     await helper.create(service, Service);
    //     await helper.create(location, Location);
    //     await helper.create(facilityService, FacilityService);
    //     await helper.create(resourceType, ResourceType);
    //     await helper.create(resource, Resource);
    //     await helper.create(facilityResource, FacilityResource);
    // });

    // after(done => dataSource.automigrate(err => done(err)));

    // it("Should allow anyone to download a copy of facilities matching a user defined query in a user defined file format", (done) => {
    //     let query = JSON.stringify({
    //         "where": {},
    //         "format": "pdf"
    //     });

    //     let url = "/api/facilities/download?data=" + query;
    //     helper.get(url, 200, (res) => {
    //         const header = res.header;
    //         header['content-type'].should.equal('application/pdf');
    //     });

    //     query = JSON.stringify({
    //         "where": {},
    //         "format": "csv"
    //     });

    //     url = "/api/facilities/download?data=" + query;
    //     helper.get(url, 200, (res) => {
    //         const header = res.header;
    //         header['content-type'].should.equal('text/csv; charset=utf-8');
    //     });

    //     query = JSON.stringify({
    //       "where": {},
    //       "format": "excel"
    //     });

    //     url = "/api/facilities/download?data=" + query;
    //     helper.get(url, 200, (res) => {
    //       const header = res.header;
    //       header['content-type'].should.equal('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    //     });

    //     done();
    // });

    // it("Should Allows anyone to download details of a user specified facility in PDF Format", (done) => {
    //     const url = "/api/facilities/download/1";
    //     helper.get(url, 200, (res) => {
    //         const header = res.header;
    //         header['content-type'].should.equal('application/pdf');
    //         done();
    //     });
    // });

});
