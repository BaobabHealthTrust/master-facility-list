"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const ContactPeople = server.models.ContactPeople;

const testData = {
    facility_name: "Ndirande MASM",
    facility_code: "BT21102",
    facility_date_opened: "2017-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1
};

Facility.create(testData).then(resp => {
    const facilityId = resp.id;

    const contactPeopleData = {
        contact_person_fullname: "Lyton Paul Nyemba",
        contact_person_phone: "+265 884 21 37 81",
        facility_id: facilityId
    };

    ContactPeople.create(contactPeopleData).then(resp => {
        const personId = resp.id;

        describe("GET /ContactPeople/{id}/facility", () => {
            it("should return \
                            contact person of a particular \
                            facility", done => {
                request
                    .get("/api/ContactPeople/" + personId + "/facility")
                    .set("Accept", "application/json")
                    .expect(200)
                    .end((err, res) => {
                        res.body.facility_name.should.equal("Ndirande MASM");
                        done();
                    });
            });
        });
    });
});
