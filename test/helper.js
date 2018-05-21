"use strict";


const server = require("../server/server");
const request = require("supertest")(server);

const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;

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

      await console.log("User, Role and RoleMapping successfully created");
  } catch (err) {
      console.error(err);
  }
}
