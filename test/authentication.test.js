"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;
const data = require("./data");
const helper = require('./helper');

describe("Login Test", function() {

    before(async () => await helper.createAdmin(data.user));
    after(done => dataSource.automigrate(err => done(err)));

    it("Should allow an administrator client to login successfully", function(done) {
        const callback = function(res) {
            should.exist(res.body.id);
            done();
        }
        helper.post('/api/Clients/login', data.user, 200, callback);
    });

    it("Should display appropriate error message to unauthenticated login", function(done) {
        const user = {
            password: 'malawi',
            email: "google@gmail.com",
        };

        const callback = function(res) {
            res.body.error.message.should.equal('login failed');
            done();
        }

        helper.post('/api/Clients/login', user, 401, callback);
    });

});
