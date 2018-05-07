"use strict";
const dependentModelFactory = require('./dependentModelFactory');
const data = require('./data');
const independentModelFactory = require('./independentModelFactory');
const facilitySeeder = require('./facility-seeder');
const facilityDependents = require('./facilityDependents');
const server = require("../server/server");
const dataSource = server.dataSources.db;

const serviceModelSeeder = require('./serviceModelSeeder');

const seed = async () => {
    try {
        const facilityCount = process.argv[2];
        if (!facilityCount) {
            console.error('Please specify the number of facilities to be generated');
            process.exit(1);
        }
        await independentModelFactory(server.models.Owner, data.owners);
        await independentModelFactory(server.models.FacilityType, data.facilityTypes);
        await independentModelFactory(server.models.RegulatoryStatus, data.regulatoryStatuses);
        await independentModelFactory(server.models.OperationalStatus, data.operationalStatuses);
        await independentModelFactory(server.models.Zone, data.zoneData);
        await independentModelFactory(server.models.Client, data.users);
        await independentModelFactory(server.models.Role, data.roles);
        await independentModelFactory(server.models.ResourceType, data.resourceTypes);
        await independentModelFactory(server.models.UtilityType, data.utilityTypes);
        await independentModelFactory(server.models.ServiceType, data.serviceTypes);
        await dependentModelFactory(server.models.Zone, server.models.District, data.districts);

        await dependentModelFactory(server.models.ResourceType, server.models.Resource, data.resources);
        await dependentModelFactory(server.models.UtilityType, server.models.Utility, data.utilities);
        await dependentModelFactory(server.models.ServiceType, server.models.Service, data.services);
        await dependentModelFactory(server.models.ServiceType, server.models.Service, data.services);
        await serviceModelSeeder(server.models.ServiceType, server.models.Service, data.services);
        const facilities = await facilitySeeder(facilityCount);
        await facilityDependents();
        await dataSource.disconnect();
    } catch (error) {
        console.log(error);
    }
}
seed();
