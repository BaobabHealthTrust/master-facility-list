"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');
const data = require('./data');

const user =  data.user;

const userData =  {
    username: "Mmalumbo",
    password: "malu",
    firstname: "Malumbo",
    lastname: "Mkandawire",
    email: "mmalumbo@gmail.com"
};


describe("Create Client", () => {

    it("Should Allow an Authorized Client to Create a New Client in the MFL",(done) => {
        helper.post("/api/Clients/login", user ,200 , (res) => {
            const url = "/api/Clients?access_token=" + res.body.id;
            helper.post(url,userData ,200 , (res) => {
                res.body.should.be.an('object');
                res.body.email.should.equal(userData.email);
                done();
            });
        });
    });

    // it("Should Display appropriate validation errors when invalid Client Details are provided by an Authenticated Client",(done) => {
    //     helper.post("/api/Clients/login", user ,200 , (res) => {
    //         const url = "/api/Clients?access_token=" + res.body.id;
    //         helper.post(url,{ ...userData, username: "Mmalumbo3", email: "mmalumbo" } ,422 , (res) => {
    //             res.body.error.name.should.equal('ValidationError');
    //             done();
    //         });
    //     });
    // });

    // it("Displays appropriate error message when an Unauthorized Client attempts to Create a New Client in the MFL", (done) => {
    //   helper.post("/api/Clients",{
    //     username: "Mmalumbo1",
    //     password: "malu",
    //     firstname: "Malumbo",
    //     lastname: "Mkandawire",
    //     email: "mmalumbo1@gmail.com"
    // },401 , (res) => {
    //     res.body.error.message.should.equal('Authorization Required');
    //     done();
    //   });
    // });

});
