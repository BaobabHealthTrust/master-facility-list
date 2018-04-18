"use strict";

const data = require('./data')
const factory = require('./independentModelFactory');
const server = require("../server/server");
const dataSource = server.dataSources.db;

const createIndependentModels = async () => {
    await factory(server.models.Owner, data.owners);
    await factory(server.models.FacilityType, data.facilityTypes);
    await factory(server.models.RegulatoryStatus, data.regulatoryStatuses);
    await factory(server.models.OperationalStatus, data.operationalStatuses);
    await factory(server.models.Zone, data.zoneData);
    await factory(server.models.Client, data.users);
    await factory(server.models.Role, data.roles);
    await dataSource.disconnect();
}

createIndependentModels();
