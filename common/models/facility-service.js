'use strict';

const server = require('../../server/server');

module.exports = function(Facilityservice) {
  Facilityservice.observe('before delete', async function deleteDependants(
    ctx,
  ) {
    const facilityService = await Facilityservice.findOne({
      where: { id: ctx.where.id },
    });
    if (facilityService) {
      const dependants = await server.models.Service.find({
        where: { service_category_id: facilityService.service_id },
      });
      if (dependants.length > 0) {
        const dependantIds = dependants.map((d) => d.id);
        await Facilityservice.destroyAll({
          and: [
            { facility_id: facilityService.facility_id },
            { service_id: { inq: dependantIds } },
          ],
        });

        const sLevelServices = await server.models.Service.find({
          where: { service_category_id: { inq: dependantIds } },
        });

        if (sLevelServices.length > 0) {
          const sLevelDependantIds = sLevelServices.map((d) => d.id);
          await Facilityservice.destroyAll({
            and: [
              { facility_id: facilityService.facility_id },
              { service_id: { inq: sLevelDependantIds } },
            ],
          });
        }
      }
    }
  });

  Facilityservice.saveMany = async (
    facility_id,
    service_ids,
    client_id,
    cb,
  ) => {
    const allFacilityServices = await Facilityservice.find({
      where: { facility_id },
    });

    const facilityServices = service_ids
      .filter((id) => {
        const isExist = allFacilityServices
          .map((fs) => fs.service_id)
          .includes(Number(id));
        return !isExist;
      })
      .map((id) => {
        return {
          service_id: id,
          facility_id,
          client_id,
        };
      });

    if (facilityServices.length > 0)
      await Facilityservice.create(facilityServices);

    return 'Facility Services Successfully Created';
  };

  Facilityservice.hierarchy = async (facility_id, cb) => {
    //TODO: Start from here
    const { FacilityService, Service } = server.models;

    const malu = await FacilityService.find({
      where: { facility_id },
      include: ['service'],
    });

    const maluList = malu.map((m) => m.toJSON().service);
    const map = {};

    for (let i = 0; i < maluList.length; i += 1) {
      map[maluList[i].id] = i;
      maluList[i].children = [];
    }

    for (let j = 0; j < maluList.length; j += 1) {
      const node = maluList[j];
      const { service_category_id } = node;
      if (service_category_id != 0) {
        if (!map[service_category_id]) {
          const parent = await Service.findById(service_category_id);
          const jp = parent.toJSON();
          jp.children = [];
          maluList.push(jp);
          map[service_category_id] = maluList.length - 1;
        }
        maluList[map[service_category_id]].children.push(node);
        delete maluList[j];
      }
    }

    console.log(JSON.stringify(maluList, undefined, 2));

    const lOneServices = await server.models.Service.find({
      where: { service_category_id: 0 },
    });

    const allServices = await server.models.Service.find({});

    const facilityServices = await Facilityservice.find({
      where: { facility_id },
    });

    const allServiceTypes = await server.models.ServiceType.find({});

    const levelOne = facilityServices.filter((fs) => {
      return lOneServices.map((s) => s.id).includes(fs.service_id);
    });

    const hierarchy = levelOne.map((service) => {
      return {
        facilityService: service,
        service: allServices.filter((s) => s.id == service.service_id)[0],
        serviceType: allServiceTypes.filter((st) => {
          const sTid = allServices.filter((s) => s.id == service.service_id)[0]
            .service_type_id;
          return st.id === sTid;
        })[0],
        children: facilityServices
          .filter((fs) => {
            const potentialChildren = allServices.filter(
              (s) => s.service_category_id === service.service_id,
            );
            return potentialChildren.map((pc) => pc.id).includes(fs.service_id);
          })
          .map((lOneChild) => {
            return {
              facilityService: lOneChild,
              service: allServices.filter(
                (s) => s.id == lOneChild.service_id,
              )[0],
              children: facilityServices
                .filter((fs) => {
                  const potentialChildren = allServices.filter(
                    (s) => s.service_category_id === lOneChild.service_id,
                  );
                  return potentialChildren
                    .map((pc) => pc.id)
                    .includes(fs.service_id);
                })
                .map((lTwoChild) => {
                  return {
                    facilityService: lTwoChild,
                    service: allServices.filter(
                      (s) => s.id == lTwoChild.service_id,
                    )[0],
                  };
                }),
            };
          }),
      };
    });

    return hierarchy;
  };

  // TODO: Protect this from unauthorized users
  Facilityservice.remoteMethod('saveMany', {
    accepts: [
      { arg: 'facility_id', type: 'number' },
      { arg: 'service_ids', type: 'array' },
      { arg: 'client_id', type: 'number' },
    ],
    returns: { arg: 'response', type: 'string' },
  });

  Facilityservice.remoteMethod('hierarchy', {
    accepts: [{ arg: 'facility_id', type: 'number' }],
    returns: { arg: 'hierarchy', type: 'object' },
    http: { verb: 'get' },
  });
};
