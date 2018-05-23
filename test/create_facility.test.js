"use strict";

const should = require("chai").should();
const helper = require('./helper');
const data = require("../seeds/data");

const user =  {
    password: data.users[0].password,
    email: data.users[0].email
}

describe("Create Facility", () => {

  it("Should Allows Authorized Administrator to Create Basic Details of a Facility", (done) => {
      helper.post("/api/Clients/login", user ,200 , (res) => {
          const url = "/api/Facilities?access_token="+res.body.id;
          helper.post(url, data.facility ,200 , (res) => {
              res.body.should.be.an('object');
              res.body.facility_name.should.equal(data.facility.facility_name);
          });
      });
      done();
  });

  it("Should  Automatically generates a Facility Code upon creation of Basic Details", (done) => {
      helper.get("/api/Facilities/1", 200 , (res) => {
          res.body.should.be.an('object');
          res.body.facility_code.should.equal(data.facility.facility_code);
      });
      done();
  });

});
