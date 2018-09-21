'use strict';
module.exports = function (Facilityresource) {

  Facilityresource.latest = async (id, cb) => {
    const resource = await Facilityresource.findOne({
      where: { facility_id: id },
      order: 'created_date DESC'
    });

    if(!resource) return []

    const filteredResources = await Facilityresource.find({
      where: { and: [{ facility_id: id }, { created_date: resource.created_date }] },
      include: 'resource'
    })

    return filteredResources;
  }

  Facilityresource.remoteMethod('latest', {
    accepts: { arg: 'id', type: 'number' },
    returns: { arg: 'data', type: 'array' },
    http: { verb: 'get' }
  })
};
