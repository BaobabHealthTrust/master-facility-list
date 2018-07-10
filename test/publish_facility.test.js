"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;

const {
  District,
  Facility
} = server.models;

const data = require("./data");
const helper = require('./helper');


describe("Publish Facility Test", () => {

    before(async () => {
        await helper.createAdmin(data.user);
        await helper.create(data.district, District);
        await helper.create(data.facility, Facility);
    });

    after(done => dataSource.automigrate(err => done(err)));

  it("should Allow the same Authorized Administrator who created the Basic Details to Publish the Facility", (done) => {
      const callback = function(error, facility) {
        if (error) done(error);
        if (facility) {
          helper.post("/api/Clients/login", data.user, 200, (res) => {
            const url = `/api/Facilities/${facility[0].id}?access_token=` + res.body.id;
            const date = {
              published_date: "2017-10-25T13:27:53.703Z"
            };
            helper.put(url, date, 200, (res) => {
              res.body.should.be.an('object');
              res.body.published_date.should.equal(
                date.published_date
              );
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

});
