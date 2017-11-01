"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

describe("Address", () => {

    const Facility = server.models.Facility;
    const FacilityAddress = server.models.Address;

    const testData = {
        facility_name: "Chibavi",
        facility_code: "MZ04002",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: 1,
        facility_owner_id: 1,
        facility_operational_status_id: 1,
        facility_regulatory_status_id: 1,
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
                        facility_id: facilityId
                    };

                    const address = FacilityAddress.create(facilityAddress);

                    Promise.all([address]).then(values => {
                        const addressId = values[0].id;

                        describe("GET /Address/{id}/facility", () => {
                            it("should return a \
                            facility of a particular \
                            address", done => {
                                request
                                    .get(
                                        "/api/Addresses/" +
                                            addressId +
                                            "/facility"
                                    )
                                    .set("Accept", "application/json")
                                    .expect(200)
                                    .end((err, res) => {
                                        res.body.facility_name.should.equal(
                                            "Chibavi"
                                        );
                                        done();
                                    });
                            });
                        });
                    });
                });

            done();
        });
    });
});
