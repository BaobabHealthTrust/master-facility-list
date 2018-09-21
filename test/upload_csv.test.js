'use strict';

const mocha = require('mocha');
const assert = require('assert');
const populate = require('../populate');
const app = require("../server/server");
const { Facility } = app.models;
const dataSource = app.dataSources.db;

describe('CSV Upload', () => {

    it('should populate facilities accurately', async () => {
        const csv = [
            {
                'District': 'Chitipa',
                'District Code': 'CP',
                'Facility Code': 101,
                'Reg No.': 'MCM/C/224',
                'Facility Name': 'Bwaila',
                'Facility Type': 'Dispensary',
                'Facility Ownership': 'NGO',
                'Facility Location': 'Urban',
                'Facility Catchment Population (2018)': 23350,
                'latitude': -9.94361,
                'longitude': 33.39795
            },
            {
                'District': 'Nkhata Bay',
                'District Code': 'NB',
                'Facility Code': 326,
                'Reg No': { '': '' },
                'Facility Name': 'Cumnock Private Clinic',
                'Facility Type': 'Dispensary',
                'Facility Ownership': 'Private for profit',
                'Facility Location': 'Rural',
                'Catchment Population (2018)': 78,
                'latitude': -11.52705,
                'longitude': 34.08482,
            }

        ]
        await populate(csv);

        const facility = (await Facility.findOne({
            where: { facility_name: 'Bwaila' },
            include: ['district', 'facilityType', 'owner', 'geolocations']
        })).toJSON();
        const facilities = await Facility.find();
        
        await assert.equal(facility.district.district_name, 'Chitipa')
        await assert.equal(facility.district.district_code, 'CP')
        await assert.equal(facility.facilityType.facility_type, 'Dispensary')
        await assert.equal(facility.facility_name, 'Bwaila')
        await assert.equal(facility.owner.facility_owner, 'NGO')
        await assert.equal(facility.geolocations.latitude, -9.94361)
        await assert.equal(facility.geolocations.longitude, 33.39795)
        
        await assert.equal(2, facilities.length);
        
        await dataSource.disconnect();
    });
});