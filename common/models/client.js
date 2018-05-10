"use strict";

module.exports = function(Client) {
    Client.validatesLengthOf("username", {
        min: 8,
        message: { min: "Username is too short" }
    });
    Client.validatesLengthOf("password", {
        min: 5,
        message: { min: "Password is too short" }
    });
};
