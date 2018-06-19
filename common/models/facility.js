"use strict";

const server = require("../../server/server");
const generatePdfFile = require("../../download_modules/pdf-formatter");
const generateCsvFile = require("../../download_modules/csv-formatter");
const generateExcelFile = require("../../download_modules/excel-formatter");
const generateFile = require("../../download_modules/pdf-one-facility-formatter");
const _ = require("lodash");

module.exports = (Facility) => {

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

  Facility.remoteMethod('updateContactDetails', {
    accepts: [
      { arg: 'data', type: 'object' },
      { arg: 'id', type: 'number' }
    ],
    returns: { arg: 'response', type: 'string' }
  })

  Facility.remoteMethod('contactDetails', {
    accepts: [
      { arg: 'data', type: 'object' },
      { arg: 'id', type: 'number' }
    ],
    returns: { arg: 'response', type: 'string' }
  });

  /**
   *
   * Generate a pdf file
   *
   * @param {Facility ID} id
   * @param {Loop back callback function} cb
   *
   */
  Facility.downloadFacility = async (id, cb) => {
      try {
        const error = new Error();
        error.name = "ERROR";
        error.status = 400;

        const facility = await Facility.findOne({
            where: {id},
            include: [
                "locations",
                "contactPeople",
                "regulatoryStatus",
                "operationalStatus",
                "owner",
                "facilityType",
                "addresses",
                { district: "zone" },
            ],
            limit: 1
        }).catch(err => cb(err));

        if (facility) {
          const utilities = await server.models.FacilityUtility.find({
              where: { facility_id: id },
              include: { utility: "utilityType" }
          }).catch(err => cb(err));

          const resources = await server.models.FacilityResource.find({
              where: { facility_id: id },
              include: { resource: "resourceType" }
          }).catch(err => cb(err));

          const services = await server.models.FacilityService.find({
              where: { facility_id: id },
              include: { service: ["serviceType", "category"] }
          }).catch(err => cb(err));

          await generateFile(
              facility.toJSON(),
              utilities.map(data => data.toJSON()),
              resources.map(data => data.toJSON()),
              services.map(data => data.toJSON()),
              (err, stream) => {
                  if (err) {
                      return cb(err);
                  }
                  cb(null, stream, 'application/pdf');
              }
          );
        } else {
            error.message = "Invalid facility ID.";
            cb(error);
        }
      } catch (error) {
          console.log("Malu" + error);
      }
  }

  /** Register download  remote method */
  Facility.remoteMethod('downloadFacility', {
    description: "Download facility details",
    accepts: { arg: 'id', type: 'number', required: true },
    http: { path: '/download/:id', verb: 'get' },
    returns: [
      { arg: 'body', type: 'file', root: true },
      { arg: 'Content-Type', type: 'string', http: { target: 'header' } }
    ]
  });

  /**
   * Download facilities.
   * @param {string} format File format.
   * @param {callback} cb Callback.
   */
  Facility.downloadFacilities = async (json, cb) => {
    try {
      const data = JSON.parse(json);
      if (!data.hasOwnProperty('format') || !data.hasOwnProperty('format')) {
        const error = new Error("Invalid post format.");
        error.name = "ERROR";
        error.status = 400;
        cb(error);
      }

      const facilities = await Facility.find({
        where: data.where,
        include: [
          "locations",
          "contactPeople",
          "regulatoryStatus",
          "operationalStatus",
          "owner",
          "facilityType",
          { district: "zone" }
        ]
      }).catch(err => cb(err));

      const callback = (err, stream) => {
        if (err) {
          return cb(err);
        }

        let contentType = null;
        switch (data.format) {
          case 'csv':
            contentType = "text/csv";
            break;

          case 'pdf':
            contentType = "application/pdf";
            break;

          case 'excel':
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            break;
        }
        cb(null, stream, contentType);
      }

      if (data.format == "pdf") {
        generatePdfFile(facilities, callback);
      }

      if (data.format == "excel") {
        generateExcelFile(facilities, callback);
      }

      if (data.format == "csv") {
        generateCsvFile(facilities, callback);
      }

      const error = new Error();
      error.name = "ERROR";
      error.status = 400;
      error.message = "Invalid facility ID.";
      cb(error);
    } catch (error) {
      cb(error);
    }
  };

  /** Register download  remote method */
  Facility.remoteMethod('downloadFacilities', {
    description: "All facilities download",
    accepts: {arg: "data", type: "string"},
    http: {path: '/download', verb: 'get'},
    returns: [
      { arg: 'body', type: 'file', root: true },
      { arg: 'Content-Type', type: 'string', http: { target: 'header' } }
    ]
  });

};
