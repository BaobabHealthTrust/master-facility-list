"use strict";


const fs = require("fs");
const server = require("../../server/server");
const generateFile = require("../../download_modules/pdf-one-facility-formatter");
const uniq = require("lodash");

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
    });

    /**
     *
     * Generate a pdf file
     *
     * @param {Facility ID} id
     * @param {Loop back callback function} cb
     *
     */
    Facility.downloadFacility =  async (id,cb) => {
        try {
            const error = new Error();
            error.name = "ERROR";
            error.status = 400;

            const facility = await Facility.findOne({
                where: {id: id},
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

            if (facility){
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
    Facility.remoteMethod('downloadFacility',{
        description: "Download facility details",
        accepts: { arg: 'id', type: 'number', required: true},
        http: {path: '/download/:id', verb: 'get'},
        returns: [
          {arg: 'body', type: 'file', root: true},
          {arg: 'Content-Type', type: 'string', http: { target: 'header' }}
        ]
    });

};
