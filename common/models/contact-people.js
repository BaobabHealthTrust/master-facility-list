"use strict";

const { markFacilityAsUpdated } = require('../utils');

module.exports = function(Contactpeople) {
  Contactpeople.observe('after update', async function (ctx) {
    if (ctx.instance) await markFacilityAsUpdated(ctx.instance.facility_id);
  });

  Contactpeople.observe('after save', async function (ctx) {
    if (ctx.instance) await markFacilityAsUpdated(ctx.instance.facility_id);
  });
};
