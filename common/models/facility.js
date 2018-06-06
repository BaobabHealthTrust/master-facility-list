"use strict";

const server = require("../../server/server");
const generateFacilityPdfFile = require("../../download_modules/pdf-one-facility-formatter");

const prepareData = (data) =>{
    if (data.isArray){
        return data.map(data => {
            data.toJSON();
        });
    }
    return data.toJSON();
}

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
    Facility.download =  async (id,cb) => {

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
                {district: "zone"},
            ],
            limit: 1
        });

        const facilityUtilities = await server.models.FacilityUtility.find({
            where: {facility_id: id},
            include: {utility: "utilityType"}
        });

        const facilityResources = await server.models.FacilityResource.find({
            where: {facility_id: id},
            include: { resource: "resourceType" }
        });

        const facilityServices = await server.models.FacilityService.find({
            where: {facility_id: id},
            include: { service: ["serviceType", "category"] }
        });

        await generateFacilityPdfFile(
            facility,
            facilityUtilities,
            facilityResources,
            facilityServices
        );

        return "Malu working on it.";
    }

    /** Register a remote method */
    Facility.remoteMethod('download',{
        description: "Download facility details",
        accepts: { arg: 'id', type: 'number', required: true},
        http: {path: '/download/:id', verb: 'get'},
        returns: { arg: 'file', type: 'string' }
    });

    //"blob"\
};
