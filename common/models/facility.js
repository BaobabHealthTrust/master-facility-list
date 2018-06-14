"use strict";
const server = require("../../server/server");
const _ = require("lodash");

module.exports = (Facility) => {
  // TODO: Re engineer download and downloadOne remote methods

  Facility.observe('after save', async function filterProperties(ctx) {
    if (ctx.instance) {
      const district_id = _.padStart(ctx.instance.district_id, 2, '0');
      const id = _.padStart(String(ctx.instance.id), 4, '0');
      const district = await server.models.District.findOne({ where: { id: district_id } });
      const facility = await Facility.findOne({ where: { id: ctx.instance.id } }).then(facility => {
        facility.updateAttributes({ facility_code: `${district.district_code}${district_id}${id}` }, (err, instance) => {
          if (err) console.error(err);
        })
      })
    }
  })

  // TODO: Do the same thing for archived client
  Facility.observe('access', async function filterArchivedAndUnpublished(ctx) {
    const query = { and: [{ published_date: { neq: null } }, { archived_date: null }] };
    if (!ctx.query) ctx.query = { where: query };
    if (ctx.query) {
      if (ctx.query.where) ctx.query.where = { and: [ctx.query.where, query] }
      else ctx.query.where = query
      console.log(ctx.query);
    }
  })

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

  Facility.updateContactDetails = async (data, id, cb) => {

    await server.models.Address.findOne({ where: { facility_id: id } }).then(address => {
      address.updateAttributes({
        physical_address: data.physicalAddress,
        postal_address: data.postalAddress,
        client_id: data.client,
      }, (err, instance) => { if (err) console.error(err) })
    })

    await server.models.ContactPeople.findOne({ where: { facility_id: id } }).then(contactPerson => {
      contactPerson.updateAttributes({
        contact_person_fullname: data.contactName,
        contact_person_phone: data.contactPhoneNumber,
        contact_person_email: data.contactEmail,
        client_id: data.client,
      }, (err, instance) => { if (err) console.error(err) })
    })

    await server.models.Location.findOne({ where: { facility_id: id } }).then(location => {
      location.updateAttributes({
        catchment_area: data.catchmentArea,
        catchment_population: data.catchmentPopulation,
        client_id: data.client,
      }, (err, instance) => { if (err) console.error(err) })
    })

    await server.models.Geolocation.findOne({ where: { facility_id: id } }).then(geolocation => {
      geolocation.updateAttributes({
        longitude: data.longitude,
        latitude: data.latitude,
        client_id: data.client,
      }, (err, instance) => { if (err) console.error(err) })
    })

    return "Data Successfully Updated";
  }

  Facility.remoteMethod('contactDetails', {
    accepts: [
      { arg: 'data', type: 'object' },
      { arg: 'id', type: 'number' }
    ],
    returns: { arg: 'response', type: 'string' }
  })

  Facility.remoteMethod('updateContactDetails', {
    accepts: [
      { arg: 'data', type: 'object' },
      { arg: 'id', type: 'number' }
    ],
    returns: { arg: 'response', type: 'string' }
  })

};
