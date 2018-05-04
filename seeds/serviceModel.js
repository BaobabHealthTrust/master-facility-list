"use strict";
const dependentModelFactory = require('./dependentModelFactory');

module.exports = async (ParentModel, ChildModel, dependantData) => {
    const createdChildren = dependentModelFactory(ParentModel, ChildModel, dependantData);
    const l1Children = [];
    createdChildren.forEach(createdChild => {
        if (createdChild.children) {
            createdChild.children.forEach(child => {
                child.service_catetory_id = createdChild.id;
                child.service_type_id = createdChild.service_type_id;
                l1Children.push(child);
            });
        }
    });
    const createdL1Children = await ChildModel.create(l2Children);
    return createdL1Children;
};
