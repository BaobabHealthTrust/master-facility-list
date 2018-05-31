"use strict";
const server = require("../../server/server");

module.exports = (Facility) => {
  // TODO: Re engineer download and downloadOne remote methods
  Facility.contactDetails = async (data, id, cb) => {
    await server.models.Address.create({
      physical_address: data.physicalAddress,
      postal_address: data.postalAddress,
      client_id: data.client,
      facility_id: id
    }).catch(err => cb(err))

    await server.models.ContactPeople.create({
      contact_person_fullname: data.contactName,
      contact_person_phone: data.contactPhoneNumber,
      contact_person_email: data.contactEmail,
      client_id: data.client,
      facility_id: id
    }).catch(err => cb(err))

    await server.models.Location.create({
      catchment_area: data.catchmentArea,
      catchment_population: data.catchmentPopulation,
      client_id: data.client,
      facility_id: id
    }).catch(err => cb(err))

    await server.models.Geolocation.create({
      longitude: data.longitude,
      latitude: data.latitude,
      client_id: data.client,
      facility_id: id
    }).catch(err => cb(err))

    return "Data Successfully Created";
  }

  Facility.remoteMethod('contactDetails', {
    accepts: [
      { arg: 'data', type: 'object' },
      { arg: 'id', type: 'number' }
    ],
    returns: { arg: 'response', type: 'string' }
  })
};
