"use strict";

const server = require("../server/server");
const dataSource = server.dataSources.db;
const User = server.models.Client;
const Role = server.models.Role;
const RoleMapping = server.models.RoleMapping;

const user = User.create(
    {
        username: "chitipadho",
        password: "dho123",
        firstname: "John",
        lastname: "Chiwaya",
        email: "dho@mw.com"
    },
    (err, user) => {
        if (err) throw err;

        Role.create({ name: "trusted" }, (err, role) => {
            if (err) throw err;
            //make user created to be a trusted user
            role.principals.create(
                {
                    principalType: RoleMapping.USER,
                    principalId: user.id
                },
                (err, principal) => {
                    if (err) throw err;

                    console.log(
                        "User, Role and RoleMapping successfully created"
                    );
                    dataSource.disconnect();
                }
            );
        });
    }
);
