"use strict";

const server = require("../server/server");
const request = require("supertest")(server);

const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;

const data = require("../seeds/data");

module.exports.get = (endPoint,statusCode, callback) => {
    request
        .get(endPoint)
        .set("Accept", "application/json")
        .expect(statusCode)
        .then(callback)
        .catch(err => console.error(err));
}

module.exports.post = (endPoint, data,statusCode, callback) => {
    request
        .post(endPoint)
        .send(data)
        .set("Accept", "application/json")
        .expect(statusCode)
        .then(callback)
        .catch(err => console.error(err));
}

module.exports.createAdmin = async (users) => {
    try {
        const userIDs = await User.create(data.users).map(user => user.id);
        const role = await Role.create({ name: 'admin' });
        const userRoleMapping = userIDs.map(userID => {
            return {
                principalType: RoleMapping.USER,
                principalId: userID
            }
        });
        await role.principals.create(userRoleMapping);
    } catch (err) {
        console.error(err);
    }
}
