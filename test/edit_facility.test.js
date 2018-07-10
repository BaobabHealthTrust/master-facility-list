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
  user
} = data;

describe("Edit Facility Test", () => {

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

  it("should Allow an Authorized Administrator to Edit Basic Details of a Facility", (done) => {
    const callback = function(error, facility) {
      if (error) done(error);
      if (facility) {
        helper.post("/api/Clients/login", data.user, 200, (res) => {
          const url = `/api/Facilities/${facility[0].id}?access_token=` + res.body.id;
          const facilityData = {facility_name: "Malu"}
          helper.put(url, facilityData, 200, (res) => {
              res.body.should.be.an('object');
              res.body.facility_name.should.equal(facilityData.facility_name);
              done();
          });
        });
      }
    };

    Facility.find({
      where: {
        facility_name: facility.facility_name
      },
      limit: 1
    }, callback);
  });

  it("should Display appropriate error message when an Unauthorized Client attempts to Edit Basic Details of a Facility", (done) => {
    const callback = function(error, facility) {
        if (error) done(error);
        if (facility) {
          const url = `/api/Facilities/${facility[0].id}`;
          const facilityData = {facility_name: "Malu"}
          helper.put(url, facilityData, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
        where: {
          facility_name: facility.facility_name
        },
        limit: 1
      }, callback);
  });

  it("Should allow an Authorized Administrator to Edit Contact Details of a Facility", (done) => {
      const callback = function (error, contact) {
        if (error) done(error);
        if (contact) {
          helper.post("/api/Clients/login", user, 200, (res) => {
            const url = `/api/ContactPeople/${contact[0].id}?access_token=` + res.body.id;
            helper.put(url, {contact_person_fullname: 'Malu'}, 200, (res) => {
                res.body.should.be.an('object');
                res.body.contact_person_fullname.should.equal("Malu");
                done();
            });
          });
        }
      };

      ContactPeople.find({
        where: {
          id: contactPeople.id
        },
        limit: 1
      }, callback);
  });

  it("should Display appropriate error message when an Unauthorized Client attempts to Edit Contact Details of a Facility", (done) => {
      const callback = function (error, contact) {
          if (error) done(error);
          if (contact) {
              const url = `/api/ContactPeople/${contact[0].id}`;
              helper.put(url, {contact_person_fullname: 'Malu'}, 401, (res) => {
                  res.body.error.message.should.equal('Authorization Required');
                  done();
              });
          }
      };

      ContactPeople.find({
        where: {
          id: contactPeople.id
        },
        limit: 1
      }, callback);
  });

  it("should allow an Authorized Administrator to Re-assign Resources to a Facility", (done) => {
      const callback = function (error, facilityResourceData) {
        if (error) done(error);
        if (facilityResourceData) {
          helper.post("/api/Clients/login", user, 200, (res) => {
              const url = `/api/FacilityResources/${facilityResourceData[0].id}?access_token=` + res.body.id;
              helper.put(url, {facility_id: 2 }, 200, (res) => {
                  res.body.should.be.an('object');
                  res.body.facility_id.should.equal(2);
                  done();
              });
          });
        }
      };

      FacilityResource.find({
        where: {
          id: facilityResource.id
        },
        limit: 1
      }, callback);
  });

  it("Display appropriate error message when an Unauthorized Client attempts to Re-assign Resources of a Facility", (done) => {
      const callback = function (error, facilityResourceData) {
          if (error) done(error);
          if (facilityResourceData) {
            const url = `/api/FacilityResources/${facilityResourceData[0].id}`;
            helper.put(url, {facility_id: 2}, 401, (res) => {
                res.body.error.message.should.equal('Authorization Required');
                done();
            });
          }
      };

      FacilityResource.find({
          where: {
              id: facilityResource.id
          },
          limit: 1
      }, callback);
  });

  it("Should Allow an Authorized Administrator to Re-assign Utilities of a Facility", (done) => {
      const callback = function (error, facilityUtilityData) {
        if (error) done(error);
        if (facilityUtilityData) {
          helper.post("/api/Clients/login", user, 200, (res) => {
            const url = `/api/FacilityUtilities/${facilityUtilityData[0].id}?access_token=` + res.body.id;
            helper.put(url, {facility_id: 2}, 200, (res) => {
                res.body.should.be.an('object');
                res.body.facility_id.should.equal(2);
                done();
            });
          });
        }
      };

      FacilityUtility.find({
        where: {
          id: facilityUtility.id
        },
        limit: 1
      }, callback);
  });

  it(" Display appropriate error message when an Unauthorized Client attempts to Re-assign Utilities of a Facility", (done) => {
      const callback = function (error, facilityUtilityData) {
          if (error) done(error);
          if (facilityUtilityData) {
              const url = `/api/FacilityUtilities/${facilityUtilityData[0].id}`;
              helper.put(url, {facility_id: 2}, 401, (res) => {
                  res.body.error.message.should.equal('Authorization Required');
                  done();
              });
          }
      };

      FacilityUtility.find({
          where: {
              id: facilityUtility.id
          },
          limit: 1
      }, callback);
  });

  it("Should Allow an Authorized Administrator to Re-assign Services of a Facility", (done) => {
      const callback = function (error, facilityServiceData) {
          if (error) done(error);
          if (facilityServiceData) {
              helper.post("/api/Clients/login", user, 200, (res) => {
                  const url = `/api/FacilityServices/${facilityServiceData[0].id}?access_token=` + res.body.id;
                  helper.put(url, {facility_id: 2}, 200, (res) => {
                      res.body.should.be.an('object');
                      res.body.facility_id.should.equal(2);
                      done();
                  });
              });
          }
      };

      FacilityService.find({
          where: {
              id: facilityUtility.id
          },
          limit: 1
      }, callback);
  });

  it(" Display appropriate error message when an Unauthorized Client attempts to Re-assign Services of a Facility", (done) => {
      const callback = function (error, facilityServiceData) {
          if (error) done(error);
          if (facilityServiceData) {
              const url = `/api/FacilityServices/${facilityServiceData[0].id}`;
              helper.put(url, {facility_id: 2}, 401, (res) => {
                  res.body.error.message.should.equal('Authorization Required');
                  done();
              });
          }
      };

      FacilityService.find({
          where: {
              id: facilityService.id
          },
          limit: 1
      }, callback);
  });

});
