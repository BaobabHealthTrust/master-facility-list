const server = require("../../server/server");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const util = require("util");
const nodemailer = require("nodemailer");

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

  Client.updateUser = async (id, data, cb) => {
    const schema = Joi.object({
      firstname: Joi.string(),
      lastname: Joi.string(),
      role: Joi.number()
    });
    const result = schema.validate(data);
    if (result.error) {
      const message = result.error.details.reduce(
        (acc, cur) => `${acc} ${cur.message} \n`,
        ""
      );
      const error400 = new Error(message);
      error400.status = 400;
      cb(error400);
      return;
    }

    const user = await server.models.Client.findById(id);

    const error404 = new Error();
    error404.status = 404;

    if (!user) {
      error404.message = "User not found";
      cb(error404);
      return;
    }
    await user.updateAttributes({
      ...data
    });
    const { role = null } = data;

    if (role) {
      console.log(role);
      const roleMapping = await server.models.RoleMapping.findOne({
        where: { principalId: id }
      });
      if (!roleMapping) {
        error404.message = "No role mapping found";
        cb(error404);
        return;
      }
      const _role = await server.models.Role.findById(role);
      if (!_role) {
        error404.message = "Role not found";
        cb(error404);
        return;
      }
      roleMapping.updateAttribute("roleId", role);
    }
    return user;
  };

  Client.remoteMethod("updateUser", {
    accepts: [
      { arg: "id", type: "number", required: true },
      { arg: "data", type: "object", required: true }
    ],
    returns: { arg: "response", type: "object" },
    http: { verb: "patch", path: "/:id/updateUser" }
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

  Client.requestPasswordReset = async (email, cb) => {
    util.promisify(Client.resetPassword);
    const resetRequest = await Client.resetPassword({ email }).catch(e => e);
    if (resetRequest instanceof Error) {
      const error422 = new Error(resetRequest.message);
      error422.status = 422;
      cb(error422);
      return;
    }
    return {
      message: "Password reset email sent"
    };
  };

  Client.remoteMethod("requestPasswordReset", {
    accepts: [{ arg: "email", type: "string", required: true }],
    returns: {
      arg: "response",
      type: "string"
    },
    http: {
      verb: "post"
    }
  });

  Client.on("resetPasswordRequest", async function(info) {
    var transport = nodemailer.createTransport({
      host: process.env.MHFR_SMTP_HOST,
      port: process.env.MHFR_SMTP_PORT,
      auth: {
        user: process.env.MHFR_SMTP_USER,
        pass: process.env.MHFR_SMTP_USER_PASSWORD
      }
    });

    const url = `${process.env.MHFR_HOST}/resetPassword/${info.accessToken.id}`;
    const html = `
      Good day ${info.user.firstname},
      <p>You requested to have your password changed.</p>
      If you did not initiate the request, just ignore this email.
      <p>please <a href=${url}>follow this link</a> to reset your password</p>
    `;

    await transport
      .sendMail({
        from: process.env.MHFR_SMTP_EMAIL_ADD,
        to: info.email,
        subject: "Password Reset",
        text: "Follow the instructions to reset you password",
        html
      })
      .catch(e => console.log(e.message));
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
  Client.afterRemote("find", async function(ctx) {
    const mapUsers = async users => {
      const roles = await server.models.Role.find();
      const roleMappings = await server.models.RoleMapping.find();
      const mappedUsers = users.map(user => {
        const mappedUser = {};
        const roleMapping = roleMappings.find(
          roleMapping => roleMapping.principalId == user.id
        );
        if (roleMapping) {
          const role = roles.find(role => role.id == roleMapping.roleId);
          if (role) {
            const { id, name } = role;
            mappedUser.role = {
              id,
              name
            };
          }
        }
        //TODO: this could be done better
        const {
          username,
          firstname,
          lastname,
          email,
          archived_date,
          created_at,
          realm,
          emailVerified,
          id
        } = user;
        return {
          ...mappedUser,
          username,
          firstname,
          lastname,
          email,
          archived_date,
          created_at,
          realm,
          emailVerified,
          id
        };
      });
      return mappedUsers;
    };
    const mappedUsers = ctx.result ? await mapUsers(ctx.result) : [];
    ctx.result = mappedUsers;
  });

  Client.assignUserRole = async (roleId, userId, cb) => {
    const { RoleMapping, Role, Client } = server.models;

    const client = await Client.findById(userId);

    if (!client) {
      return exception(
        cb,
        "user with specified ID not found",
        404,
        "NOT_FOUND"
      );
    }

    const role = await Role.findById(roleId);

    if (!role) {
      return exception(
        cb,
        "role with specified ID not found",
        404,
        "NOT_FOUND"
      );
    }

    const roleMap = await RoleMapping.find({
      where: { principalId: userId, roleId: roleId }
    });

    if (roleMap.length > 0) {
      console.log(roleMap);
      return exception(cb, "role already assigned to user", 400, "BAD_REQUEST");
    }

    return await RoleMapping.create({
      principalType: "USER",
      principalId: userId,
      roleId
    });
  };

  Client.remoteMethod("assignUserRole", {
    accepts: [
      { arg: "roleId", type: "number", required: true },
      { arg: "userId", type: "number", required: true }
    ],
    returns: {
      arg: "response",
      type: "object"
    },
    http: {
      verb: "post"
    }
  });

  const exception = (cb, message, status, code) => {
    const error = new Error(message);
    error.name = "Error";
    error.status = status;
    error.code = code;
    cb(error);
  };
};
