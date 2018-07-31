"use strict";

const server = require("../server/server");

const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;

module.exports = async (users) => {

    try {
        await User.destroyAll();
        await Role.destroyAll();
        await RoleMapping.destroyAll();

        const userIDs = await User.create(users).map(user => user.id);

        const role = await Role.create({ name: 'admin' });

        const userRoleMapping = userIDs.map(userID => {
          return {
            principalType: RoleMapping.USER,
            principalId: userID
          }
        })

        await role.principals.create(userRoleMapping);

        const user = await User.find({where: {id: 1}})
        // await console.log("Malu");

        // await console.log("User, Role and RoleMapping successfully created");
    } catch (err) {
        console.error(err);
    }

}
