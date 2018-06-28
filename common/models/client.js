const server = require("../../server/server");

"use strict";

module.exports = function(Client) {

    Client.observe('access', async function archivedAdmin(ctx) {
      if (ctx.options && ctx.options.skipAccessFilter) return;
      const query = { and: [{ archived_date: null}]};
      if (!ctx.query) ctx.query = {
        where: query
      };
      if (ctx.query) {
        if (ctx.query.where) ctx.query.where = {
          and: [ctx.query.where, query]
        }
        else ctx.query.where = query
      }
    });

    Client.validatesLengthOf("username", {
        min: 6,
        message: { min: "Username is too short" }
    });

    Client.validatesLengthOf("password", {
        min: 5,
        message: { min: "Password is too short" }
    });



    // TODO: remote hook to only get null users

    Client.createAdmin = async (data, cb) => {
        const client = await server.models.Client.create(data);
        const role = (await server.models.Role.find({where: {name: 'admin'}}))[0];
        const roleMap = {
            principalType: server.models.RoleMapping.USER,
            principalId: client.id
        };
        const map = await role.principals.create(roleMap);
        return map;
    }

    Client.remoteMethod('createAdmin', {
        accepts: [
            { arg: 'data', type: 'object' }
        ],
        returns: { arg: 'response', type: 'object' },
        http: { verb: 'post' }
    })

    Client.archiveUser = async (user_id, archived_user_id, cb) => {
        if (user_id == archived_user_id) {
            error = new Error("Admin client self delete is not allowed.");
            error.name = "Error";
            error.status = 400;
            cb(error);
        }

        const qry = {
            where: {
              id: archived_user_id
            },
            limit: 1
        };

        const user = await Client.findOne(qry).catch(err => cb(err));
        if (!user) {
            error = new Error("client to be archived is not found.");
            error.name = "Error";
            error.status = 400;
            cb(error);
        }
        user.archived_date = new Date();
        await user.save();
        return `user "${user.username}" archived successfully.`;
    }

    Client.remoteMethod('archiveUser', {
      accepts: [
        {arg: 'user_id',type: 'number'},
        {arg: 'archived_user_id',type: 'number'}
      ],
      returns: {
        arg: 'response',
        type: 'string'
      },
      http: {
        verb: 'put'
      }
    })


};
