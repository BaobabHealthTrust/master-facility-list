"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const OperationalStatus = server.models.OperationalStatus;

const operationalStatusData = {
    facility_operational_status: "Functional",
};

const operationalStatus = OperationalStatus.create(operationalStatusData);

describe("GET /OperationalStatuses", () => {
    it("should return a particular \
        operational status \
        which was created", done => {
        request
            .get("/api/OperationalStatuses")
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res) => {
                const operationalStatusId = res.body[0].id;

                const testData = {
                    facility_name: "Bwaila Hospital",
                    facility_code: "LL01002",
                    facility_date_opened: "2017-10-25T13:27:53.703Z",
                    facility_type_id: 1,
                    facility_owner_id: 1,
                    facility_operational_status_id: operationalStatusId,
                    facility_regulatory_status_id: 1,
                    facility_contact_person_id: 1,
                    facility_location_id: 1,
                };

                const testData2 = {
                    facility_name: "Phalombe Hospital",
                    facility_code: "PH01002",
                    facility_date_opened: "2017-10-25T13:27:53.703Z",
                    facility_type_id: 1,
                    facility_owner_id: 1,
                    facility_operational_status_id: operationalStatusId,
                    facility_regulatory_status_id: 1,
                    facility_contact_person_id: 1,
                    facility_location_id: 1,
                };
                const facility = Facility.create([testData, testData2]);
                Promise.all([facility]).then(values => {
                    describe("GET /OperationalStatuses/id/facilities", () => {
                        it("should return \
                        all facilities of a \
                        particular operational status", done => {
                            request
                                .get(
                                    "/api/OperationalStatuses/" +
                                        operationalStatusId +
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
