"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const {
    District,
    Facility
} = server.models

const dataSource = server.dataSources.db;
const data = require("./data");
const helper = require('./helper');

describe("Create Facility", function() {

    before(async () => {
        await helper.createAdmin(data.user);
        await helper.create(data.district, District);
    });

    after(done => dataSource.automigrate(err => done(err)));

    it("Should Allow Authorized Administrator to Create Basic Details of a Facility", function(done) {
        helper.post("/api/Clients/login", data.user, 200, function(res) {
            const url = "/api/Facilities?access_token=" + res.body.id;
            const facility = data.facility;
            helper.post(url, facility, 200, function(res) {
                res.body.should.be.an('object');
                res.body.facility_name.should.equal(facility.facility_name);
                done();
            });
        });
    });


//     // it("Should  Automatically generates a Facility Code upon creation of Basic Details", (done) => {
//     //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
//     //       if(facility){
//     //         facility[0].facility_code.should.equal(facilityData.facility_code);
//     //         done();
//     //       }
//     //     });
//     // });

    it("Should Display appropriate error message when an Unauthorized Client attempts to create Facility Basic Details", function (done) {
        const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
        helper.post("/api/Facilities?access_token=" + token, data.facility, 401, function (res) {
            res.body.error.message.should.equal('Authorization Required');
            done();
        });
    });

    it ("Should Displays appropriate error message when a different Authorized Administrator attempts to Create Location Details of a Facility", done => {
        const contact = data.contactPeople;
        helper.post("/api/ContactPeople", data.facility, 401, function (res) {
            res.body.error.message.should.equal('Authorization Required');
            done();
        });
    });

    if ("should Allow the same Authorized Administrator Who Created the Basic Details to Create Location Details of a Facility",done => {
        helper.post("/api/Clients/login", data.user, 200, function(res) {
            const url = "/api/ContactPeople?access_token=" + res.body.id;
            const contact = data.contactPeople;
            helper.post(url, contact, 200, function(res) {
                res.body.should.be.an('object');
                res.body.contact_person_fullname.should.equal(contact.contact_person_fullname);
                done();
            });
        });
    });

    it("Should Display appropriate error message when an Unauthorized Client attempts to Create Location Details of a Facility", function(done) {
        const callback = function(error, facility) {
            if (error) done(error);
            if (facility) {
                const url = `/api/Facilities/${facility[0].id}/locations`;
                const locationData = {
                    ...data.location,
                    facility_id: facility[0].id,
                };
                helper.post(url, locationData, 401, (res) => {
                    res.body.error.message.should.equal('Authorization Required');
                    done();
                });
            }
        };

        Facility.find({
            where: {
                facility_name: data.facility.facility_name
            },
            limit: 1
        }, callback);
    });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Assign Resources to the Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          helper.post("/api/Clients/login", data.user, 200, function (res) {
            const url = `/api/FacilityResources?access_token=` + res.body.id;
            const facilityResource = {
              "facility_id": facility[0].id,
              "resource_id": 1,
              "quantity": 20,
              "description": "string",
            }

            helper.post(url, facilityResource, 200, function(res) {
              res.body.should.be.an('object');
              res.body.facility_id.should.equal(facilityResource.facility_id);
              done();
            });
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should Display appropriate error message when a Different Authorized Administrator attempts to Assign Resources to a Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
          const url = `/api/FacilityResources?access_token=` + token;
          const facilityResource = {
            "facility_id": facility[0].id,
            "resource_id": 1,
            "quantity": 20,
            "description": "string",
          }

          helper.post(url, facilityResource, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });


    it("Should Display appropriate error message when an Unauthorized Client attempts to Assign Resources to a Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          const url = `/api/FacilityResources`;
          const facilityResource = {
            "facility_id": facility[0].id,
            "resource_id": 1,
            "quantity": 20,
            "description": "string",
          }

          helper.post(url, facilityResource, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Assign Utilities to the Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          helper.post("/api/Clients/login", data.user , 200, function (res) {
            const url = `/api/FacilityUtilities?access_token=` + res.body.id;

            const facilityUtility = {
              "facility_id": facility[0].id,
              "utility_id": 1
            }

            helper.post(url, facilityUtility, 200, (res) => {
              res.body.should.be.an('object');
              res.body.facility_id.should.equal(facilityUtility.facility_id);
              done();
            });
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should Display appropriate error message when a Different Authorized Administrator attempts to Assign Utilities to a Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
          const url = `/api/FacilityUtilities?access_token=` + token;

          const facilityUtility = {
            "facility_id": facility[0].id,
            "utility_id": 1
          }

          helper.post(url, facilityUtility, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should Display appropriate error message when an Unauthorized Client attempts to Assign Utilities to a Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          const url = `/api/FacilityUtilities`;
          const facilityUtility = {
            "facility_id": facility[0].id,
            "utility_id": 1
          }
          helper.post(url, facilityUtility, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Assign services to the Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          helper.post("/api/Clients/login", data.user , 200, function (res) {
            const url = `/api/FacilityServices?access_token=` + res.body.id;

            const facilityService = {
              "facility_id": facility[0].id,
              "service_id": 1
            }

            helper.post(url, facilityService, 200, (res) => {
              res.body.should.be.an('object');
              res.body.facility_id.should.equal(facilityService.facility_id);
              done();
            });
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should Display appropriate error message when a Different Authorized Administrator attempts to Assign Services to a Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
          const url = `/api/FacilityServices?access_token` + token;

          const facilityService = {
            "facility_id": facility[0].id,
            "service_id": 1
          }

          helper.post(url, facilityService, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
        where: {
          facility_name: data.facility.facility_name
        },
        limit: 1
      }, callback);
    });

    it("Should  Display appropriate error message when an Unauthorized Client attempts to Assign Services to a Facility", (done) => {
      const callback = function (error, facility) {
        if (error) done(error);
        if (facility) {
          const url = `/api/FacilityServices`;
          const facilityService = {
            "facility_id": facility[0].id,
            "service_id": 1
          }
          helper.post(url, facilityService, 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
          });
        }
      };

      Facility.find({
          where: {
              facility_name: data.facility.facility_name
          },
          limit: 1
      }, callback);
    });
});
