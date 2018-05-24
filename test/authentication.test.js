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

helper.createAdmin();

describe("Login Test", () => {

    it("Should allow an administrator client to login successfully",(done) => {
        helper.post("/api/Clients/login", user ,200 , (res) => {
            should.exist(res.body.id);
            done();
        });
    });

    it("Should displays appropriate error message to unauthenticated to login",(done) => {
        helper.post(
            "/api/Clients/login",{
                password: data.users[0].password,
                email: data.users[0].email + "ma",
            } , 401 , (res) => {
                res.body.error.message.should.equal('login failed');
                done();
            });
    });

});
