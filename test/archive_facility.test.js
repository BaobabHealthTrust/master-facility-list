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
const facility = data.facility;

describe("Archive Client Test", function() {

    before(async () => {
        await helper.createAdmin(data.user);
        await helper.create(data.district, District);
        await helper.create(data.facility, Facility);
    });

    after(done => dataSource.automigrate(err => done(err)));

  it("should Allow an Authorized Administrator Client to Archive another Administrator Client", (done) => {
      const callback = function(error, facility) {
        if (error) done(error);
        if (facility) {
          helper.post("/api/Clients/login", data.user, 200, (res) => {
            const url = `/api/Facilities/${facility[0].id}?access_token=` + res.body.id;
            const date = { archived_date: "2017-10-25T13:27:53.703Z"};
            helper.put(url, date, 200, (res) => {
              res.body.should.be.an('object');
              res.body.archived_date.should.equal(
                date.archived_date
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

  it("Should  Display appropriate error message when an Unauthorized Client attempts to Assign Services to a Facility", (done) => {
    helper.create(data.facility, Facility);
    const callback = function(error, facility) {
      if (error) done(error);
      if (facility) {
        const url = `/api/Facilities/${facility[0].id}`;
        const date = {
          archived_date: "2017-10-25T13:27:53.703Z"
        };
        helper.put(url, date, 401, (res) => {
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
