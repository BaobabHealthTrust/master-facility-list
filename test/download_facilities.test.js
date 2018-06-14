"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require("./helper");
const data = require("../seeds/data");

describe("Download Facilities Test", () => {

    it("Should allow anyone to download a copy of facilities matching a user defined query in a user defined file format", (done) => {
        //will be done in next Sprint
        done();
    });

    it("Should Allow anyone to download details of a user specified facility in PDF Format", (done) => {
      //will be done in next Sprint
      done();
    });

});
