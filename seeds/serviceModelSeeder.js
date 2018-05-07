"use strict";
const dependentModelFactory = require('./dependentModelFactory');

module.exports = async (ParentModel, ChildModel, dependantData) => {
    const createdTopLevelServices = await dependentModelFactory(ParentModel, ChildModel, dependantData);
    const level1Services = [];
    createdTopLevelServices.forEach(createdTopLevelService => {
        if (createdTopLevelService.children) {
            createdTopLevelService.children.forEach(level1Service => {
                level1Service.service_category_id = createdTopLevelService.service_category_id;
                level1Service.service_type_id = createdTopLevelService.service_type_id;
                level1Services.push(level1Service);
            });
        }
    });
    const createdLevel1Services = await ChildModel.create(level1Services);
    const level2Services = [];
    createdLevel1Services.forEach(createdLevel1Service => {
        if(createdLevel1Service.children){
            createdLevel1Service.children.forEach(level2Service => {
                level2Service.service_category_id = createdLevel1Service.id;
                level2Service.service_type_id = createdLevel1Service.service_type_id;
                level2Services.push(level2Service);
            });
        }
    });
    const createdLevel2Services = await ChildModel.create(level2Services);
};
    