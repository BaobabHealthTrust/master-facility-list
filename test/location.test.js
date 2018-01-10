"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const Location = server.models.Location;

const testData = {
    facility_name: "Chilunga Health Center",
    facility_code: "NT23007",
    facility_date_opened: "2017-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    district_id: 1,
};

Facility.create(testData).then(resp => {
    const facilityId = resp.id;

    const locationData = {
        catchment_area: "Ntchisi Rural",
        catchment_population: 200000,
        facility_id: facilityId,
    };

    Location.create(locationData).then(resp => {
        const locationId = resp.id;

        describe("GET /Locations/{id}/facility", () => {
            it("should return a \
                            facility of a particular \
                            location", done => {
                request
                    .get("/api/Locations/" + locationId + "/facility")
                    .set("Accept", "application/json")
                    .expect(200)
                    .end((err, res) => {
                        res.body
                        .facility_name
                        .should.equal("Chilunga Health Center");
                        done();
                    });
            });
        });
    });
});
