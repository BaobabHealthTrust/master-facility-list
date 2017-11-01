"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const Service = server.models.Service;
const FacilityService = server.models.FacilityService;

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

const serviceData = {
	service_name: "Surgery",
	service_type_id: 1,
	service_category_id: 1,
};

const facility = Facility.create(testData);
const service = Service.create(serviceData);

Promise.all([facility, service]).then((values) => {
	const facilityId = values[0].id;
	const serviceId = values[1].id;

	const facilityServiceData = {
		service_id: serviceId,
		facility_id: facilityId,
	};

	const facilityService = FacilityService.create(facilityServiceData);

	describe("GET /Services/{id}/facilities", () => {
		it("should return all \
			facilities which \
			have this \
			particular service", (done) => {
			request
			 .get("/api/services/" + serviceId + "/facilities")
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