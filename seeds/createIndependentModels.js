"use strict";
const dependentFactory = require('./dependentModelFactory');
const data = require('./data');
const factory = require('./independentModelFactory');
const server = require("../server/server");
const dataSource = server.dataSources.db;

const serviceModelSeeder = require('./serviceModelSeeder');

const createIndependentModels = async () => {
    // await factory(server.models.Owner, data.owners);
    // await factory(server.models.FacilityType, data.facilityTypes);
    // await factory(server.models.RegulatoryStatus, data.regulatoryStatuses);
    // await factory(server.models.OperationalStatus, data.operationalStatuses);
    // await factory(server.models.Zone, data.zoneData);
    // await factory(server.models.Client, data.users);
    // await factory(server.models.Role, data.roles);
    // await factory(server.models.ResourceType, data.resourceTypes);
    // await factory(server.models.UtilityType, data.utilityTypes);
    //await factory(server.models.ServiceType, data.serviceTypes);
    // await dependentFactory(server.models.Zone, server.models.District, data.districts);

    // await dependentFactory(server.models.ResourceType , server.models.Resource, data.resources);
    // await dependentFactory(server.models.UtilityType , server.models.Utility, data.utilities);
    // await dependentFactory(server.models.ServiceType , server.models.Service, data.services);
    //await dependentFactory(server.models.ServiceType, server.models.Service, data.services);
    const services = await serviceModelSeeder(server.models.ServiceType, server.models.Service, data.services)
    console.log('Logging created l2 services');
    console.log(JSON.stringify(services, undefined, 2));

    await dataSource.disconnect();
}

createIndependentModels();
