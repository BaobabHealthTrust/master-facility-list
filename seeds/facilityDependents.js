'use strict'

const server = require('../server/server');
const faker = require('faker');
const dataSource = server.dataSources.db;

const {
    Facility,
    Address,
    Location,
    Geolocation,
    ContactPeople
} = server.models;

const getIds = async (Model) => {
    return await Model.find({ fields: { id: true } }).map(model => model.id);
}

module.exports = async () => {
    const facilityIds = await getIds(Facility);

    await ContactPeople.deleteAll();
    await Address.deleteAll();
    await Location.deleteAll();
    await Geolocation.deleteAll();

    const contactPeople = [];
    const addresses = [];
    const locations = [];
    const geoLocations = [];

    facilityIds.forEach( id => {

        const address = `
            ${faker.company.companyName()} \n
            ${faker.address.secondaryAddress()} \n
            ${faker.address.streetName()} \n
        `;

        contactPeople.push({
            contact_person_fullname: faker.name.findName(),
            contact_person_phone: faker.phone.phoneNumber(),
            contact_person_email: faker.internet.email(),
            facility_id: id,
            postal_address: address
        });
        
        addresses.push({
            physical_address: faker.address.streetAddress(),
            postal_address: faker.address.secondaryAddress(),
            village: faker.address.streetAddress(),
            ta: faker.address.streetName(),
            facility_id: id
        });

        locations.push({
            catchment_area: faker.address.streetName(),
            catchment_population: faker.random.number({
                min: 100000,
                max: 1000000
            }),
            facility_id: id
        });

        geoLocations.push({
            datum: faker.random.number({
                min: 0,
                max: 50
            }),
            longitude: faker.address.latitude(),
            latitude: faker.address.longitude(),
            facility_id: id
        });

    });
    
    await ContactPeople.create(contactPeople);
    await Address.create(addresses);
    await Location.create(locations);
    await Geolocation.create(geoLocations);

    return;
}