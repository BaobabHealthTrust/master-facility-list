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

describe("Create Facility", () => {


    it("Should Allows Authorized Administrator to Create Basic Details of a Facility", (done) => {
        request
            .post("/api/Clients/login")
            .send({
                password: "malu123",
                email: "mmalumbo@gmail.com"
            })
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
              request
                  .post("/api/Facilities?access_token="+res.body.id)
                  .send({
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
                  })
                  .set("Accept", "application/json")
                  .set('Access_token', res.body.id)
                  .set('Authorization_token', res.body.id)
                  .set('Header', res.body.id)
                  .expect(200)
                  .then((res) => {
                      token = res.body.id;
                      console.log(token);
                      done();
                  })
                  .catch(err => console.error(err));
            })
            .catch(err => console.error(err));


    });

});
