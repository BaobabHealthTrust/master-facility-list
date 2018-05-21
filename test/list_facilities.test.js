"use strict";


const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);


const facility = {
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
};

server.models.Facility.create(facility);

describe("List Facilities", () => {

    it("Should allow anyone to View a List of Published Facilities", (done) => {
        request
            .get("/api/Facilities")
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
              res.body.should.be.an('array');
              done();
            })
            .catch(err => console.error(err));
    });

});

