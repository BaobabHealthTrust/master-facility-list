"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const Facility = server.models.Facility;
const District = server.models.District;
const Location = server.models.Location;

const districtData = {
	district_name: "Mzimba",
	zone_id: 1,
};

const district = District.create(districtData);

Promise.all([district]).then(values => {
	const districtId = values[0].id;

	const testData = {
		facility_name: "Chibavi",
		facility_code: "MZ01002",
		facility_date_opened: "2017-10-25T13:27:53.703Z",
		facility_type_id: 1,
		facility_owner_id: 1,
		facility_operational_status_id: 1,
		facility_regulatory_status_id: 1,
		district_id: districtId,
	};
	const facility = Facility.create(testData);
	Promise.all([facility]).then(val => {
		const facilityId = val[0].id;

		const locationData = {
			catchment_area: "Along M5 in Mkondezi village",
			catchment_population: 150000,
			district_id: districtId,
			facility_id: facilityId
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
						res.body[0]
						.facility_name
						.should.equal("Chibavi");
						done();
					});
			});
		});
	});
});
