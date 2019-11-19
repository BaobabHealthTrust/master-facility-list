const server = require("../../server/server");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

("use strict");

module.exports = function(Client) {
  Client.observe("access", async function archivedAdmin(ctx) {
    if (ctx.options && ctx.options.skipAccessFilter) return;
    const query = { and: [{ archived_date: null }] };
    if (!ctx.query)
      ctx.query = {
        where: query
      };
    if (ctx.query) {
      if (ctx.query.where)
        ctx.query.where = {
          and: [ctx.query.where, query]
        };
      else ctx.query.where = query;
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

  const createError = (message, callback) => {
    var error = new Error(message);
    return callback(error);
  };

  // TODO: remote hook to only get null users
  Client.createUser = async (data, cb) => {
    const passwordOptions = {
      min: 8,
      max: 32,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2
    };
    const error422 = new Error();
    error422.status = 422;

    const { error } = Joi.validate(
      data.password,
      new PasswordComplexity(passwordOptions)
    );

    if (error) {
      error422.name = error.name;
      error422.message = error.details[0].message;
      cb(error422);
      return;
    }

    //TODO: validate the entire object comming ({role_id, username, firstname ...})
    if (!data.role) {
      error422.message = "Specify role";
      cb(error422);
      return;
    }

    const role = await server.models.Role.findById(data.role);
    if (!role) {
      error422.message = "Role not found";
      cb(error422);
      return;
    }

    const client = await server.models.Client.create(data);

    if (!client) {
      var error503 = new Error();
      error503.status = 503;
      error503.message = "Data service unavailable, please try again later";
      cb(error503);
      return;
    }

    const roleMap = {
      principalType: server.models.RoleMapping.USER,
      principalId: client.id
    };
    await role.principals.create(roleMap);
    return client;
  };

  Client.remoteMethod("createUser", {
    accepts: [{ arg: "data", type: "object" }],
    returns: { arg: "response", type: "object" },
    http: { verb: "post" }
  });

  Client.archiveUser = async (data, cb) => {
    // const {user_id, archived_user_id} = data;
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
  };

  Client.remoteMethod("archiveUser", {
    accepts: [{ arg: "data", type: "object" }],
    returns: {
      arg: "response",
      type: "string"
    },
    http: {
      verb: "put"
    }
  });

  Client.afterRemote("login", async function(ctx) {
    const roleMapping = await server.models.RoleMapping.find({
      where: { principalId: ctx.result.userId }
    });
    const preconditionError = new Error();
    preconditionError.status = 428;
    if (roleMapping.length <= 0) {
      preconditionError.message("User not mapped to a role");
      throw preconditionError;
    }
    const roleId = roleMapping[0].roleId;
    const role = await server.models.Role.findById(roleId);
    if (!role) {
      preconditionError.message("Could not find role in the database");
      throw preconditionError;
    }
    ctx.result.setAttribute("role", role.name);
  });
};
