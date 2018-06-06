"use strict";


const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');
const data = require('./data');


const user =  data.user;

describe("Edit Client Test", () => {

  it("Should Allow an Authorized Administrator Client to Edit their Own details in the MFL", (done) => {
    done();
  });


  it("Should Display appropriate error message when Administrator attempts to Edit Another Administrator’s Details", (done) => {
    done();
  });


  it("Should Display appropriate error message when Unauthorized Client tries to Edit an Administrator’s Details", (done) => {
    done();
  });


  it("Should Display appropriate validation errors when Administrator provides Wrong Details", (done) => {
    done();
  });

});
