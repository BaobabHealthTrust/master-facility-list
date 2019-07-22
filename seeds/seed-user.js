'use strict';

const path = require('path');

const server = require('../server/server');
const { truncate } = require('./seed-helpers');

const { User, Client, Role, RoleMapping } = server.models;
const { log, error, clear } = console;

module.exports = async (data) => {
  try {
    await truncate(Client);
    await truncate(Role);
    await truncate(RoleMapping);

    const user = await Client.create(data);
    const role = await Role.create({ name: 'admin' });

    const userRoleMapping = {
      principalType: RoleMapping.USER,
      principalId: user.id,
    };
    await role.principals.create(userRoleMapping);

    log('👤 admin user created\n');
    log(`\t username: ${user.username}`);
    log(`\t password: ${data.password}\n`);
  } catch (err) {
    error(err.message);
  }
};
