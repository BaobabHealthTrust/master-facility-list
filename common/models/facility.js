"use strict";

const server = require("../../server/server");
const generatePdfFile = require("../../download_modules/pdf-formatter");
const generateCsvFile = require("../../download_modules/csv-formatter");
const generateExcelFile = require("../../download_modules/excel-formatter");
const generateFile = require("../../download_modules/pdf-one-facility-formatter");
const _ = require("lodash");
const moment = require("moment");

const getDistrictsIDs = async (data=null) => {
    if(data && data != []){
        const districtsNames = await data.map( name => _.capitalize(name));
        const districts = await server.models.District.find({
            where: { district_name: { inq: districtsNames } }
        });
        if (districts){
            return districts.map(district => district.id);
        }
    }
    return [];
};

module.exports = (Facility) => {

  Facility.observe('after save', async function generateFacilityCode(ctx) {
    if (ctx.instance) {
      const district_id = _.padStart(ctx.instance.district_id, 2, '0');
      const id = _.padStart(String(ctx.instance.id), 4, '0');
      const district = await server.models.District.findOne({ where: { id: district_id } });
      if (ctx.instance.published_date && !ctx.instance.archived_date) {
        const facility = await Facility.findOne({ where: { id: ctx.instance.id } }).then(facility => {
          facility.updateAttributes({ facility_code: `${district.district_code}${district_id}${id}` }, (err, instance) => {
            if (err) console.error(err);
          })
        })
      }
    }
  })

  // TODO: Do the same thing for archived client
  Facility.observe('access', async function filterArchivedAndUnpublished(ctx) {
    if (ctx.options && ctx.options.skipAccessFilter) return;
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

  Facility.publish = async (id, district_id, cb) => {
    await Facility.findById(id, {}, { skipAccessFilter: true }).then(facility => {
      facility.updateAttributes({
        published_date: new Date(),
        district_id
      })
    }).catch(err => console.error(err))

    return "Successfully Published Facility"
  }

  Facility.list = async (filter, regex, cb) => {
    const facilities = await Facility.find({
      ...filter,
      include: [
        'owner',
        'facilityType',
        'operationalStatus',
        'regulatoryStatus',
        'contactPeople',
        'locations',
        { district: 'zone' }
      ]
    })

    const formattedFacilities = facilities.map(facility => {
      const formattedFacility = facility.toJSON();
      return {
        id: facility.id,
        code: facility.facility_code,
        name: facility.facility_name,
        common: facility.common_name,
        ownership: formattedFacility.owner.facility_owner,
        type: formattedFacility.facilityType.facility_type,
        status: formattedFacility.operationalStatus.facility_operational_status,
        district: formattedFacility.district.district_name,
        dateOpened: moment(facility.facility_date_opened).format("MMM Do YY"),
        string: `${facility.facility_name}${facility.facility_code}${facility.common_name}`
          + `${formattedFacility.owner.facility_owner}${formattedFacility.facilityType.facility_type}`
          + `${formattedFacility.operationalStatus.facility_operational_status}`
          + `${formattedFacility.district.district_name}`
      }
    })

    // TODO: Handle Blank Regex
    return regex
      ? formattedFacilities.filter(facility => {
        return new RegExp(`.*${regex.toUpperCase()}`).test(facility.string.toUpperCase());
      }).filter((facility, index) => index < 5)
      : formattedFacilities;
  }

  // TODO: Protect these remote methods from unauthorized users
  Facility.remoteMethod('updateContactDetails', {
    accepts: [
      { arg: 'data', type: 'object' },
      { arg: 'id', type: 'number' }
    ],
    returns: { arg: 'response', type: 'string' }
  })

  Facility.remoteMethod('publish', {
    accepts: [
      { arg: 'id', type: 'number' },
      { arg: 'district_id', type: 'number' },
    ],
    returns: { arg: 'response', type: 'string' }
  })

  Facility.remoteMethod('list', {
    accepts: [
      { arg: 'filter', type: 'object' },
      { arg: 'regex', type: 'string' },
    ],
    returns: { arg: 'data', type: 'object' },
    http: { verb: 'get' }
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
          console.log(error);
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


  Facility.regulatoryStatus = async (districts, cb) => {
      const regulatoryStatuses = await server.models.RegulatoryStatus.find();
      const IDs = await getDistrictsIDs(districts)
      const where = IDs.length ? { district_id: { inq: IDs } } : {}
      const facilities = await Facility.find({ where })

      return regulatoryStatuses.map(regulatoryStatus => ({
        name: regulatoryStatus.facility_regulatory_status,
        count: facilities.filter(facility => (facility.facility_regulatory_status_id == regulatoryStatus.id)).length
      }));
  };

  Facility.remoteMethod('regulatoryStatus', {
    description: "retrieves the aggragate data for facility types and ownership",
    http: { path: '/aggregates/regulatorystatuses', verb: 'get' },
    accepts: { arg: 'districts', type: 'array'},
    returns: [
      { arg: 'response', type: 'array'}
    ]
  });

  Facility.operationalStatus = async (districts, cb) => {
    const IDs = await getDistrictsIDs(districts)
    const where = IDs.length ? { district_id: { inq: IDs } } : {}
    const facilities = await Facility.find({ where })

    const operationalStatuses = await server.models.OperationalStatus.find();
    return operationalStatuses.map(operationalStatus => ({
      name: operationalStatus.facility_operational_status,
      value: facilities.filter(facility => (facility.facility_operational_status_id == operationalStatus.id)).length
    }));
  };

  Facility.remoteMethod('operationalStatus', {
    description: "retrieves the aggragate data for facility types and ownership",
    http: { path: '/aggregates/operationalstatuses', verb: 'get' },
    accepts: { arg: 'districts', type: 'array' },
    returns: [
      { arg: 'response', type: 'array' }
    ]
  })

  Facility.facilitiesByTypeAndOwnership = async (districts, cb) => {
    const IDs = await getDistrictsIDs(districts)
    const where = IDs.length ? { district_id: { inq: IDs } } : {}
    const facilities = await Facility.find({ where })
    const owners = await server.models.Owner.find()
    const facilityTypes = await server.models.FacilityType.find()

    const data = []
    const mapped = owners.map(owner => ({...owner, types: facilityTypes}))

    mapped.forEach(map => {
      let obj = {'name': map.__data.facility_owner}
      map.types.map(e => {
        _.merge(obj, {[e.facility_type]: facilities.filter(facility => (facility.facility_owner_id == map.__data.id && facility.facility_type_id == e.id)).length})
      })
      data.push(obj)
    })
    return data
  }

  Facility.remoteMethod('facilitiesByTypeAndOwnership', {
    description: "retrieves the aggragate data for facility types and ownership",
    http: { path: '/aggregates/typeandownership', verb: 'get' },
    accepts: { arg: 'districts', type: 'array' },
    returns: [
      { arg: 'response', type: 'array' }
    ]
  });

  Facility.facilitiesByService = async (service_name, districts, cb) => {
    if (!service_name) return [];
    const IDs = await getDistrictsIDs(districts);
    const serviceIds = await server.models.Service.find().filter(service => {
      return _.lowerCase(service.service_name).includes(_.lowerCase(service_name));
    }).map(service => service.id)

    const facilityIds = await server.models.FacilityService.find().filter(facilityService => {
      return serviceIds.includes(facilityService.service_id)
    }).map(facilityService => facilityService.facility_id)

    const where =  {id:{inq: facilityIds}}
    if (IDs.length) where.district_id = { inq: IDs }
    const facilities = await server.models.Facility.find({where})
    return facilities
  }

  Facility.remoteMethod('facilitiesByService', {
    description: "retrieves facilities given a specific service",
    http: { path: '/facilitieswithservice', verb: 'get' },
    accepts: [
      { arg: 'service_name', type: 'string' },
      { arg: 'districts', type: 'array' }
    ],
    returns: [
      { arg: 'response', type: 'array' }
    ]
  });

  Facility.totalFacilities = async (districts, cb) => {
    const IDs = await getDistrictsIDs(districts)
    const where = IDs.length ? {district_id: { inq: IDs }} : {}
    const facilities = await Facility.find({where})
    return facilities.length
  }

  Facility.remoteMethod('totalFacilities', {
    description: "retrieves facilities based on district name",
    http: { path: '/total', verb: 'get' },
    accepts: [ { arg: 'districts', type: 'array' }],
    returns: [ { arg: 'response', type: 'number' }]
  });

};
