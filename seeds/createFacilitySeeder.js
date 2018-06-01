"use strict";

const faker = require("faker");
const server = require("../server/server");
const dataSource = server.dataSources.db;
const Facility = server.models.Facility;
const numberOfFacilities = process.argv[2];

repeat(numberOfFacilities, print("Malu M. Mzota") );
