"use strict";

const data = require('./data')
const server = require("../server/server");
const dataSource = server.dataSources.db;

module.exports = async (Model, data) => {
    try {
        await Model.deleteAll();
        await Model.create(data);
        await console.log(`Created ${Model.definition.name} Successfully...`);
    } catch (err) {
        console.error(err)
    }
}
