"use strict";


const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');
const data = require('./data');


const user =  data.user;

describe("List Clients", () => {


  it("Should Allow an Authorized Client to view a list of Clients from the MFL", (done) => {
    helper.post("/api/Clients/login", user ,200 , (res) => {
        const url = `/api/Clients?access_token=`+res.body.id;
        helper.get(url, 200 , (res) => {
          res.body.should.be.an('array');
          done();
      });
    });
  });

});
