"use strict";

const data = require('./data')
const server = require("../server/server");
const dataSource = server.dataSources.db;
const FacilityType = server.models.FacilityType;

const createOwners = async () => {
    try {
        await Owner.deleteAll();
        await Owner.create(data.owners);
        await console.log('Created Owners Successfully...');
    } catch (err) {
        console.log('Sorry, something happened! 🙈🙈🙈')
    } finally {
        await dataSource.disconnect();
    }
}

createOwners();
