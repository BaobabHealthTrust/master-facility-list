"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const FacilityType = server.models.FacilityType;

const facilityTypeData = {
    facility_type: "Public",
};

FacilityType.create(facilityTypeData).then(resp => {
    const facilityTypeId = resp.id;

    const testData = {
        facility_name: "Mzuzu Central Hospital",
        facility_code: "MZ04022",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: facilityTypeId,
        facility_owner_id: 1,
        facility_operational_status_id: 1,
        facility_regulatory_status_id: 1,
        district_id: 1,
    };

    const testData2 = {
        facility_name: "Phalombe Hospital",
        facility_code: "PH01002",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: facilityTypeId,
        facility_owner_id: 1,
        facility_operational_status_id: 1,
        facility_regulatory_status_id: 1,
        district_id: 1,
    };

    Facility.create([testData, testData2]).then(resp => {
        describe("GET /FacilityTypes/id/facilities", () => {
            it("should return \
                        all facilities of a \
                        particular facility type", done => {
                request
                    .get("/api/FacilityTypes/" + facilityTypeId + "/facilities")
                    .set("Accept", "application/json")
                    .expect(200)
                    .end((err, res) => {
                        res.body.length.should.equal(2);
                        res.body[1].facility_name.should.equal(
                            "Phalombe Hospital"
                        );
                        done();
                    });
            });
        });
    });
});
