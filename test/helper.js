"use strict";

const server = require("../server/server");
const request = require("supertest")(server);
const dataSource = server.dataSources.db;

const {
    Role,
    RoleMapping,
    FacilityType,
    OperationalStatus,
    RegulatoryStatus,
    Owner,
    District,
    Client,
    Resource,
    Facility
} = server.models;

const data = require("./data");



/**
 * Truncate all the tables
 */
module.exports.truncate = async function() {
    const ds = Facility.dataSource;
    var sql = "SELECT * Facility";
    ds.Connector.execute(sql);
};
