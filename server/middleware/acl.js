"use strict";

var app = require("../server");
var rolePermissions = require("../../data/role-permissions");

module.exports = function() {
  return async function acl(req, res, next) {
    const accessTokenModel = app.models.AccessToken;
    const userModel = app.models.Client;
    const roleMappingModel = app.models.RoleMapping;
    const roleModel = app.models.Role;

    const token = req.query.access_token;

    if (req.url.includes("/explorer/")) {
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

    const { method, model } = getModel(req.url);

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
  return roleMethod.permissions.find(permission => permission === operation);
};
