"use strict";

const server = require("../server/server");

const dataSource = server.dataSources.db;
const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;

const seedUser = async () => {

    try {
        const user = await User.create({
            username: "haroon123",
            password: "haxy",
            firstname: "Haroon",
            lastname: "Twalibu",
            email: "haroon@gmail.com"
        });

        const role = await Role.create({ name: 'admin' });

        await role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
        })
        await console.log("User, Role and RoleMapping successfully created");
    } catch (err) {
        console.error('Whooops 🙈');
    } finally {
        await dataSource.disconnect();
    }

}

seedUser();
