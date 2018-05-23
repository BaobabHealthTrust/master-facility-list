"use strict";


const server = require("../server/server");
const request = require("supertest")(server);

const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;
const data = require("../seeds/data");

module.exports.get = async (endPoint,statusCode, callback) => {
    await request
        .get(endPoint)
        .set("Accept", "application/json")
        .expect(statusCode)
        .then(callback)
        .catch(err => console.error(err));
}

module.exports.facility = {
  facility_code: "NB01042",
  facility_name: "Nkhata-Bay Clinic",
  common_name: "Jonilenge",
  facility_date_opened: "2017-10-25T13:27:53.703Z",
  facility_type_id: 1,
  facility_owner_id: 1,
  facility_operational_status_id: 1,
  facility_regulatory_status_id: 1,
  district_id: 1,
  client_id: 1
};

module.exports.createAdmin = async (users) => {

  try {

    const user = await User.create({
        username: "mmalumbo",
        password: "malu123",
        firstname: "Malumbo",
        lastname: "Mkandawire",
        email: "mmalumbo@gmail.com"
    });

    const role = await Role.create({ name: 'admin' });

      const userRoleMapping = {
          principalType: RoleMapping.USER,
          principalId: user.id
        };

      await role.principals.create(userRoleMapping);

      return user.id;
  } catch (err) {
      console.error(err);
  }
}
