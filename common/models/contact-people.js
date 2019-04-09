"use strict";
const server = require("../../server/server");

module.exports = function(Contactpeople) {
  Contactpeople.observe("after save", async function(ctx) {
    if (ctx.instance) {
      // console.log(ctx.instance);
      // server.models.Facility.findById(ctx.instance.facility_id, function() {
      //   console.log(arguments);
      // });
      // const facility = await server.models.Facility.findById(
      //   ctx.instance.facility_id
      // );
      // console.log(facility);
      // facility.updated_at = Date.now();
      // await facility.save();
    }
  });
};
