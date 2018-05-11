'use strict'
const getIds = require('./seed-helpers').getIds;
const server = require("../server/server");
const _ = require('lodash');
const faker = require('faker');
const {
    Facility,
    Resource,
    FacilityResource,
    FacilityUtility,
    FacilityService,
    Service,
    Utility
} = server.models;


module.exports = async () => {

    const sampleSize = 15;

    const facilityResources = [];
    const facilityUtilities = [];
    const facilityServices = [];
    const facilityIds = await getIds(Facility);

    //freshen up
    await FacilityResource.deleteAll();
    await FacilityService.deleteAll();
    await FacilityUtility.deleteAll();

    const utilityIds = await getIds(Utility);
    const resourceIds = await getIds(Resource);
    const serviceIds = await getIds(Service);

    facilityIds.forEach(async facilityId => {
        
        const randomUtilities = _.sampleSize(utilityIds, sampleSize);
        const randomResources = _.sampleSize(resourceIds, sampleSize);
        const randomServices = _.sampleSize(serviceIds, sampleSize);

        for(let counter = 0; counter < sampleSize; counter++){
            const facilityResource = {
                facility_id: facilityId,
                resource_id: randomResources[counter],
                quantity: faker.random.number({
                    min: 1,
                    max: 10
                }),
                description: 'description'
            };
            facilityResources.push(facilityResource);

            const facilityUtility = {
                facility_id: facilityId,
                utility_id: randomUtilities[counter]
            };
            facilityUtilities.push(facilityUtility);

            const facilityService = {
                facility_id: facilityId,
                service_id: randomServices[counter]
            };
            facilityServices.push(facilityService);
        }
    });

    await FacilityResource.create(facilityResources);
    await FacilityUtility.create(facilityUtilities);
    await FacilityService.create(facilityServices);
}
