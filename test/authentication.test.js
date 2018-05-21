"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');


helper.createAdmin();

describe("Login Test", () => {

    it("Should allow an administrator client to login successfully",(done) => {
        request
            .post("/api/Clients/login")
            .send({
                password: "malu123",
                email: "mmalumbo@gmail.com"
            })
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
                should.exist(res.body.id);
                done();
            })
            .catch(err => console.error(err));
    });

    // it("Should displays appropriate error message to unauthenticated to login",(done) => {
    //     request
    //         .post("/api/Clients/login")
    //         .send({
    //             password: "malu4",
    //             email: "mmalumbo@gmail.com"
    //         })
    //         .set("Accept", "application/json")
    //         .expect(401)
    //         .then((res) => {
    //             console.log(res.body);
    //             done();
    //         })
    //         .catch(err => console.error(err));
    // });

});




