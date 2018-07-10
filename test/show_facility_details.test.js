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
  Utility,
  UtilityType,
  FacilityUtility,
  Service,
  ServiceType,
  FacilityService
} = server.models;

const helper = require('./helper');
const data = require('./data');

const {
  district,
  facility,
  contactPeople,
  resource,
  resourceType,
  facilityResource,
  utility,
  utilityType,
  facilityUtility,
  service,
  serviceType,
  facilityService,
} = data;

describe("Show Facility Details", () => {

    before(async () => {
        await helper.createAdmin(data.user);
        await helper.create(district, District);
        await helper.create(facility, Facility);
        await helper.create(contactPeople, ContactPeople)
        await helper.create(facility, Facility);
        await helper.create(utilityType, UtilityType);
        await helper.create(utility, Utility);
        await helper.create(facilityUtility, FacilityUtility);
        await helper.create(serviceType, ServiceType);
        await helper.create(service, Service);
        await helper.create(facilityService, FacilityService);
        await helper.create(resourceType, ResourceType);
        await helper.create(resource, Resource);
        await helper.create(facilityResource, FacilityResource);
    });

    after(done => dataSource.automigrate(err => done(err)));

    it("Should Allow anyone to View the Basic Details of a Facility", (done) => {
        helper.get("/api/Facilities/1", 200, (res) => {
            res.body.should.be.an('object');
            res.body.facility_name.should.equal(facility.facility_name);
            done();
        });
    });

    it("Should Allow anyone to View the Contact Details of a Facility", (done) => {
        helper.get("/api/Facilities/1/ContactPeople", 200 , (res) => {
            res.body.should.be.an('object');
            res.body.contact_person_fullname.should.equal(
                contactPeople.contact_person_fullname
            );
            done();
        });
    });

    it("Should Allow anyone to View the Resources belonging to a specific Facility", (done) => {
        helper.get("/api/Facilities/1/resources", 200 , (res) => {
            res.body.should.be.an('array');
            res.body[0].resource_name.should.equal(resource.resource_name);
            done();
        });
    });

    it("Should Allow anyone to View the Utilities belonging to a specific Facility", (done) => {
        helper.get("/api/Facilities/1/utilities", 200 , (res) => {
            res.body.should.be.an('array');
            res.body[0].utility_name.should.equal(utility.utility_name);
            done();
        });
    });

    it("Should Allow anyone to View the Services belonging to a Specific Facility", (done) => {
        helper.get("/api/Facilities/1/services", 200 , (res) => {
            res.body.should.be.an('array');
            res.body[0].service_name.should.equal(service.service_name);
            done();
        });
    });
});

