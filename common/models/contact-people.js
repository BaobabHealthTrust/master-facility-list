"use strict";
const server = require("../../server/server");

module.exports = function(Contactpeople) {
  Contactpeople.observe("after save", async function generateFacilityCode(ctx) {
    if (ctx.instance) {
      const facility = await server.models.Facility.findById(
        ctx.instance.facility_id
      );
      facility.updated_at = Date.now();
      await facility.save();
    }
  });
};
