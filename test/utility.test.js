"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const Utility = server.models.Utility;
const FacilityUtility = server.models.FacilityUtility;

const testData = {
    facility_name: "Nkhata Bay Hospital",
    facility_code: "NB01002",
    facility_date_opened: "2017-10-25T13:27:53.703Z",
    facility_type_id: 1,
    facility_owner_id: 1,
    facility_operational_status_id: 1,
    facility_regulatory_status_id: 1,
    facility_contact_person_id: 1,
    facility_location_id: 1,
};

const utilityData = {
	utility_name: "ESCOM",
	utility_type_id: 1,
};

const facility = Facility.create(testData);
const utility = Utility.create(utilityData);

Promise.all([facility, utility]).then((values) => {
	const facilityId = values[0].id;
	const utilityId = values[1].id;

	const facilityUtilityData = {
		utility_id: utilityId,
		facility_id: facilityId,
	};

	const facilityUtility = FacilityUtility.create(facilityUtilityData);

	describe("GET /Utilities/{id}/facilities", () => {
		it("should return all \
			facilities which \
			have this \
			particular utility", (done) => {
			request
			 .get("/api/Utilities/" + utilityId + "/facilities")
			 .set("Accept", "application/json")
			 .expect(200)
			 .end((err, res) =>{
			 	res.body[0]
			 	.facility_name
			 	.should
			 	.equal("Nkhata Bay Hospital");
			 	done();
			 });
		});
	});
});