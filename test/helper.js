"use strict";

const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;

/** Models objects */
const {
    Role,
    RoleMapping,
    Client
} = server.models;

const data = require("./data");

/**
 * Create admin user
 * @param {Object} user User object.
 */
module.exports.createAdmin = async (client) => {
    try {
        const user = await Client.create(client);

        const role = await Role.create({
          name: 'admin'
        });

        const roleMapping = {
          principalType: RoleMapping.USER,
          principalId: user.id
        };

        await role.principals.create(roleMapping);
    } catch (error) {
        console.error(error);
    }
};


module.exports.create = (data = null, model = null) => model.create(data);
module.exports.post = async function (endPoint, data, statusCode, callback) {
    await request
        .post(endPoint)
        .send(data)
        .set("Accept", "application/json")
        .expect(statusCode)
        .then(callback)
        .catch(err => console.error(err));
};

/**
 * Perform a get request.
 * @param {string} endPoint - End point URL.
 * @param {number} statusCode - Status code.
 * @param {Function} callback - Callback function.
 */
module.exports.get = (endPoint, statusCode, callback) => { request.get(endPoint).set("Accept", "application/json").expect(statusCode).then(callback).catch(err => console.error(err));}

module.exports.put = (endPoint, data, statusCode, callback) => request
    .patch(endPoint)
    .send(data)
    .set("Accept", "application/json")
    .expect(statusCode)
    .then(callback)
    .catch(err => console.error(err));
