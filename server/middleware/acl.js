"use strict";

var app = require("../server");
var rolePermissions = require("../../data/role-permissions");

module.exports = function () {
  return async function acl(req, res, next) {
    const accessTokenModel = app.models.AccessToken;
    const userModel = app.models.Client;
    const roleMappingModel = app.models.RoleMapping;
    const roleModel = app.models.Role;

    const token = req.query.access_token;

    if (req.url.includes("/explorer")) {
      return next();
    }
    const { method, model } = getModel(req.url);

    if (checkPermission("all", model, method, req.method)) {
      return next();
    }

    if (!token) {
      unAuthorizedError(next);
    }

    const tokenInstance = await accessTokenModel.findById(token);
    const userInstance = await userModel.findById(tokenInstance.userId);
    const roleMappings = await roleMappingModel.find({
      where: { principalId: userInstance.id }
    });

    const userRoles = await Promise.all(
      roleMappings.map(roleMap => roleModel.findById(roleMap.roleId))
    );

    let userPermitted = false;

    userRoles.every(userRole => {
      const acl = checkPermission(userRole.name, model, method, req.method);
      if (acl) {
        userPermitted = true;
        return false;
      }
      return true;
    });

    if (userPermitted) {
      if (req.method == "PUT" || req.method == "PATCH") {
        checkPermittedFields(req, permittedUpdateFields, next);
      }
      return next();
    }

    unAuthorizedError(next);
  };
};

// helpers
const getModel = url => {
  const urlParts = url.split("?")[0].split("/");
  const filteredParts = urlParts.filter(part => isNaN(part));

  return {
    model: filteredParts[1].toLowerCase(),
    method: filteredParts[2] ? filteredParts[2] : "*"
  };
};

const unAuthorizedError = next => {
  const error = new Error();
  error.status = 401;
  error.message = "Authorization Required";
  error.code = "AUTHORIZATION_REQUIRED";

  next(error);
};

let permittedUpdateFields = [];
const checkPermission = (role, model, method, operation) => {
  const rolePermission = rolePermissions.find(
    rolePermissions => rolePermissions.role === role
  );

  if (!rolePermission) {
    return false;
  }
  const roleModel = rolePermission.acls.find(acl => acl.model === model);

  if (!roleModel) {
    return false;
  }
  const roleMethod = roleModel.methods.find(
    roleMethod => roleMethod.method === method
  );

  if (!roleMethod) {
    return false;
  }

  if (roleMethod.permittedUpdateFields) {
    permittedUpdateFields = [
      ...permittedUpdateFields,
      ...roleMethod.permittedUpdateFields
    ];
  }

  return roleMethod.permissions.find(permission => permission === operation);
};

const checkPermittedFields = (req, permittedUpdateFields, next) => {
  let body = [];
  req
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      Object.keys(JSON.parse(body)).forEach(field => {
        if (field === "id") return;
        if (
          !permittedUpdateFields.find(permittedField => {
            return permittedField === field;
          })
        ) {
          unAuthorizedError(next);
        }
      });

      return next();
    });
};
