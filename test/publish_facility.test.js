"use strict";


const should = require("chai").should();
const server = require("../server/server");
const data = require('./data');
const helper = require('./helper');


helper.createAdmin();
helper.createFacility();

describe("Publish Facility Test", () => {

  it("should Allow the same Authorized Administrator who Crreated the Basic Details to Publish the Facility", (done) => {
      server.models.Facility.find( {where: {facility_code: data.facility.facility_code}, limit: 1}, async (err, facility) => {
        if(facility){
          await helper.post("/api/Clients/login", data.user ,200 , (res) => {
              const url = `/api/Facilities/${facility[0].id}?access_token=`+res.body.id;
              const facilityData = {
                  published_date: "2017-10-25T13:27:53.703Z"
              };
              helper.put(url, facilityData ,200 , (res) => {
                res.body.should.be.an('object');
                res.body.published_date.should.equal(
                  "2017-10-25T13:27:53.703Z"
                );
                done();
              });
          });
        }
      });
  });

});
