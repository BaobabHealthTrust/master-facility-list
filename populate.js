"use strict";
const dependentModelFactory = require('./seeds/dependent-model-factory');
const independentModelFactory = require('./seeds/independent-model-factory');
const facilitySeeder = require('./seeds/facility-seeder');
const server = require("./server/server");
const dataSource = server.dataSources.db;
const fs = require('fs');
const csvtojson = require('csvtojson');
const _ = require('lodash');
const loadingSpinner = require('loading-spinner');
const moment = require('moment');

const getEntryId = async (model, key, value) => {
    let id;
    model.forEach(m => {
        if(m[key] == value){
            id = m['id'];
        }
    })
    return id;
}

const formatFacility = async (facility, requiredModels) => {
    const facilityTypeId = await getEntryId(requiredModels.facilityTypes, 'facility_type', facility['Facility Type']);
    const facilityOwner = await getEntryId(requiredModels.owners, 'facility_owner', facility['Controlling Agency']);
    const facilityOperationalStatus = await getEntryId(requiredModels.operationalStatuses, 'facility_operational_status', facility['Status']);
    const facilityRegulatoryStatus = await getEntryId(requiredModels.regulatoryStatuses, 'facility_regulatory_status', facility['Regulatory Status']);
    return {
        facility_name: facility['Facility Name'],
        facility_type_id: facilityTypeId,
        facility_owner_id: facilityOwner,
        facility_operational_status_id: facilityOperationalStatus,
        facility_regulatory_status_id: facilityRegulatoryStatus,
        client_id: 1,
        district_id: 1,
        published_date: moment().format('YYYY-MM-DD')
    }
}

const districtZoneMapping = async (facilites) => {
    const districtZoneOriginal = facilites.map(facility => ({
        zone: facility['Region'],
        district: facility['District']
    }))
    // const 
    return districtZoneOriginal;
}

const populate = async () => {
    try {
        const facilityData = await fs.readFileSync('health-facilities.csv', 'utf8');

        const facilities = _.uniqBy(
            await csvtojson().fromString(facilityData), 
            'Facility Name'
        ).filter(facility => facility['Facility Type'] != 'Village Clinic');

        const facilityTypes = _.uniq(facilities.map(facility => facility['Facility Type'])).map(facilityType => ({
            facility_type: facilityType
        }));
        console.log(facilities.length);
        const zones = _.uniq(facilities.map(facility => facility['Region'])).map(zone => ({
            zone_name: zone
        }));
        const owners = _.uniq(facilities.map(facility => facility['Controlling Agency'])).map(owner => ({
            facility_owner: owner
        }));
        const operationalStatuses = _.uniq(facilities.map(facility => facility['Status'])).map(operationalStatus => ({
            facility_operational_status: operationalStatus
        }));

        const regulatoryStatuses = _.uniq(facilities.map(facility => facility['Regulatory Status'])).map(regulatoryStatus => ({
            facility_regulatory_status: regulatoryStatus
        }));

        const facilitiesNameWithGeocodes = facilities.map(facility => ({
            facilityName: facility['Facility Name'],
            latitude: facility['Northings'],
            longitude: facility['Eastings']
        }));

        const facilitesNameWithContacts = facilities.map(facility => ({
            facilityName: facility['Facility Name'],
            name: facility['Name'],
            phone: facility['Phone'],
            email: facility['Email'] == 'N/A' ? null : facility['Email']
        }));
        await independentModelFactory(server.models.FacilityType, facilityTypes);
        await independentModelFactory(server.models.Zone, zones);
        await independentModelFactory(server.models.Owner, owners);
        await independentModelFactory(server.models.OperationalStatus, operationalStatuses);
        await independentModelFactory(server.models.RegulatoryStatus, regulatoryStatuses);

        loadingSpinner.start(100, {
            clearChar: true
        });

        const ft = await server.models.FacilityType.find();
        const on = await server.models.Owner.find();
        const op = await server.models.OperationalStatus.find();
        const rg = await server.models.RegulatoryStatus.find();

        const requiredModels = {
            facilityTypes: ft,
            owners: on,
            operationalStatuses: op,
            regulatoryStatuses: rg
        };

        await server.models.Facility.deleteAll();
        const formattedFacilities = facilities.map(async (facility) => await formatFacility(facility, requiredModels));
        const savedFacilities = await server.models.Facility.create((await Promise.all(formattedFacilities)));

        // map facilites and geolocation data
        const facilityGeocodeData = []
        await facilitiesNameWithGeocodes.forEach(facilityWithGeocodes => {
            savedFacilities.forEach(facility => {
                if (facilityWithGeocodes['facilityName'] == facility['facility_name']){
                    facilityGeocodeData.push({
                        facility_id: facility.id,
                        latitude: facilityWithGeocodes.latitude,
                        longitude: facilityWithGeocodes.longitude
                    })
                }
            })
        });
        await independentModelFactory(server.models.Geolocation, facilityGeocodeData);

        //map facilities and contact data
        const facilityContactData = []
        await facilitesNameWithContacts.forEach(facilityNameWithContact => {
          savedFacilities.forEach(facility => {
            if (facilityNameWithContact['facilityName'] == facility['facility_name'] && facilityNameWithContact['Name']) {
              facilityContactData.push({
                facility_id: facility.id,
                contact_person_fullname: facilityNameWithContact.name,
                contact_person_phone: facilityNameWithContact.phone,
                contact_person_email: facilityNameWithContact.email
              })
            }
          })
        });
        console.log(facilityContactData);
        await independentModelFactory(server.models.ContactPeople, facilityContactData);
        loadingSpinner.stop();
        await dataSource.disconnect();
    } catch (error) {
        console.log(error);
    }
}
populate();
