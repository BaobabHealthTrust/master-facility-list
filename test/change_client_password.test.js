"use strict";


const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');
const data = require('./data');


const user =  data.user;

describe("Change Client PasswordT est", () => {

  it("Should Allows an Authorized Administrator to change their own Password", (done) => {
    done();
  });


  it("Should Allows an Authorized Administrator to change another Administrator’s Password", (done) => {
    done();
  });


  it("Should Displays appropriate error message when Unauthorized Client attempts to change another Administrator’s Password", (done) => {
    done();
  });


});
