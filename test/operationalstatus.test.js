"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const OperationalStatus = server.models.OperationalStatus;

const operationalStatusData = {
    facility_operational_status: "Functional"
};

OperationalStatus.create(operationalStatusData).then(resp => {
    const operationalStatusId = resp.id;

    const testData = {
        facility_name: "Lunzu",
        facility_code: "BT22081",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: 1,
        facility_owner_id: 1,
        facility_operational_status_id: operationalStatusId,
        facility_regulatory_status_id: 1,
    };

    const testData2 = {
        facility_name: "Nsanje Clinic",
        facility_code: "NS27022",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: 1,
        facility_owner_id: 1,
        facility_operational_status_id: operationalStatusId,
        facility_regulatory_status_id: 1,
    };

    Facility.create([testData, testData2]).then(values => {
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
                            "Nsanje Clinic"
                        );
                        done();
                    });
            });
        });
    });
});
