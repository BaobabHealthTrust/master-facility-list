"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;

const {
  District,
  Facility
} = server.models;

const helper = require('./helper');
const data = require('./data');

describe("List Facilities", () => {

    before( async () => {
        await helper.createAdmin(data.user);
        await helper.create(data.district, District);
        await helper.create(data.facility, Facility);
    });

    after(done => dataSource.automigrate(err => done(err)));

    let desc = "Should allow users to view a list of published facilities";
    it(desc, (done) => {
        helper.get('/api/Facilities',200, res => {
            res.body.should.be.an('array');
            res.body[0].facility_name.should.equal(data.facility.facility_name);

            res.body[0].published_date.should.equal(
                data.facility.published_date
            );

            done();
        });
    });
});
