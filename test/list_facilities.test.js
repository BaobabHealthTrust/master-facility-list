"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Client = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;
const District = server.models.District;
const Facility = server.models.Facility;
const dataSource = server.dataSources.db;

const data = require("./data");
const helper = require('./helper');
const facility = data.facility;

describe("List Facilities", function() {

    it("Should allow anyone to View a List of Published Facilities", function(done) {
        done();
    });

});
