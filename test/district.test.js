"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const District = server.models.District;
const Location = server.models.Location;

const testData = {
	facility_name: "Nkhata Clinic",
	facility_code: "NB01002",
	facility_date_opened: "2017-10-25T13:27:53.703Z",
	facility_type_id: 1,
	facility_owner_id: 1,
	facility_operational_status_id: 1,
	facility_regulatory_status_id: 1,
};

const districtData = {
	district_name: "Nkhata Bay",
	zone_id: 1,
};

const facility = Facility.create(testData);
const district = District.create(districtData);

Promise.all([facility, district]).then(values => {
	const facilityId = values[0].id;
	const districtId = values[1].id;

	const locationData = {
		catchment_area: "Along M5 in Mkondezi village",
		catchment_population: 150000,
		district_id: districtId,
		facility_id: facilityId,
	};

	const location = Location.create(locationData);

	describe("GET /Districts/{id}/facilities", () => {
		it("should return all \
			facilities which \
			are found in a \
			particular district", done => {
			request
				.get("/api/Districts/" + districtId + "/facilities")
				.set("Accept", "application/json")
				.expect(200)
				.end((err, res) => {
					res.body[0].facility_name.should.equal("Nkhata Clinic");
					done();
				});
		});
	});
});
