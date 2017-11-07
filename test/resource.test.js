"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const Resource = server.models.Resource;
const FacilityResource = server.models.FacilityResource;

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

const resourceData = {
	resource_name: "Computer",
	resource_type_id: 1,
};

const facility = Facility.create(testData);
const resource = Resource.create(resourceData);

Promise.all([facility, resource]).then((values) => {
	const facilityId = values[0].id;
	const resourceId = values[1].id;

	const facilityResourceData = {
		facility_id: facilityId,
		resource_id: resourceId,
		quantity: 400,
	};

	const facilityResource = FacilityResource.create(facilityResourceData);

	describe("GET /Resources/{id}/facilities", () => {
		it("should return all \
			facilities which \
			have this \
			particular resource", (done) => {
			request
			 .get("/api/Resources/" + resourceId + "/facilities")
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
