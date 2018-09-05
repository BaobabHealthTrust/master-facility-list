"use strict";
const dependentModelFactory = require('./seeds/dependent-model-factory');
const independentModelFactory = require('./seeds/independent-model-factory');
const facilitySeeder = require('./seeds/facility-seeder');
const userSeeder = require("./seeds/seed-user");
const facilityDependantsMapper = require('./seeds/facility-dependants-mapper');
const serviceModelSeeder = require('./seeds/service-model-seeder');
const facilityResourcesUtilitiesServicesMapper = require('./seeds/facility-resources-utilities-services-mapper');
const server = require("./server/server");
const data = require('./seeds/data');
const faker = require('faker');
const dataSource = server.dataSources.db;
const fs = require('fs');
const csvtojson = require('csvtojson');
const _ = require('lodash');
const loadingSpinner = require('loading-spinner');
const moment = require('moment');

const getEntityId = async (entities, key, value) => {
    if(key && value){
        entities.forEach(entity => {
            if (entity[key] == value) {
                return entity['id'];
            }
        })
    }
    const ids = entities.map(entity => entity['id']);
    return faker.random.arrayElement(ids);
}

const formatFacility = async (facility, requiredModels) => {
    const facilityTypeId = await getEntityId(requiredModels.facilityTypes, 'facility_type', facility['Facility Type']);
    const facilityOwnerId = await getEntityId(requiredModels.owners, 'facility_owner', facility['Facility Ownership']);
    const districtId = await getEntityId(requiredModels.districts, 'district_name', facility['District']);
    const regulatoryStatusId = await getEntityId(requiredModels.regulatoryStatuses, null, null);
    const operationalStatusId = await getEntityId(requiredModels.operationalStatuses, null, null);
    return {
        facility_name: facility['Facility Name'] ? facility['Facility Name'] : faker.name.findName(),
        facility_type_id: facilityTypeId,
        facility_owner_id: facilityOwnerId,
        common_name: faker.company.companyName(),
        facility_code: facility['Facility Code'] ? facility['Facility Code'] : faker.random.number({min: 1000, max: 10000}),
        client_id: faker.random.arrayElement(requiredModels.clientIds),
        facility_operational_status_id: operationalStatusId,
        facility_regulatory_status_id: regulatoryStatusId,
        district_id: districtId,
        date_opened: moment().format('YYYY-MM-DD'),
        published_date: moment().format('YYYY-MM-DD')
    }
}

const populateIndependentModels = async(facilities) => {
    const facilityTypes = _.uniq(facilities.map(facility => facility['Facility Type'])).map(facilityType => ({
        facility_type: facilityType ? facilityType : faker.lorem.word()
    }));
    const owners = _.uniq(facilities.map(facility => facility['Facility Ownership'])).map(owner => ({
        facility_owner: owner ? owner : faker.company.companyName()
    }));

    const districts = _.uniq(facilities.map(facility => facility['District'])).map(district => ({
        district_name: district ? district : faker.address.state(),
        zone_id: 1
    }));

    await independentModelFactory(server.models.FacilityType, facilityTypes);
    await independentModelFactory(server.models.Owner, owners);
    await independentModelFactory(server.models.District, districts);
    await independentModelFactory(server.models.RegulatoryStatus, data.regulatoryStatuses);
    await independentModelFactory(server.models.OperationalStatus, data.operationalStatuses);
    await independentModelFactory(server.models.ResourceType, data.resourceTypes);
    await independentModelFactory(server.models.UtilityType, data.utilityTypes);
    await independentModelFactory(server.models.ServiceType, data.serviceTypes);   
}

const populate = async () => {
    try {

        loadingSpinner.start(100, {
            clearChar: true
        });

        const facilityData = await fs.readFileSync('health-facilities.csv', 'utf8');

        const facilities = _.uniqBy(
            await csvtojson().fromString(facilityData), 
            'Facility Name'
        ).filter(facility => (facility['Facility Name'] && facility['Facility Type'] != 'Village Clinic'));

        const facilitiesNameWithGeocodes = facilities.map(facility => ({
            facilityName: facility['Facility Name'],
            latitude: facility['latitude'] ? facility['latitude'] : faker.address.longitude(),
            longitude: facility['longitude'] ? facility['longitude'] : faker.address.latitude()
        }));

        await populateIndependentModels(facilities);
        await userSeeder(data.users);

        const requiredModels = {
            facilityTypes: await server.models.FacilityType.find(),
            owners: await server.models.Owner.find(),
            districts: await server.models.District.find(),
            operationalStatuses: await server.models.OperationalStatus.find(),
            regulatoryStatuses: await server.models.RegulatoryStatus.find(),
            clientIds: (await server.models.Client.find()).map(client => client['id'])
        };

        await server.models.Facility.deleteAll();
        const formattedFacilities = facilities.map(async (facility) => await formatFacility(facility, requiredModels));
        console.log('Populating facilities');
        const savedFacilities = await server.models.Facility.create((await Promise.all(formattedFacilities)));
        console.log('Facilities populated');
        console.log('Populating facility dependants');
        await facilityDependantsMapper();
        // map facilites and geolocation data
        console.log('Populating facility geodata');
        const facilityGeocodeData = []
        await facilitiesNameWithGeocodes.forEach(facilityWithGeocodes => {
            savedFacilities.forEach(facility => {
                if (facilityWithGeocodes['facilityName'] == facility['facility_name']){
                    const {latitude, longitude} = facilityWithGeocodes;
                    facilityGeocodeData.push({
                        facility_id: facility.id,
                        latitude,
                        longitude
                    })
                }
            })
        });
        await independentModelFactory(server.models.Geolocation, facilityGeocodeData);
        await console.log('Facility geodata loaded');
        await console.log('Loading services, utilities and resources');
        await dependentModelFactory(server.models.ResourceType, server.models.Resource, data.resources);
        await dependentModelFactory(server.models.UtilityType, server.models.Utility, data.utilities);
        await dependentModelFactory(server.models.ServiceType, server.models.Service, data.services);
        await serviceModelSeeder(server.models.ServiceType, server.models.Service, data.services);
        await facilityResourcesUtilitiesServicesMapper();
        await console.log('Done populating the MFHR')
        await dataSource.disconnect();
        loadingSpinner.stop();
    } catch (error) {
        console.log(error);
    }
}
populate();
