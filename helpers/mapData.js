"use strict";
const statusFetch = require("./model-status-fetch-helper");
const server = require("../server/server");

const locationFilterMapData = {
  name: "facility_name",
  status: {
    name: "facility_operational_status_id",
    _name: "facility_operational_status",
    model: async condition => {
      return await statusFetch(server.models.OperationalStatus, {
        where: condition
      });
    }
  },
  registration: {
    name: "facility_regulatory_status_id",
    _name: "facility_regulatory_status",
    model: async condition => {
      return await statusFetch(server.models.RegulatoryStatus, {
        where: condition
      });
    }
  }
};

module.exports.locationFilterMapData = locationFilterMapData;
