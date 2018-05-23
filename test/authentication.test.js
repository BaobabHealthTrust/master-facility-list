"use strict";

const should = require("chai").should();
const helper = require('./helper');


helper.createAdmin();

const user =  {
    password: "haxy",
    email: "haroon@gmail.com"
}

const fakeUser = {
  password: "haxizo",
  email: "haroon@gmail.com"
}


describe("Login Test", () => {

    it("Should allow an administrator client to login successfully",(done) => {
        helper.post("/api/Clients/login", user ,200 , (res) => {
            should.exist(res.body.id);
        });
        done();
    });

    // it("Should displays appropriate error message to unauthenticated to login",(done) => {
    //     helper.post("/api/Clients/login", fakeUser , 401 , (res) => {
    //         res.body.error.message.should.equal("login failed");
    //     });
    //     done();
    // });

});
