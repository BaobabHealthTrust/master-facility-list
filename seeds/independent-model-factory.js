"use strict";

module.exports = async (Model, data) => {
    try {
        await Model.deleteAll();
        await Model.create(data);
        await console.log(`Created ${Model.definition.name} Successfully...`);
    } catch (err) {
        console.error(err)
    }
}
