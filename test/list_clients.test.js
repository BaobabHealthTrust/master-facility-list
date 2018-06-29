"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;
const data = require("./data");
const helper = require('./helper');
const user =  data.user;

describe("List Clients", function() {

    before(async () => await helper.createAdmin(data.user));
    after(done => dataSource.automigrate(err => done(err)));

    it("Should Allow an Authorized Client to view a list of Clients from the MFL", function(done) {
      helper.post("/api/Clients/login", user ,200 , function(res) {
          const url = `/api/Clients?access_token=`+res.body.id;
          helper.get(url, 200, function(res) {
            res.body.should.be.an('array');
            done();
        });
      });
    });
});
