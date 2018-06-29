"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const Client = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;
const dataSource = server.dataSources.db;
const data = require("./data");
const helper = require('./helper');

const userData = {
    username: "mfladminuser",
    password: "admin",
    firstname: "CMED",
    lastname: "Malawi",
    email: "administrator@gmail.com"
};

describe("Create Client", () => {

    before(async () => await helper.createAdmin(data.user));
    after(done => dataSource.automigrate(err => done(err)));

    it("Should Allow an Authorized Client to Create a New Client in the MFL",(done) => {
        helper.post("/api/Clients/login", data.user, 200, (res) => {
            const url = "/api/Clients/createAdmin?access_token=" + res.body.id;
            request
              .post(url)
              .send(userData)
              .set("Accept", "application/json")
              .set("Authorization", res.body.id)
              .expect(200)
              .then((res) => {
                  console.log(url);
                  done();
              })
              .catch(err => console.error(err));
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
