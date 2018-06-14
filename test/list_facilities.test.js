"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require("./helper");
const data = require("../seeds/data");

describe("List Facilities", () => {
    it("Should allow anyone to View a List of Published Facilities", (done) => {
        helper.get("/api/Facilities", 200 , (res) => {
            res.body.should.be.an('array');
            done();
        });
    });
});