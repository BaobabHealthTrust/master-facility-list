"use strict";


const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);
const helper = require('./helper');


helper.createAdmin();

describe("Login Test", () => {

    it("Should allow an administrator client to login successfully",(done) => {
        const user =  {
            password: "haxy",
            email: "haroon@gmail.com"
        };

        const url = "/api/Clients/login";

        const callback = (res) => {
            should.exist(res.body.id);
            done();
        }

        helper.post(url, user, 200, callback);
    });

    // it(
    //     "Should display appropriate error message to unauthenticated to login",
    //     (done) => {
    //         const user = {
    //             password: 'malawi',
    //             email: "haroon@gmail.com",
    //         };

    //         const url = "/api/Clients/login";

    //         const callback = (res) => {
    //             res.body.error.message.should.equal('login failed');
    //             done();
    //         }

    //         helper.post(url, user, 401 ,callback);
    //     }
    // );

});
