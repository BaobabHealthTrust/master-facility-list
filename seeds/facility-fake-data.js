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
const operationalData = OperationalStatus.find();
Promise.all([operationalData]).then(val => {
	console.log(val[0]);
});

const facilityData = {
	facility_name: faker.name.findName(),
	facility_code: faker.internet.email(),
	facility_date_opened: "2017-10-25T13:27:53.703Z",
	facility_type_id: 1,
	facility_owner_id: 2,
	facility_operational_status_id: 3,
	facility_regulatory_status_id: 4,
};

const facilityFake = Facility.create(facilityData);
Promise.all([facilityFake]).then(values => {
	console.log(values[0]);
	dataSource.disconnect();
});
// module.exports = User
