'use strict';

const server = require('../server/server');
const dataSource = server.dataSources.db;
const _ = require('lodash');

module.exports = async (ParentModel, ChildModel, dependantData) => {
  const { foreignKey, referenceName, schema } = dependantData;

  const dataSource = ChildModel.dataSource;
  const query = `TRUNCATE TABLE ${ChildModel.definition.name}`;

  await dataSource.connector.execute(query, [], function(err, model) {
    if (err) console.error(err);
  });

  await ChildModel.deleteAll();
  const ids = await ParentModel.find({
    where: { referenceName: { inq: schema.map((parent) => parent.reference) } },
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
  return createdChildren;
};
