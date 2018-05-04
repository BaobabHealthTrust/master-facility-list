"use strict";
const server = require("../server/server");
const dataSource = server.dataSources.db;
const _ = require('lodash');

module.exports = async (ParentModel, ChildModel, dependantData) => {
    const foreignKey = dependantData.foreignKey;
    const referenceName = dependantData.referenceName;
    const schema = dependantData.schema;
    await ChildModel.deleteAll();
<<<<<<< Updated upstream

    const ids = await ParentModel.find({
        where: {
            referenceName: {
                inq: schema.map(parent => parent.reference)
            }
        }
    }).map(entity => entity.id);
=======
    const ids = await ParentModel.find(
        {where: {referenceName: {inq: schema.map(parent => parent.reference)}}}
    ).map(entity => entity.id); 
>>>>>>> Stashed changes

    const fullData = schema.map((entity, index) => {
        return entity.data.map(prop => {
            return {
                [foreignKey]: ids[index],
                ...prop
            }
        });
    });
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    const flattenedFullData = _.flatten(fullData);
    const createdChildren = await ChildModel.create(flattenedFullData);
    return createdChildren;
};
