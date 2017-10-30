"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const FacilityOwner = server.models.Owner;

const facilityOwnerData = {
    facility_owner: "Malawi Government"
};

const facilityOwner = FacilityOwner.create(facilityOwnerData);

describe("GET /Owners", () => {
    it("should return successfully one facility owner\
                 that was added", done => {
        request
            .get("/api/Owners")
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res) => {
                //console.log(res.body[0]);
                const ownerId = res.body[0].id;

                const testData = {
                    facility_name: "Bwaila Hospital",
                    facility_code: "LL01002",
                    facility_date_opened: "2017-10-25T13:27:53.703Z",
                    facility_type_id: 1,
                    facility_owner_id: ownerId,
                    facility_operational_status_id: 1,
                    facility_regulatory_status_id: 1,
                    facility_contact_person_id: 1,
                    facility_location_id: 1
                };

                const testData2 = {
                    facility_name: "Phalombe Hospital",
                    facility_code: "PH01002",
                    facility_date_opened: "2017-10-25T13:27:53.703Z",
                    facility_type_id: 1,
                    facility_owner_id: ownerId,
                    facility_operational_status_id: 1,
                    facility_regulatory_status_id: 1,
                    facility_contact_person_id: 1,
                    facility_location_id: 1
                };

                const facility = Facility.create([testData,testData2]);

                Promise.all([facility]).then(values => {
                    describe("GET /facility", () => {
                        it("should return all facilities of a particular owner", done => {
                            request
                                .get(
                                    "/api/Owners/" +
                                        ownerId +
                                        "/facilities"
                                )
                                .set("Accept", "application/json")
                                .expect(200)
                                .end((err, res) => {
                                    res.body[1].facility_name.should.equal(
                                        "Bwaila Hospital"
                                    );
                                });
                            done();
                        });
                    });
                });
            });

        done();
    });
});
