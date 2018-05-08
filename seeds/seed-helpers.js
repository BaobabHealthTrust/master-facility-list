'use strict'

module.exports = {
    getIds: async (Model) => {
        return await Model.find({ fields: { id: true } }).map(model => model.id);
    }
}