"use strict";
const dependentModelFactory = require('./dependentModelFactory');

module.exports = async (ParentModel, ChildModel, dependantData) => {
    const topLevelServices = dependentModelFactory(ParentModel, ChildModel, dependantData);
    const level2Services = [];
    topLevelServices.forEach(createdChild => {
        if (createdChild.children) {
            createdChild.children.forEach(child => {
                child.service_catetory_id = createdChild.id;
                child.service_type_id = createdChild.service_type_id;
                level2Services.push(child);
            });
        }
    });
    const createdL1Children = await ChildModel.create(l2Children);
    return createdL1Children;
};
