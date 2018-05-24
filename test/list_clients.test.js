"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');
const data = require('../seeds/data');

const user =  {
    password: data.users[0].password,
    email: data.users[0].email
}


describe("List Clients", () => {

    it("Should Allow an Authorized Client to view a list of Clients from the MFL",(done) => {
        helper.post("/api/Clients/login", user ,200 , (res) => {
            const url = "/api/Clients?access_token=" + res.body.id;
            helper.get(url,200 ,(res) => {
                res.body.should.be.an('array');
                res.body[0].email.should.equal(user.email);
                done();
            });
        });
    });

    it("Should Display appropriate error message when an Unauthorized Client attempts to view a list of Clients",(done) => {
        helper.get("/api/Clients", 401, (res) => {
            res.body.error.message.should.equal('Authorization Required');
            done();
        });
    });

});
