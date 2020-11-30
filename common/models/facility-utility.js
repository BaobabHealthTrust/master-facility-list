'use strict';

const { markFacilityAsUpdated } = require('../utils/');

module.exports = function (Facilityutility) {
  Facilityutility.observe('after update', async function (ctx) {
    if (ctx.instance) await markFacilityAsUpdated(ctx.instance.facility_id);
  });

  Facilityutility.observe('after save', async function (ctx) {
    if (ctx.instance) await markFacilityAsUpdated(ctx.instance.facility_id);
  });

  Facilityutility.latest = async (id, cb) => {
    const utility = await Facilityutility.findOne({
      where: { facility_id: id },
      order: 'created_date DESC'
    });

    if (!utility) return []

    const filteredUtilities = await Facilityutility.find({
      where: { and: [{ facility_id: id }, { created_date: utility.created_date }] },
      include: 'utility'
    })

    return filteredUtilities;
  }

  Facilityutility.remoteMethod('latest', {
    accepts: { arg: 'id', type: 'number' },
    returns: { arg: 'data', type: 'array' },
    http: { verb: 'get' }
  });
}
