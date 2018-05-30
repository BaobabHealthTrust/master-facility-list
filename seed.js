"use strict";


const dependentModelFactory = require('./seeds/dependent-model-factory');
const data = require('./seeds/data');
const independentModelFactory = require('./seeds/independent-model-factory');
const facilitySeeder = require('./seeds/facility-seeder');
const facilityDependantsMapper = require('./seeds/facility-dependants-mapper');
const facilityResourcesUtilitiesServicesMapper = require('./seeds/facility-resources-utilities-services-mapper');
const server = require("./server/server");
const dataSource = server.dataSources.db;
const userSeeder = require("./seeds/seed-user");
const serviceModelSeeder = require('./seeds/service-model-seeder');


const seed = async () => {
    try {

        const facilityCount = process.argv[2];

        if (!facilityCount) {
            console.error(' Please specify the number of facilities to be generated');
            process.exit(1);
        }

        await userSeeder(data.users);
        await independentModelFactory(server.models.Owner, data.owners);
        await independentModelFactory(server.models.FacilityType, data.facilityTypes);
        await independentModelFactory(server.models.RegulatoryStatus, data.regulatoryStatuses);
        await independentModelFactory(server.models.OperationalStatus, data.operationalStatuses);
        await independentModelFactory(server.models.Zone, data.zoneData);
        await independentModelFactory(server.models.ResourceType, data.resourceTypes);
        await independentModelFactory(server.models.UtilityType, data.utilityTypes);
        await independentModelFactory(server.models.ServiceType, data.serviceTypes);
        await dependentModelFactory(server.models.Zone, server.models.District, data.districts);

        await dependentModelFactory(server.models.ResourceType, server.models.Resource, data.resources);
        await dependentModelFactory(server.models.UtilityType, server.models.Utility, data.utilities);
        await dependentModelFactory(server.models.ServiceType, server.models.Service, data.services);
        await dependentModelFactory(server.models.ServiceType, server.models.Service, data.services);
        await serviceModelSeeder(server.models.ServiceType, server.models.Service, data.services);
        await facilitySeeder(facilityCount);
        await console.log(`Created ${facilityCount} facilities`);
        await facilityDependantsMapper();
        await console.log(`Created facilities dependants`);
        await facilityResourcesUtilitiesServicesMapper();
        await console.log('seeding done');
        await dataSource.disconnect();
    } catch (error) {
        console.log(error);
    }
}
seed();