"use strict";

const faker = require("faker");

const server = require("../server/server");
const dataSource = server.dataSources.mysql;

// Load the full build.
var _ = require("lodash");
// Load the core build.
var _c = require("lodash/core");
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require("lodash/fp");

// Load method categories.
var array = require("lodash/array");
var object = require("lodash/fp/object");

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require("lodash/at");
var curryN = require("lodash/fp/curryN");

const Facility = server.models.Facility;
const OperationalStatus = server.models.OperationalStatus;
// const operationalData = OperationalStatus.find();
// Promise.all([operationalData]).then(val => {
// 	const operationalValues = val[0];
// 	_.dropWhile(operationalValues, function(o) { console.log(id); });
// });
for (var i = 0; i <= 20; i++) {
	for (var dependencyId = 1; dependencyId <= 4; dependencyId++) {
		const facilityData = {
			facility_name: faker.name.findName(),
			facility_code: faker.internet.email(),
			facility_date_opened: "2017-10-25T13:27:53.703Z",
			facility_type_id: dependencyId,
			facility_owner_id: dependencyId,
			facility_operational_status_id: dependencyId,
			facility_regulatory_status_id: dependencyId,
		};

		const facilityFake = Facility.create(facilityData);
		if (i < 20) {
			Promise.all([facilityFake]).then(values => {
				console.log(values[0]);
			});
		} else {
			Promise.all([facilityFake]).then(values => {
				console.log(values[0]);

				dataSource.disconnect();
			});
		}
	}
}
// module.exports = Facility
