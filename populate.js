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
const argv = require('yargs').argv


//TODO: implement the factory pattern on this
const getEntityId = async (entities, key, value) => {
    return faker.random.arrayElement(entities.map(entity => entity.id));
}

const getFacilityTypeId = async (facilityTypes, facilityTypeName) => {
    if (facilityTypeName) {
        const facilityType = facilityTypes.filter(facilityType => facilityType.facility_type == facilityTypeName)[0];
        if (facilityType) {
            return facilityType.id;
        }
    }
    return faker.random.arrayElement(facilityTypes.map(facilityType => facilityType.id));
}

const getFacilityOwnerId = async (facilityOwners, facilityOwnerName) => {
    if(facilityOwnerName){
        const facilityOwner = facilityOwners.filter(facilityOwner => facilityOwner.facility_owner == facilityOwnerName)[0];
        if(facilityOwner){
            return facilityOwner.id;
        }
    }
    return faker.random.arrayElement(facilityOwners.map(facilityOwner => facilityOwner.id));
}

const getDistrictId = async (districts, districtName) => {
    if(districtName){
        const district = districts.filter(district => district.district_name == districtName)[0];
        if(district){
            return district.id;
        }
    }
    return faker.random.arrayElement(districts.map(district => district.id));
}

const formatFacility = async (facility, requiredModels) => {
    const facilityTypeId = await getFacilityTypeId(requiredModels.facilityTypes, facility['Facility Type']);
    const facilityOwnerId = await getFacilityOwnerId(requiredModels.owners, facility['Facility Ownership']);
    const districtId = await getDistrictId(requiredModels.districts, facility['District']);

    const regulatoryStatusId = await getEntityId(requiredModels.regulatoryStatuses, null, null);
    const operationalStatusId = await getEntityId(requiredModels.operationalStatuses, null, null);
    return {
        facility_name: facility['Facility Name'] ? facility['Facility Name'] : faker.name.findName(),
        facility_type_id: facilityTypeId,
        facility_owner_id: facilityOwnerId,
        common_name: faker.company.companyName(),
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

const mapDistrictsToZones = async () => {
    const organisationUnits = (JSON.parse(await fs.readFileSync('dhis2-organisation-units.json', 'utf8')))
        .organisationUnits
        .filter(organisationUnit => organisationUnit.name != 'Central Hospital');
    await server.models.Zone.deleteAll();
    const zones = await server.models.Zone.create(organisationUnits.map(organisationUnit => ({
      zone_name: organisationUnit.name
    })));
    const mhfrDistricts = await server.models.District.find();
    const dhis2DistrictsPlusZones = _.uniqBy(_.flatten(organisationUnits.map(organisationUnit => {
      return organisationUnit.children.map(child => {
        const districtNameSegemented = child.name.split('-')
        const districtName = districtNameSegemented.length > 1 ? districtNameSegemented.slice(0, -1).join(' ') : districtNameSegemented[0];
        return {
            district_name: districtName,
            zone_name: organisationUnit.name
        };
      })
    })), 'district_name');

    const mhfrDistrictsWithZoneIds = _.flatten(mhfrDistricts.map(mhfrDistrict => {
        return dhis2DistrictsPlusZones.map(dhi2DistrictPlusZone => {
            if (dhi2DistrictPlusZone.district_name == mhfrDistrict.district_name) {
                return {
                    id: mhfrDistrict.id,
                    zone_id: zones.filter(zone => zone.zone_name == dhi2DistrictPlusZone.zone_name)[0].id
                }
            }
        })
    })).filter(mhfrDistrictWithZoneId => mhfrDistrictWithZoneId);

    const districtZoneMapping = data.districtZoneMapping;
    const districtCodes = _.flatten((Object.keys(districtZoneMapping)).map(key => {
        return districtZoneMapping[key];
    }));

    for(const mhfrDistrictWithZoneId of mhfrDistrictsWithZoneIds){
        const district = await server.models.District.findOne({ where: { id: mhfrDistrictWithZoneId.id } });
        const districtCode = districtCodes
            .filter(districtCode => 
                _.trim(_.lowerCase(district.district_name)) == _.trim(_.lowerCase(districtCode.district_name))
            )[0].district_code || '';
        if(district){
            await district.updateAttributes({
                zone_id: mhfrDistrictWithZoneId.zone_id,
                district_code: districtCode
            });
            await district.save();
        }
    }
    await console.log('Mapped Districts to Zones successfully');
}

const loadFromFile = async() => {
    const facilityData = await fs.readFileSync('health-facilities.csv', 'utf8');
    const facilities = _.uniqBy(
      await csvtojson().fromString(facilityData),
      'Facility Name'
    ).filter(facility => (facility['Facility Name'] && facility['Facility Type'] != 'Village Clinic'));  
    return facilities;
}

const populate = async (facilities) => {
    try {

        await loadingSpinner.start(100, {
            clearChar: true
        });

        const uniqueFacilities = await facilities;
        
        const facilitiesNameWithGeocodes = uniqueFacilities.map(facility => ({
            facilityName: facility['Facility Name'],
            latitude: facility['latitude'] ? facility['latitude'] :  faker.address.longitude(),
            longitude: facility['longitude'] ? facility['longitude'] : faker.address.latitude()
        }));

        // process.exit(0);
        
        await populateIndependentModels(uniqueFacilities);

        await mapDistrictsToZones();

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
        const formattedFacilities = uniqueFacilities.map(async (facility) => await formatFacility(facility, requiredModels));
        await console.log('Populating facilities');
        const savedFacilities = await server.models.Facility.create((await Promise.all(formattedFacilities)));
        await console.log('Facilities populated');
        await console.log('Populating facility dependants');
        await facilityDependantsMapper();
        await console.log('Populating facility geodata');
        const facilityGeocodeDataRaw = await facilitiesNameWithGeocodes.map(facilityWithGeocodes => {
            return savedFacilities.map(facility => {
                if (facilityWithGeocodes['facilityName'] == facility['facility_name']) {
                    const { latitude, longitude } = facilityWithGeocodes;
                    return {
                        facility_id: facility.id,
                        latitude,
                        longitude
                    }
                }
            })
        });
        const facilityGeocodeData = _.flatten(facilityGeocodeDataRaw).filter(fgd => fgd);
        await independentModelFactory(server.models.Geolocation, facilityGeocodeData);
        await console.log('Facility geodata loaded');
        await console.log('Done populating the MFHR');
        await dataSource.disconnect();
        await loadingSpinner.stop();
    } catch (error) {
        console.log(error);
    }
}

module.exports = populate

if (process.env.NODE_ENV != 'testing') { 
    populate(loadFromFile());
}
