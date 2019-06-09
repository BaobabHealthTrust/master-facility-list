'use strict';

const server = require('../server/server');
const { truncate } = require('./seed-helpers');

const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;
var path = require('path');

module.exports = async (data) => {
  try {
    await truncate(User);
    await truncate(Role);
    await truncate(RoleMapping);

    await User.destroyAll();
    await Role.destroyAll();
    await RoleMapping.destroyAll();

    const user = await User.create(data);
    const role = await Role.create({ name: 'admin' });

    const userRoleMapping = {
      principalType: RoleMapping.USER,
      principalId: user.id,
    };
    await role.principals.create(userRoleMapping);

    await console.log('Admin user created successfully\n');
    await console.log(`username: ${user.username}`);
    await console.log(`password: ${data.password}\n`);
  } catch (err) {
    console.error(err);
  }
};
