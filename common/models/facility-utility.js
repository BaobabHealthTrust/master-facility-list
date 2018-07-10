'use strict';

module.exports = function (Facilityutility) {
  Facilityutility.latest = async (id, cb) => {
    const utility = await Facilityutility.findOne({
      where: { facility_id: id },
      order: 'created_date DESC'
    });
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
