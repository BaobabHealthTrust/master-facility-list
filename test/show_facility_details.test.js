"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');
const data = require("../seeds/data");


describe("Show Facility Details", () => {

    it("Should Allow anyone to View the Basic Details of a Facility", (done) => {
        helper.get("/api/Facilities/1", 200 , (res) => {
            res.body.should.be.an('object');
            done();
        });

    });

    it("Should Allow anyone to View the Contact Details of a Facility", (done) => {
        helper.get("/api/Facilities/1/ContactPeople", 200 , (res) => {
            res.body.should.be.an('object');
            done();
        });
    });

    it("Should Allow anyone to View the Resources belonging to a specific Facility", (done) => {
        helper.get("/api/Facilities/1/resources", 200 , (res) => {
            res.body.should.be.an('array');
            done();
        });
    });

    it("Should Allow anyone to View the Utilities belonging to a specific Facility", (done) => {
        helper.get("/api/Facilities/1/utilities", 200 , (res) => {
            res.body.should.be.an('array');
            done();
        });
    });

    it("Should Allow anyone to View the Services belonging to a Specific Facility", (done) => {
        helper.get("/api/Facilities/1/services", 200 , (res) => {
            res.body.should.be.an('array');
            done();
        });
    });

});

