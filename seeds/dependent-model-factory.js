'use strict';

const server = require('../server/server');
const { truncate } = require('./seed-helpers');
const { log, error } = console;

const _ = require('lodash');
module.exports = async (ParentModel, ChildModel, dependantData) => {
  try {
    await truncate(ChildModel);

    const { foreignKey, referenceName, schema } = dependantData;
    const ids = await ParentModel.find({
      where: {
        referenceName: { inq: schema.map((parent) => parent.reference) },
      },
    }).map((entity) => entity.id);

    const fullData = schema.map((entity, index) => {
      return entity.data.map((prop) => {
        return {
          [foreignKey]: ids[index],
          ...prop,
        };
      });
    });
    const flattenedFullData = _.flatten(fullData);
    const createdChildren = await ChildModel.create(flattenedFullData);

    log(`✅ created ${ChildModel.definition.name} Successfully...`);

    return createdChildren;
  } catch (err) {
    error(err.message);
  }
};
