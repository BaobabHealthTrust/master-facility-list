const server = require("../../server/server");

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

    // TODO: remote hook to only get null users

    Client.createAdmin = async (data, cb) => {
        const client = await server.models.Client.create(data);
        const role = (await server.models.Role.find({where: {name: 'admin'}}))[0];
        const roleMap = {
            principalType: server.models.RoleMapping.USER,
            principalId: client.id
        };
        const map = await role.principals.create(roleMap);
        return map;
    }

    Client.remoteMethod('createAdmin', {
        accepts: [
            { arg: 'data', type: 'object' }
        ],
        returns: { arg: 'response', type: 'object' },
        http: { verb: 'post' }
    })


};
