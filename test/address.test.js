"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const FacilityAddress = server.models.Address;

const testData = {
    facility_name: "Bwaila Hospital",
    facility_code: "LL01002",
    facility_date_opened: "2017-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    facility_contact_person_id: 1,
    facility_location_id: 1,
};

const facility = Facility.create(testData);

describe("GET /Facilities", () => {
    it("should return successfully one facility\
                 that was added", done => {
        request
            .get("/api/Facilities")
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res) => {
                const facilityId = res.body[0].id;

                const facilityAddress = {
                    physical_address: "Area 3 near minbus depot",
                    facility_id: facilityId,
                };

                const address = FacilityAddress.create(facilityAddress);

                Promise.all([address]).then(values => {
                    const addressId = values[0].id;

                    describe("GET /facility", () => {
                        it("should return a \
                            facility of a particular \
                            address", done => {
                            request
                                .get(
                                    "/api/Addresses/" +
                                        addressId +
                                        "/facilities"
                                )
                                .set("Accept", "application/json")
                                .expect(200)
                                .end((err, res) => {
                                        res
                                        .body.facility_name
                                        .should.equal("Bwaila Hospital");
                                });
                            done();
                        });
                    });
                });
            });

        done();
    });
});
