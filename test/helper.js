"use strict";

const server = require("../server/server");
const request = require("supertest")(server);
const testData = require('./data');

const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;


const data = require("../seeds/data");

module.exports.get = (endPoint,statusCode, callback) => {
    request
        .get(endPoint)
        .set("Accept", "application/json")
        .expect(statusCode)
        .then(callback)
        .catch(err => console.error(err));
}

module.exports.post = (endPoint, data,statusCode, callback) => {
    request
        .post(endPoint)
        .send(data)
        .set("Accept", "application/json")
        .expect(statusCode)
        .then(callback)
        .catch(err => console.error(err));
}


module.exports.put = (endPoint, data,statusCode, callback) => {
  request
      .patch(endPoint)
      .send(data)
      .set("Accept", "application/json")
      .expect(statusCode)
      .then(callback)
      .catch(err => console.error(err));
}

module.exports.createAdmin = async (users) => {
    try {
        const userIDs = await User.create(data.users).map(user => user.id);
        const role = await Role.create({ name: 'admin' });
        const userRoleMapping = userIDs.map(userID => {
            return {
                principalType: RoleMapping.USER,
                principalId: userID
            }
        });
        await role.principals.create(userRoleMapping);
    } catch (err) {
        console.error(err);
    }
}

module.exports.createFacility = async () => {
  try {

      const facility = await server.models.Facility.create(testData.facility);
      await server.models.ContactPeople.create(testData.contactPeople);
      const resource = await server.models.Resource.create(testData.resource);
      await server.models.FacilityResource.create({
          "facility_id": facility.id,
          "resource_id": resource.id,
          "quantity": 40,
          "description": "This resource",
      });

      const utility = await server.models.Utility.create({
          "utility_name": "National Grid",
          "description": "This is national grid",
          "utility_type_id": 1,
      });

      await server.models.FacilityUtility.create({
        "facility_id": facility.id,
        "utility_id": utility.id,
      });

      const service =  await server.models.Service.create({
        "service_name": "Out patient services (OPD)",
        "service_description": "This is out patient Service",
        "service_type_id": 1,
        "service_category_id": 0,
      });

      await server.models.FacilityService.create({
        "facility_id": facility.id,
        "service_id": service.id,
      });

      return facility.id;

  } catch (err) {
      console.error(err);
  }
}
