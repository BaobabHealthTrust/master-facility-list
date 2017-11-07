"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const FacilityOwner = server.models.Owner;

const facilityOwnerData = {
    facility_owner: "Private",
};

FacilityOwner.create(facilityOwnerData).then(resp => {
    const ownerId = resp.id;

    const testData = {
        facility_name: "Lunduzi Private Hospital",
        facility_code: "DZ12043",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: 1,
        facility_owner_id: ownerId,
        facility_operational_status_id: 1,
        facility_regulatory_status_id: 1,
        facility_contact_person_id: 1,
        facility_location_id: 1,
    };

    const testData2 = {
        facility_name: "Mwaiwathu Private Hospital",
        facility_code: "BT21047",
        facility_date_opened: "2017-10-25T13:27:53.703Z",
        facility_type_id: 1,
        facility_owner_id: ownerId,
        facility_operational_status_id: 1,
        facility_regulatory_status_id: 1,
        facility_contact_person_id: 1,
        facility_location_id: 1,
    };

    Facility.create([testData, testData2]).then(values => {
        describe("GET /Owners/{id}/facilities", () => {
            it("should return \
                            all facilities of a \
                            particular owner", done => {
                request
                    .get("/api/Owners/" + ownerId + "/facilities")
                    .set("Accept", "application/json")
                    .expect(200)
                    .end((err, res) => {
                        res.body[1].facility_name.should.equal(
                            "Mwaiwathu Private Hospital"
                        );
                        done();
                    });
            });
        });
    });
});
