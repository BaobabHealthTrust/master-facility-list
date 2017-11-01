"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const Geolocation = server.models.Geolocation;

const testData = {
    facility_name: "Dedza District Hospital",
    facility_code: "DZ01002",
    facility_date_opened: "2017-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    facility_contact_person_id: 1,
};

Facility.create(testData).then(resp => {
    const facilityId = resp.id;

    const geopointData = {
        lat: -33.13627,
        lng: 9.12365
    };

    const geolocationData = {
        datum: 20,
        geolocation: geopointData,
        facility_id: facilityId
    };

    Geolocation.create(geolocationData).then( resp => {
        const geolocationId = resp.id;

        describe("GET /Geolocations/{id}/facility", () => {
            it("should return a \
                            facility of a particular \
                            location", done => {
                request
                    .get("/api/Geolocations/" + geolocationId + "/facility")
                    .set("Accept", "application/json")
                    .expect(200)
                    .end((err, res) => {
                        res.body.facility_name.should.equal("Dedza District Hospital");
                        done();
                    });
            });
        });
    });
});
