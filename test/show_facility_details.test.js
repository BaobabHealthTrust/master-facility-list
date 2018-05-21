"use strict";


const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);


server.models.Facility.create({
    facility_code: "NB01042",
    facility_name: "Nkhata-Bay Clinic",
    common_name: "Jonilenge",
    facility_date_opened: "2017-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    district_id: 1,
    client_id: 1
});


server.models.ContactPeople.create({
    "contact_person_fullname": "Lazi Mzota",
    "contact_person_phone": "0999100101",
    "contact_person_email": "lmzota@gmail.com",
    "postal_address": "P. Box 43, Salima, Malawi",
    "facility_id": 1,
});

server.models.Resource.create({
    "resource_name": "Bed",
    "description": "Bed",
    "resource_type_id": 1,
});

server.models.FacilityResource.create({
    "facility_id": 1,
    "resource_id": 1,
    "quantity": 4,
    "description": "string",
});

server.models.Service.create({
  "service_name": "string",
  "service_description": "string",
  "service_type_id": 1,
  "service_category_id": 1,
});

server.models.FacilityService.create({
  "service_id": 1,
  "facility_id": 1,
});

server.models.Utility.create({
  "utility_name": "string",
  "description": "string",
  "utility_type_id": 1,
});

server.models.FacilityUtility.create({
  "facility_id": 1,
  "utility_id": 1,
});

describe("Show Facility Details", () => {

    it("Should Allow anyone to View the Basic Details of a Facility", (done) => {
        request
            .get("/api/Facilities/1")
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
                res.body.should.be.an('object');
                done();
            })
            .catch(err => console.error(err));
    });

    it("Should allow anyone to View the Contact Details of a Facility", (done) => {
        request
            .get("/api/Facilities/1/contactPeople")
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
                res.body.should.be.an('object');
                res.body.contact_person_fullname.should.equal('Lazi Mzota');
                done();
            })
            .catch(err => console.error(err));
    });

    it("Should Allow anyone to View the Resources belonging to a specific Facility", (done) => {
        request
            .get("/api/Facilities/1/resources")
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
                res.body.should.be.an('array');
                res.body[0].resource_name.should.equal('Bed');
                done();
            })
            .catch(err => console.error(err));
    });

    it("Should Allow anyone to View the Utilities belonging to a specific Facility", (done) => {
      request
      .get("/api/Facilities/1/utilities")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
          res.body.should.be.an('array');
          res.body[0].utility_name.should.equal('string');
          done();
      })
      .catch(err => console.error(err));
    });

    it("Should Allow anyone to View the Services belonging to a Specific Facility", (done) => {
      request
      .get("/api/Facilities/1/services")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
          res.body.should.be.an('array');
          res.body[0].service_name.should.equal('string');
          done();
      })
      .catch(err => console.error(err));
    });

});

